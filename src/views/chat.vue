<template>
  <q-drawer show-if-above side="left" behavior="desktop" elevated mini>
    <q-list class="fixed-center full-width">
      <q-item clickable v-ripple :active="menu === 'message'" class="text-secondary" @click="menu='message'"
              to="/mashed_potatoes_ui/chat/message">
        <q-item-section avatar>
          <q-btn round icon="o_mark_unread_chat_alt" :class="menu === 'message'? 'bg-secondary text-white':''">
            <q-badge floating rounded color="red">2</q-badge>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="menu === 'friend'" class="text-secondary" @click="menu='friend'"
              to="/mashed_potatoes_ui/chat/friend">
        <q-item-section avatar>
          <q-btn round icon="o_people_alt" :class="menu === 'friend'? 'bg-secondary text-white':''">
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="menu === 'setting'" class="text-secondary" @click="menu='setting'">
        <q-item-section avatar>
          <q-btn round icon="o_notifications_active" :class="menu === 'setting'? 'bg-secondary text-white':''">
            <q-badge floating rounded color="red">2</q-badge>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

  <q-page class="row full-height">
    <router-view v-slot="{Component, route}" style="height: 100%;  width: 350px;">
      <component :is="Component"/>
    </router-view>
    <div style="width: calc(100% - 350px);" class="column full-height q-gutter-none">
      <div class="q-pa-xs" style="height: calc(100% - 200px);">
        <q-infinite-scroll class="full-width full-height overflow-auto" @load="onLoad" reverse :offset="0"
                           ref="scrollAreaRef">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="secondary" size="40px"/>
            </div>
          </template>
          <q-chat-message v-for="(message, index) in messages" :key="index"
                          :avatar="message.avatar" :text="[message.content]" :stamp="message.stamp" :sent="message.sent"
                          text-color="white" :bg-color="message.sent ? 'secondary' : 'primary'"/>
        </q-infinite-scroll>
      </div>
      <div class="q-pa-xs q-gutter-sm" style="height: 200px">
        <q-editor class="full-height" v-model="toSendMessage"
                  :definitions="{send: {tip: '发送',icon: 'send',label: '发送', handler: sendMessage}}"
                  :toolbar="[['send']]"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {nextTick, ref} from "vue"
import notify from "@/utils/notify"
import api from "@/api/axios"
import {userStore} from "@/store/userStore"
// 当前菜单
const menu = ref('message')
// 当前聊天框中的好友用户名 or c
const currentContact = ref<any>(null)
const user = userStore()

const toSendMessage = ref('')

const scrollAreaRef = ref<any>(null)

// 消息需要通过接口获取
const messages = ref<Array<any>>([
  {
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    content: '你好呀',
    stamp: '七分钟前',
    sent: true
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    content: '我好你妈个好',
    stamp: '七分钟前',
    sent: false
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    content: '你好呀',
    stamp: '七分钟前',
    sent: true
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    content: '我好你妈个好',
    stamp: '七分钟前',
    sent: false
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    content: '你好呀',
    stamp: '七分钟前',
    sent: true
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    content: '我好你妈个好',
    stamp: '七分钟前',
    sent: false
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    content: '你好呀',
    stamp: '七分钟前',
    sent: true
  },
  {
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    content: '我好你妈个好',
    stamp: '七分钟前',
    sent: false
  }
])

async function initMessage() {
  api.get('').then(initialMessages => {
    // TODO 设置messages的值
  })
  await nextTick()
  scrollToBottom()
}

/**
 * 发送消息
 */
async function sendMessage() {
  if (toSendMessage.value === '') {
    notify.warn('发送内容不能为空！')
    return
  }
  // TODO 判断消息是发给用户还是群
  await api.post('/v1/chat/websocket/send_to_user',
      {
        sourceUsername: user.getUsername(),
        sourceAvatar: user.getAvatar(),
        contactId: currentContact.contactId,
        content: toSendMessage.value
      }).then(async res => {
    if (res.data.code === '00000' && res.data.result) {
      messages.value.push({
        avatar: user.getAvatar(),
        content: toSendMessage.value,
        stamp: '刚刚',
        sent: true
      })
      await nextTick()
      scrollToBottom()
    }
  })
}

/**
 * 收到消息
 * @param newMessages
 */
function receiveMessage(newMessages: any) {
  // TODO 判断当前窗口是否是消息来源
  if (currentContact !== null && currentContact.contactId === newMessages.contactId) {
    showReceiveMessage(newMessages)
  } else {
    // TODO 显示未读
  }
}

/**
 * 展示消息接收到的消息
 * @param message
 */
async function showReceiveMessage(message: any) {
  messages.value.push({
    avatar: message.sourceAvatar,
    content: message.content,
    stamp: '刚刚',
    sent: false
  })
  await nextTick()
  scrollToBottom()
}

/**
 * 聊天框滚动条平移到底部
 */
function scrollToBottom() {
  let domScroll = scrollAreaRef.value.$el
  // 聊天框带有动画的滚动到最底部
  domScroll.scrollTo({
    top: domScroll.scrollHeight,
    behavior: 'smooth'
  })
}

/**
 * 请求之前的聊天信息
 * @param index
 * @param done
 */
function onLoad(index: any, done: any) {
  // TODO 当之间没有聊天消息或者聊天消息不足时，不显示加载框
  // TODO 接口请求数据进行渲染
  setTimeout(() => {
    messages.value.unshift({
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      content: '我的评价是6',
      stamp: '七分钟前',
      sent: false
    }, {
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      content: '我的评价是6',
      stamp: '七分钟前',
      sent: false
    }, {
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      content: '我的评价是6',
      stamp: '七分钟前',
      sent: false
    }, {
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      content: '我的评价是6',
      stamp: '七分钟前',
      sent: false
    })
    done()
  }, 2000)
}

defineExpose({
  receiveMessage
})
</script>

<style lang="sass">

</style>
