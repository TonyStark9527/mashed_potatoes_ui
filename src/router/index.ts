import {createRouter,createWebHistory} from "vue-router"
import {userStore} from "@/store/userStore"
import notify from "@/utils/notify"

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/mashed_potatoes_ui/',
            redirect: '/mashed_potatoes_ui/index',
        },
        {
            path: '/mashed_potatoes_ui/index',
            component: () => import('@/views/home.vue')
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
        },
        {
            path: '/mashed_potatoes/folder',
            component: () => import('@/views/folder.vue')
        }
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const user = userStore()
    if (user.getToken() || to.path === '/mashed_potatoes_ui/index') {
        next()
    } else {
        notify.warn('请先登录！')
    }
})

export default router
