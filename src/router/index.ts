import {createRouter,createWebHistory} from "vue-router"

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            component: () => import('@/views/chat.vue')
        },
        {
            path: '/chat',
            component: () => import('@/views/chat.vue')
        },
        {
            path: '/friend',
            component: () => import('@/views/friend.vue')
        }
    ]
})

export default router