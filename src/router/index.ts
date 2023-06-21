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
            meta: {
                key: 'chat'
            },
            children: [
                {
                    path: 'message',
                    component: () => import('@/views/chat/message.vue'),
                    meta: {
                        key: 'message'
                    }
                },
                {
                    path: 'friend',
                    component: () => import('@/views/chat/friend.vue'),
                    meta: {
                        key: 'friend'
                    }
                },
                {
                    path: 'notice',
                    component: () => import('@/views/chat/notice.vue'),
                    meta: {
                        key: 'notice'
                    }
                }
            ]
        },
        {
            path: '/mashed_potatoes_ui/folder',
            component: () => import('@/views/folder.vue')
        },
        {
            path: '/mashed_potatoes_ui/blog',
            component: () => import('@/views/blog.vue')
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
