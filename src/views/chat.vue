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
      <div class="q-pa-xs" style="height: calc(100% - 200px);overflow: auto">
        <q-scroll-area class="full-width full-height" ref="scrollAreaRef">
          <q-chat-message
              avatar="https://cdn.quasar.dev/img/avatar1.jpg"
              :text="['hey, how are you?','hey, how are you?','hey, how are you?','hey, how are you?']"
              stamp="7 minutes ago"
              sent
              text-color="white"
              bg-color="secondary"
          />
          <q-chat-message
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="['doing fine, how r you?']"
              stamp="4 minutes ago"
              text-color="white"
              bg-color="primary"
          />
          <q-chat-message
              avatar="https://cdn.quasar.dev/img/avatar1.jpg"
              :text="['hey, how are you?','hey, how are you?','hey, how are you?','hey, how are you?']"
              stamp="7 minutes ago"
              sent
              text-color="white"
              bg-color="secondary"
          />
          <q-chat-message
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="['doing fine, how r you?']"
              stamp="4 minutes ago"
              text-color="white"
              bg-color="primary"
          />
          <q-chat-message
              avatar="https://cdn.quasar.dev/img/avatar1.jpg"
              :text="['hey, how are you?','hey, how are you?','hey, how are you?','hey, how are you?']"
              stamp="7 minutes ago"
              sent
              text-color="white"
              bg-color="secondary"
          />
          <q-chat-message
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="['doing fine, how r you?']"
              stamp="4 minutes ago"
              text-color="white"
              bg-color="primary"
          />
        </q-scroll-area>
      </div>
      <div class="q-pa-xs q-gutter-sm" style="height: 200px">
        <q-editor class="full-height" v-model="toSendMessage"
                  :definitions="{send: {tip: '发送',icon: 'send',label: '发送', handler: click}}" :toolbar="[['send']]"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const menu = ref('message');

const toSendMessage = ref('测试')

const scrollAreaRef = ref(null)

function click() {
  scrollAreaRef.value?.setScrollPosition('vertical', 1000, 1000)
}

onMounted(() => {
  scrollAreaRef.value?.setScrollPosition('vertical', 1000, 1000)
})
// TODO 集成websocket
</script>

<style lang="sass">

</style>
