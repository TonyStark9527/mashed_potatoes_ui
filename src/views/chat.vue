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
    <router-view style="overflow: auto; min-height: 100%; max-height: 100%;  min-width: 400px; max-width: 400px;"/>
    <q-page style="overflow: auto; min-height: 100%; max-height: 100%;  min-width: calc(100% - 400px); max-width: calc(100% - 400px);">
      这里是聊天窗口
    </q-page>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from "vue";

const menu = ref('message');
</script>

<style lang="sass">

</style>
