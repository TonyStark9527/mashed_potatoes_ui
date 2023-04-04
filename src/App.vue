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
          <q-route-tab name="chat" icon="chat" label="聊天" to="/mashed_potatoes_ui/chat">
            <q-badge floating rounded color="red">2</q-badge>
          </q-route-tab>
          <q-tab name="folder" icon="folder" label="文件"/>
          <q-tab name="notice" icon="notifications_active" label="通知">
            <q-badge floating rounded color="red">2</q-badge>
          </q-tab>
          <q-btn-dropdown auto-close stretch flat>
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
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

import {useQuasar} from 'quasar'
import {ref, watch} from 'vue'
import MessageTip from './utils/messageTip'
import {useRoute, useRouter} from "vue-router";

// 主题样式
const theme = ref(true)

const $q = useQuasar()

const route = useRoute()

const router = useRouter()

console.log(route)
console.log(router)

const menu = ref('chat')

watch(theme, (newShow, oldShow) => {
  $q.dark.set(!newShow)
  MessageTip.success('更换主题成功！')
})

</script>

<style lang="sass">
</style>
