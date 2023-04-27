<template>
  <div class="q-gutter-xs">
    <q-list bordered class="full-height q-ma-xs">
      <q-scroll-area class="full-width full-height">
        <template v-for="(contact, index) in contacts">
          <q-item class="q-py-md" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img :src="contact.avatar" alt=""/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{contact.remark}}</q-item-label>
              <q-item-label caption lines="1">
                <span class="text-weight-bold">{{contact.lastSendUser}}</span>
                ：{{contact.lastMessage}}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{contact.datetime}}</q-item-label>
              <q-badge v-if="contact.unReadMessageCount !== 0" rounded color="red" class="q-mt-xs">{{contact.unReadMessageCount > 99 ? "99+" : contact.unReadMessageCount}}</q-badge>
            </q-item-section>
          </q-item>
          <q-separator v-if="index !== contacts.length - 1" inset="item" />
        </template>
      </q-scroll-area>
    </q-list>
  </div>
</template>
<script setup lang="ts">

import {ref} from "vue"
import api from "@/api/axios";

let contacts = ref([
  {avatar:'https://cdn.quasar.dev/img/avatar1.jpg',remark:'约翰',lastSendUser:'约翰',lastMessage:'明天周末，一起出去打球怎么样？',datetime:'刚刚',unReadMessageCount:3},
  {avatar:'https://cdn.quasar.dev/img/avatar4.jpg',remark:'托尼',lastSendUser:'我',lastMessage:'你吃了吗？',datetime:'刚刚',unReadMessageCount:0},
  {avatar:'https://cdn.quasar.dev/img/avatar3.jpg',remark:'杰妮',lastSendUser:'我',lastMessage:'已读不回是吧',datetime:'刚刚',unReadMessageCount:0},
  {avatar:'https://cdn.quasar.dev/img/avatar2.jpg',remark:'简',lastSendUser:'简',lastMessage:'你™才是傻子',datetime:'刚刚',unReadMessageCount:9999}
])

// TODO 调用接口获取contacts
</script>
