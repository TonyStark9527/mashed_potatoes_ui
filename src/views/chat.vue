<template>
  <q-drawer show-if-above side="left" behavior="desktop" elevated mini>
    <q-list class="fixed-center full-width">
      <q-item clickable v-ripple :active="menu === 'message'" class="text-primary" @click="menu='message'"
              to="/mashed_potatoes_ui/chat/message">
        <q-item-section avatar>
          <q-btn round icon="o_mark_unread_chat_alt" :class="menu === 'message'? 'bg-primary text-white':''">
            <q-badge floating rounded color="red">2</q-badge>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="menu === 'friend'" class="text-primary" @click="menu='friend'"
              to="/mashed_potatoes_ui/chat/friend">
        <q-item-section avatar>
          <q-btn round icon="o_people_alt" :class="menu === 'friend'? 'bg-primary text-white':''">
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="menu === 'setting'" class="text-primary" @click="menu='setting'">
        <q-item-section avatar>
          <q-btn round icon="o_notifications_active" :class="menu === 'setting'? 'bg-primary text-white':''">
            <q-badge floating rounded color="red">2</q-badge>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

  <q-page class="row full-height">
    <div style="width: 350px" class="column full-height">
      <router-view v-slot="{Component, route}" @emitChildren="emitFunction">
        <component ref="routerViewRef" :is="Component"/>
      </router-view>
    </div>
    <q-separator class="column" vertical />
    <div style="width: calc(100% - 351px);" class="column full-height q-gutter-none">
      <q-splitter v-model="splitterModel" :limits="[50, 80]" horizontal class="full-height q-pa-xs">
        <template v-slot:before>
          <q-infinite-scroll class="full-width full-height overflow-auto" @load="onLoad" reverse :offset="0"
                             ref="scrollAreaRef">
            <template v-if="haveMoreMessage" v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px"/>
              </div>
            </template>
            <q-chat-message v-for="(message, index) in messages" :key="index"
                            :avatar="message.avatar" :text="[message.content]" :stamp="message.sendDateTime"
                            :sent="message.sent"
                            text-color="white" :bg-color="message.sent ? 'primary' : 'secondary'"/>
          </q-infinite-scroll>
        </template>
        <template v-slot:after>
          <q-editor class="full-height overflow-hidden" v-model="toSendMessage"
                    :definitions="{send: {tip: '发送',icon: 'send',label: '发送', handler: sendMessage}}"
                    :toolbar="[['send']]"/>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from "vue"
import notify from "@/utils/notify"
import api from "@/api/axios"
import {userStore} from "@/store/userStore"
import dateTimeUtil from '@/utils/dateTime'
import {MessageVO, Page, ResultResponse} from "@/api/response"
// 当前菜单
const menu = ref('message')
// 当前聊天框中的好友contact
const currentContact = ref<any>({
  contactId: "",
  friendUsername: ""
})
const user = userStore()

const toSendMessage = ref('')

const routerViewRef = ref<any>(null)
const scrollAreaRef = ref<any>(null)
// TODO 可以考虑合并
const haveMoreMessage = ref<boolean>(false)
const firstMoreMessage = ref<boolean>(true)

// 消息需要通过接口获取
const messages = ref<MessageVO[]>([])
// 聊天信息与输入框的占比
let splitterModel = ref<number>(70)

const emits = defineEmits(['emitChildren'])

// 接收子组件的调用
function emitFunction(params: any) {
  let functionName = params.functionName
  switch (functionName) {
    case 'selectContact': {
      selectContact(params.data)
      break
    }
    default:
      break
  }
}

function selectContact(contact: any) {
  currentContact.value.contactId = contact.contactId
  currentContact.value.friendUsername = contact.friendUsername
  if (contact.unReadMessageCount > 0) {
    api.put<ResultResponse<boolean>>('/v1/chat/chat/message/' + contact.contactId + '/read/' + contact.friendUsername).then(result => {
      if (result.data.code === '00000' && result.data.result) {
        console.log("消息已读成功")
      } else {
        console.log("消息已读失败")
      }
    })
  }
  console.log(currentContact.value)
  // TODO 获取当前聊天的消息
}

/**
 * 初始化消息
 */
