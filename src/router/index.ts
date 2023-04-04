import {createRouter,createWebHistory} from "vue-router"

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/chat',
        },
        {
            path: '/index',
            component: () => import('@/views/chat.vue')
        },
        {
            path: '/chat',
            component: () => import('@/views/chat.vue'),
            redirect: '/chat/message',
            children: [
                {
                    path: 'message',
                    component: () => import('@/views/chat/message.vue')
                },
                {
                    path: 'friend',
                    component: () => import('@/views/chat/friend.vue')
                }
            ]
        }
    ]
})

export default router
