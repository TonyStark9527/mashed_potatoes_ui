import axios from 'axios'
import messageTip from "@/utils/messageTip";

const api = axios.create({
    baseURL: 'http://127.0.0.1:1010',
    timeout: 10000
})

api.interceptors.request.use(
    config => {
        let apiToken = api.defaults.headers.token
        if (!apiToken) {
            // todo 设置token
            config.headers!.token = 'token'
            api.defaults.headers.token = 'token'
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
        return error
    }
)

export default api
