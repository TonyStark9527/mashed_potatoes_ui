<template>
  <div class="q-gutter-none full-height full-width">

    <q-scroll-area class="full-width full-height q-pa-xs">
      <q-list class="full-height full-width">
        <template v-for="(contact, index) in contacts">
          <q-item class="q-py-md q-mx-auto full-width" clickable v-ripple @click="selectContact(contact)">
            <q-item-section avatar>
              <q-avatar>
                <img :src="contact.avatar" alt=""/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{ contact.remark }}</q-item-label>
              <q-item-label caption lines="2" style="min-height: 29px">
                <span class="text-weight-bold">{{ contact.lastSendAlias }}</span>
                ：{{ contact.lastMessage }}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <!--ui调整-->
              <q-item-label caption>{{ contact.lastContactDateTime }}</q-item-label>
              <q-badge v-if="contact.unReadMessageCount !== 0" rounded color="red" class="q-mt-xs">
                {{ contact.unReadMessageCount > 99 ? "99+" : contact.unReadMessageCount }}
              </q-badge>
            </q-item-section>
          </q-item>
          <q-separator v-if="index !== contacts.length - 1" inset="item"/>
        </template>
      </q-list>
    </q-scroll-area>

  </div>
</template>
<script setup lang="ts">

import {ref} from "vue"
import api from "@/api/axios"
import {userStore} from "@/store/userStore"
import notify from "@/utils/notify"
import dateTimeUtil from "@/utils/dateTime"

const user = userStore()
let contacts = ref<any>()

const emits = defineEmits(['emitChildren'])

function selectContact(value: any) {
  const params = {
    functionName: 'selectContact',
    data: value
  }
  emits('emitChildren', params)
  // 将选中的聊天框的未读消息设置为0
  contacts.value.forEach((contact: any) => {
    if (contact.friendUsername === value.friendUsername) {
      contact.unReadMessageCount = 0
    }
  })
}

api.get('/v1/chat/chat/contacts/' + user.getUsername()).then(res => {
  if (res.data.code === '00000' && res.data.result) {
    contacts.value = res.data.result
    contacts.value.forEach((contact: any) => {
      contact.lastContactDateTime = contact.lastContactDateTime.substring(11,16)
    })
  }
})

// TODO 完善这个三个方法 时间点，最后发送人，最后一条消息
function receiveMessageNoCurrent(contactId: number, content: string) {
  notify.info('您有一条未读消息')
  contacts.value.forEach((contact: any) => {
    if (contact.contactId === contactId) {
      contact.unReadMessageCount += 1
      contact.lastMessage = content
      contact.lastSendAlias = contact.remark
      contact.lastContactDateTime = dateTimeUtil.now('hh:mm')
    }
  })
  console.log(contacts.value)
}

function receiveMessageCurrent(contactId: number, content: string) {
  contacts.value.forEach((contact: any) => {
    if (contact.contactId === contactId) {
      contact.lastMessage = content
      contact.lastSendAlias = contact.remark
      contact.lastContactDateTime = dateTimeUtil.now('hh:mm')
    }
  })
  console.log(contacts.value)
}

function sendMessageCurrent(contactId: number, content: string) {
  contacts.value.forEach((contact: any) => {
    if (contact.contactId === contactId) {
      contact.lastMessage = content
      contact.lastSendAlias = '我'
      contact.lastContactDateTime = dateTimeUtil.now('hh:mm')
    }
  })
}

defineExpose({
  receiveMessageNoCurrent,
  sendMessageCurrent,
  receiveMessageCurrent
})
// TODO 调用接口获取contacts
</script>

<style lang="sass">
.q-scrollarea__content
  width: 100%
</style>
