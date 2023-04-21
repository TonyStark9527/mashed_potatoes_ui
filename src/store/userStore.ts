import {defineStore} from "pinia"

export const userStore = defineStore('user', {
    state: () => ({
        username: '',
        nickname: '',
        token: ''
    }),
    actions: {
        setInfo(username: string, nickname: string, token: string) {
            this.username = username
            this.nickname = nickname
            this.token = token
        },
        setToken(token: string) {
            this.token = token
        },
        getToken(): string {
            return this.token
        }
    }
})
