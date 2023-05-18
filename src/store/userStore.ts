import {defineStore} from "pinia"

interface UserStore {
    username: string
    nickname: string
    avatar: string
    token: string
    websocket: WebSocket | null
}

export const userStore = defineStore('user', {
    state: () => (<UserStore>{
        username: '',
        nickname: '',
        avatar: '',
        token: '',
        websocket: null
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
        },
        setWebsocket(websocket: WebSocket) {
            this.websocket = websocket
        },
        getWebsocket(): WebSocket | null {
            return this.websocket
        }
    }
})
