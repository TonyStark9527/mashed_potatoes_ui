import {defineStore} from "pinia"

export const userStore = defineStore('user', {
    state: () => ({
        username: '',
        nickname: '',
        avatar: '',
        token: ''
    }),
    actions: {
        setInfo(username: string, nickname: string, avatar: string) {
            this.username = username
            this.nickname = nickname
            this.avatar = avatar
        },
        setToken(token: string) {
            this.token = token
        },
        getToken(): string {
            return this.token
        },
        getUsername(): string {
            return this.username
        },
        getAvatar(): string {
            return this.avatar
        }
    }
})
