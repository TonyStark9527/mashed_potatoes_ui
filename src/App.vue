<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-secondary text-white q-py-sm">
      <q-toolbar>
        <q-btn flat round dense icon="assignment_ind">
          <q-badge floating color="red">2</q-badge>
        </q-btn>
        <q-toolbar-title>
          Mashed_potatoes
        </q-toolbar-title>
        <q-tabs v-model="menu" inline-label class="bg-secondary">
          <q-route-tab name="home" icon="home" label="首 页" to="/mashed_potatoes_ui/index"/>
          <q-route-tab name="chat" icon="chat" label="聊 天" to="/mashed_potatoes_ui/chat">
            <q-badge floating rounded color="red">2</q-badge>
          </q-route-tab>
          <q-route-tab name="folder" icon="folder" label="文 件" to="/mashed_potatoes_ui/folder"/>
          <q-tab name="notice" icon="notifications_active" label="通 知">
            <q-badge floating rounded color="red">2</q-badge>
          </q-tab>
          <!--用户未登录与用户登录时区别-->
          <q-btn v-if="!login.isLogin" class="no-shadow" color="secondary" icon="person" label="登 录" stretch unelevated
                 @click="login.loginPanel = true"/>
          <q-btn-dropdown v-if="login.isLogin" auto-close stretch flat>
            <template v-slot:label>
              <q-avatar>
                <q-img src="https://cdn.quasar.dev/img/boy-avatar.png"/>
              </q-avatar>
            </template>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar icon="logout" color="secondary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>登出</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar icon="logout" color="secondary" text-color="white"/>
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
      <router-view/>
    </q-page-container>
  </q-layout>
  <q-dialog v-model="login.loginPanel" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">登 录</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-input standout="bg-teal text-white" label="用户名" v-model="login.username"/>
          <q-input standout="bg-teal text-white" :type="login.hidePassword ? 'password' : 'text'" label="密码"
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

      <q-card-actions align="right" class="text-primary">
        <q-btn unelevated color="secondary" label="取 消" v-close-popup/>
        <q-btn unelevated color="secondary" label="登 录" :loading="login.loginLoading" @click="loginIn"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {useQuasar} from 'quasar'
import {ref, watch} from 'vue'
import api from './api/axios'
import {userStore} from "@/store/userStore"
import notify from "@/utils/notify"

// 主题样式
const theme = ref(true)

const user = userStore()

const $q = useQuasar()

const login = ref({
  loginPanel: false, // 是否弹出登录面板
  loginLoading: false, // 调用登录接口时，登录按钮的loading状态
  hidePassword: true,
  username: '', // 用户名
  password: '', // 用户密码
  isLogin: false // 用户菜单显示控制，true为登录菜单，false为未登录菜单
})

function loginIn() {
  if (!login.value.username || !login.value.password) {
    notify.warn('请输入用户名和密码！')
    return
  }
  login.value.loginLoading = true
  // todo 用户token的存储与使用
  api.post('/v1/user/user/login', {username: login.value.username, password: login.value.password}).then(res => {
    // todo 处理返回参数
    if (res.data.code === '00000' && res.data.result) {
      // 设置用户token，请求用户信息
      user.setToken(res.data.result)
      api.get('/v1/user/user/user_info/' + login.value.username).then(userInfo => {
        if (userInfo.data.code === '00000' && userInfo.data.result) {
          // 设置全局用户信息
          user.setInfo(userInfo.data.result.username, userInfo.data.result.nickname)
          // 关闭登录按钮loading状态
          login.value.loginLoading = false
          // 关闭登录弹框
          login.value.loginPanel = false
          // 用户菜单切换为已登录菜单
          login.value.isLogin = true
          // 提示用户登录成功
          notify.success('登录成功！')
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

const menu = ref('home')

watch(theme, (newShow) => {
  $q.dark.set(!newShow)
  notify.success('更换主题成功！')
})

</script>

<style lang="sass">
</style>
