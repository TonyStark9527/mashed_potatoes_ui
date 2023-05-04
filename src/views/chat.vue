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
    <router-view style="height: 100%;  width: 350px;"/>
    <div style="width: calc(100% - 350px);" class="column full-height q-gutter-none">
      <div class="q-pa-xs" style="height: calc(100% - 200px);">
        <q-infinite-scroll class="full-width full-height overflow-auto" @load="onLoad" reverse :offset="200" ref="scrollAreaRef">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="secondary" size="40px" />
            </div>
          </template>
          <q-chat-message v-for="(message, index) in messages" :key="index"
                          :avatar="message.avatar" :text="[message.content]" :stamp="message.stamp" :sent="message.sent" text-color="white" :bg-color="message.sent ? 'secondary' : 'primary'"/>
        </q-infinite-scroll>
      </div>
      <div class="q-pa-xs q-gutter-sm" style="height: 200px">
        <q-editor class="full-height" v-model="toSendMessage"
                  :definitions="{send: {tip: '发送',icon: 'send',label: '发送', handler: click}}" :toolbar="[['send']]"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue"
import notify from "@/utils/notify";

const menu = ref('message');

const toSendMessage = ref('')

const scrollAreaRef = ref(null)

const messages = ref([
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

async function click() {
  if (toSendMessage.value === '') {
    notify.warn('发送内容不能为空！')
    return
  }
  messages.value.push({
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    content: toSendMessage.value,
    stamp: '刚刚',
    sent: true
  })
  await nextTick()
  let domScroll = scrollAreaRef.value!.$el
  // 聊天框带有动画的滚动到最底部，当消息发送成功时
  domScroll.scrollTo({
    top: domScroll.scrollHeight,
    behavior: 'smooth'
  })
}

function onLoad(index: any, done: any) {
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
    },{
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      content: '我的评价是6',
      stamp: '七分钟前',
      sent: false
    },{
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      content: '我的评价是6',
      stamp: '七分钟前',
      sent: false
    })
    done()
  }, 2000)
}
// TODO 集成websocket
</script>

<style lang="sass">

</style>
