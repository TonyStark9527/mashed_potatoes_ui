import {createRouter,createWebHashHistory} from "vue-router"

const routerHistory = createWebHashHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/mashed_potatoes_ui/',
            redirect: '/mashed_potatoes_ui/chat',
        },
        {
            path: '/mashed_potatoes_ui/index',
            component: () => import('@/views/chat.vue')
        },
        {
            path: '/mashed_potatoes_ui/chat',
            component: () => import('@/views/chat.vue'),
            redirect: '/mashed_potatoes_ui/chat/message',
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
