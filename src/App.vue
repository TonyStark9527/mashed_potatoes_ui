<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white q-py-sm">
      <q-toolbar>
        <q-btn flat round dense icon="catching_pokemon" size="lg"/>
        <q-toolbar-title>
          Mashed_potatoes
        </q-toolbar-title>
        <q-tabs v-model="menu" inline-label class="bg-primary">
          <q-route-tab name="home" icon="home" label="首 页" to="/mashed_potatoes_ui/index"/>
          <q-route-tab name="chat" icon="chat" label="聊 天" to="/mashed_potatoes_ui/chat">
            <q-badge floating rounded color="red">2</q-badge>
          </q-route-tab>
          <q-route-tab name="folder" icon="folder" label="文 件" to="/mashed_potatoes_ui/folder"/>
          <q-tab name="notice" icon="notifications_active" label="通 知">
            <q-badge floating rounded color="red">2</q-badge>
          </q-tab>
          <q-route-tab name="blog" icon="newspaper" label="博 客" to="/mashed_potatoes_ui/blog"/>
          <!--用户未登录与用户登录时区别-->
          <q-btn v-if="!login.isLogin" class="no-shadow" color="primary" icon="person" label="登 录" stretch unelevated
                 @click="login.loginPanel = true"/>
          <q-btn-dropdown v-if="login.isLogin" auto-close stretch flat>
            <template v-slot:label>
              <q-avatar>
                <q-img :src="user.getAvatar()"/>
              </q-avatar>
            </template>
            <q-list>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>登出</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar icon="logout" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>登出</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
        <q-toggle v-model="theme" size="lg" checked-icon="light_mode" unchecked-icon="dark_mode" color="warning"
                  keep-color/>
      </q-toolbar>
    </q-header>
    <q-page-container class="fullscreen z-inherit">
      <router-view v-slot="{ Component, route }" @emitChildren="emitFunction">
        <component ref="routerViewRef" :is="Component"/>
      </router-view>
    </q-page-container>
  </q-layout>
  <q-dialog v-model="login.loginPanel" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">登 录</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-input standout="bg-primary text-white" label="用户名" v-model="login.username"/>
          <q-input standout="bg-primary text-white" :type="login.hidePassword ? 'password' : 'text'" label="密码"
                   v-model="login.password">
            <template v-slot:append>
              <q-icon
                  :name="login.hidePassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="login.hidePassword = !login.hidePassword"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn unelevated color="primary" label="取 消" v-close-popup/>
        <q-btn unelevated color="primary" label="登 录" :loading="login.loginLoading" @click="loginIn"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {useQuasar} from 'quasar'
import {onMounted, ref, watch} from 'vue'
import api from './api/axios'
import {userStore} from "@/store/userStore"
import notify from "@/utils/notify"
import {useRoute} from "vue-router"
import webSocket from "@/utils/webSocket"
import {Login} from "@/type/app"
import {MASHES_POTATOES_TOKEN} from "@/enum/constant"
import {ResultResponse, UserDTO} from "@/api/response"

// 主题样式
const theme = ref<boolean>(true)
// 菜单编码
const menu = ref<string>('home')
// router-view的ref，用来调用子组件的方法
const routerViewRef = ref<any>(null)
// 用来获取当前路由
const route = useRoute()
// 用户相关
const user = userStore()

const $q = useQuasar()

// 登录相关
const login = ref<Login>({
  loginPanel: false,
  loginLoading: false,
  hidePassword: true,
  username: 'tom',
  password: '123456',
  isLogin: false
})

/**
 * 自动登录
 */
function automaticLogin() {
  // 获取localstorage中的token
  let token = <string>$q.localStorage.getItem(MASHES_POTATOES_TOKEN)
  // 如果token存在
  if (token) {
    // 设置user的token方便调用
    user.setToken(token)
    // 根据token获取用户信息
    api.get<ResultResponse<UserDTO>>('/v1/user/user/token/user_info').then(userInfo => {
      if (userInfo.data.code === '00000' && userInfo.data.result) {
        // 设置全局用户信息
        user.setInfo(userInfo.data.result.username, userInfo.data.result.nickname, userInfo.data.result.avatar)
        // 用户菜单切换为已登录菜单
        login.value.isLogin = true
        // 创建websocket
        createWebSocket()
      } else {
        // 清除localStorage中的token
        $q.localStorage.remove(MASHES_POTATOES_TOKEN)
        // 提示用户登录失败
        notify.error(userInfo.data.message)
      }
    })
  }
}

/**
 * 登录
 */
function loginIn() {
  if (!login.value.username || !login.value.password) {
    notify.warn('请输入用户名和密码！')
    return
  }
  // 将登录按钮设置为loading
  login.value.loginLoading = true
  api.post<ResultResponse<string>>('/v1/user/user/login', {username: login.value.username, password: login.value.password}).then(res => {
    // 判断登录成功与否
    if (res.data.code === '00000' && res.data.result) {
      // 设置用户token，请求用户信息
      user.setToken(res.data.result)
      // 储存用户token
      $q.localStorage.set(MASHES_POTATOES_TOKEN, res.data.result)
      api.get<ResultResponse<UserDTO>>('/v1/user/user/user_info/' + login.value.username).then(userInfo => {
        if (userInfo.data.code === '00000' && userInfo.data.result) {
          // 设置全局用户信息
          user.setInfo(userInfo.data.result.username, userInfo.data.result.nickname, userInfo.data.result.avatar)
          // 关闭登录按钮loading状态
          login.value.loginLoading = false
          // 关闭登录弹框
          login.value.loginPanel = false
          // 用户菜单切换为已登录菜单
          login.value.isLogin = true
          // 提示用户登录成功
          notify.success('登录成功！')
          // 创建websocket
          createWebSocket()
        }
      })
    } else {
      // 关闭登录按钮loading状态
      login.value.loginLoading = false
      // 提示用户登录失败
      notify.error(res.data.message)
    }
  })
}

/**
 * 注销
 */
function logout() {
  // TODO 调用注销接口
  // api.get('').then()
  login.value.isLogin = false
  login.value.username = ''
  login.value.password = ''
  $q.localStorage.remove('mashed_potatoes_token')
  if (user.getWebsocket()) {
    user.getWebsocket()?.close()
  }
}

/**
 * 创建websocket
 */
function createWebSocket() {
  // 创建websocket连接
  let websocket = webSocket.create('ws://1.13.23.227:1124/v1/chat/websocket/' + user.getUsername(), function (messageEvent: any) {
    if (['message', 'friend'].includes(<string>route.meta.key)) {
      console.log(messageEvent)
      let message = JSON.parse(messageEvent.data)
      routerViewRef.value.receiveMessage(message)
    }
  })
  user.setWebsocket(<WebSocket>websocket)
}

// 接收子组件的调用
function emitFunction(params: any) {
  let functionName = params.functionName
}

watch(theme, (newShow) => {
  $q.dark.set(!newShow)
  notify.success('更换主题成功！')
})

onMounted(() => {
  automaticLogin()
})

</script>

<style lang="sass">
</style>