function initMessage() {
  api.get<ResultResponse<Page<MessageVO>>>('/v1/chat/chat/messages/' + currentContact.value.contactId + '/page/' + user.getUsername()).then(async initialMessages => {
    if (initialMessages.data.code === '00000') {
      if (initialMessages.data.result.content.length > 0) {
        let content = initialMessages.data.result.content
        content.reverse()
        messages.value = content
        await nextTick()
        if (initialMessages.data.result.last) {
          notify.info('已展示所有消息')
        }
        scrollToBottom(initialMessages.data.result.last)
      }
    }
  })
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
  // TODO 完善接口
  await api.post<ResultResponse<boolean>>('/v1/chat/websocket/send_to_user',
      {
        sourceUsername: user.getUsername(),
        sourceAvatar: user.getAvatar(),
        contactId: currentContact.value.contactId,
        content: toSendMessage.value
      }).then(async res => {
    if (res.data.code === '00000' && res.data.result) {
      messages.value.push({
        avatar: user.getAvatar(),
        content: toSendMessage.value,
        sendDateTime: dateTimeUtil.now(),
        sent: true
      })
      routerViewRef.value.sendMessageCurrent(currentContact.value.contactId, toSendMessage.value)
      // 发送成功则清空消息
      toSendMessage.value = ''
      await nextTick()
      scrollToBottom()
    } else {
      // 发送失败
      notify.error('消息发送失败！')
    }
  })
}

/**
 * 收到消息
 * @param newMessages
 */
function receiveMessage(newMessages: any) {
  if (currentContact.value.contactId && currentContact.value.contactId === newMessages.contactId) {
    showReceiveMessage(newMessages)
    api.put<ResultResponse<boolean>>('/v1/chat/chat/message/' + currentContact.value.contactId + '/read/' + currentContact.value.friendUsername).then(result => {
      if (result.data.code === '00000' && result.data.result) {
        console.log("消息已读成功")
      } else {
        console.log("消息已读失败")
      }
    })
    routerViewRef.value.receiveMessageCurrent(newMessages.contactId, newMessages.content)
  } else {
    routerViewRef.value.receiveMessageNoCurrent(newMessages.contactId, newMessages.content)
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
    sendDateTime: dateTimeUtil.now(),
    sent: false
  })
  await nextTick()
  scrollToBottom()
}

/**
 * 聊天框滚动条平移到底部
 */
function scrollToBottom(last: boolean = false) {
  console.log('滚动条最底部')
  let domScroll = scrollAreaRef.value.$el
  // 聊天框带有动画的滚动到最底部
  domScroll.scrollTo({
    top: domScroll.scrollHeight,
    behavior: 'smooth'
  })

  if (firstMoreMessage.value && !last) {
    setTimeout(() => {
      console.log('启动滚动条')
      haveMoreMessage.value = true
      scrollAreaRef.value.resume()
    }, 2000)
  }
}

/**
 * 请求之前的聊天信息
 * @param index
 * @param done
 */
function onLoad(index: any, done: any) {
  setTimeout(() => {
    // 需要在一开始调用的时候停止
    if (!haveMoreMessage.value) {
      // 停止加载更多消息
      scrollAreaRef.value.stop()
      // 因为第一次点击chat会调用该方法，所以需要设置index为0
      if (firstMoreMessage.value) {
        scrollAreaRef.value.setIndex(0)
        firstMoreMessage.value = false
      }
    } else {
      api.get<ResultResponse<Page<MessageVO>>>('/v1/chat/chat/messages/' + currentContact.value.contactId + '/page/' + user.getUsername() + '?page=' + index).then(initialMessages => {
        if (initialMessages.data.code === '00000') {
          if (initialMessages.data.result.content.length > 0) {
            let content = initialMessages.data.result.content
            content = content.reverse()
            messages.value = content.concat(messages.value)
            done()
          } else {
            notify.info('没有更多消息')
            haveMoreMessage.value = false
            done()
          }
        }
      })
    }
  }, 2000)
}

// 监听currentContact的变化
watch(() => currentContact.value.contactId, (value, oldValue) => {
  firstMoreMessage.value = true
  haveMoreMessage.value = false
  scrollAreaRef.value.reset()
  initMessage()
})

defineExpose({
  receiveMessage
})
</script>

<style lang="sass">

</style>
