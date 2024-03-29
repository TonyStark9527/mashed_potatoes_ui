import axios from 'axios'
import {userStore} from "@/store/userStore"

const api = axios.create({
    baseURL: 'http://1.13.23.227:2957/v1/',
    // baseURL: 'http://127.0.0.1:2957',
    timeout: 10000
})

api.interceptors.request.use(
    config => {
        let apiToken = api.defaults.headers.token
        const user = userStore()
        let token = user.getToken()
        if (!apiToken) {
            if (token) {
                config.headers!.token = token
                api.defaults.headers.token = token
            }
        } else {
            if (token && apiToken !== token) {
                config.headers!.token = token
                api.defaults.headers.token = token
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => {
        if (response.data.code !== "00000") {
            console.log(response.data.message)
        }
        return response
    },
    error => {
        if (error.request.responseURL.endsWith('/user/login') && error.response.status === 403) {
            error.data = {
                code: 'A0001',
                message: '密码错误！'
            }
        }
        if (error.request.responseURL.endsWith('/token/user_info') && error.response.status === 500) {
            error.data = {
                code: '',
                message: 'token过期！'
            }
        }
        return error
    }
)

export default api
