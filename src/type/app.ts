export type Login = {
    loginPanel: boolean // 是否弹出登录面板
    loginLoading: boolean // 调用登录接口时，登录按钮的loading状态
    hidePassword: boolean // 是否隐藏密码
    username: string // 用户名
    password: string // 用户密码
    isLogin: boolean // 用户菜单显示控制，true为登录菜单，false为未登录菜单
}
