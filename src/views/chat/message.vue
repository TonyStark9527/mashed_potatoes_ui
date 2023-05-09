<template>
  <div class="q-gutter-none">

    <q-scroll-area class="full-width full-height q-pa-xs">
      <q-list class="full-height">
        <template v-for="(contact, index) in contacts">
          <q-item class="q-py-md q-mx-auto" clickable v-ripple @click="selectContact(contact)">
            <q-item-section avatar>
              <q-avatar>
                <img :src="contact.avatar" alt=""/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{ contact.remark }}</q-item-label>
              <q-item-label caption lines="1">
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

const user = userStore()
let contacts = ref<any>()

const emits = defineEmits(['emitChildren'])

function selectContact(value: any) {
  const params = {
    functionName: 'selectContact',
    data: value
  }
  emits('emitChildren', params)
}

api.get('/v1/chat/chat/contacts/' + user.getUsername()).then(res => {
  if (res.data.code === '00000' && res.data.result) {
    contacts.value = res.data.result
  }
})

// TODO 调用接口获取contacts
</script>
