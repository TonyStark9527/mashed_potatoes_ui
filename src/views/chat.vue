<template>
  <q-drawer show-if-above side="left" elevated mini>
    <q-list class="fixed-center full-width">
      <q-item clickable v-ripple :active="menu === 'message'" class="text-secondary" @click="menu='message'">
        <q-item-section avatar>
          <q-btn round icon="o_mark_unread_chat_alt" :class="menu === 'message'? 'bg-secondary text-white':''">
            <q-badge floating rounded color="red">2</q-badge>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="menu === 'friend'" class="text-secondary" @click="menu='friend'">
        <q-item-section avatar>
          <q-btn round icon="o_people_alt" :class="menu === 'friend'? 'bg-secondary text-white':''">
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="menu === 'setting'" class="text-secondary" @click="menu='setting'">
        <q-item-section avatar>
          <q-btn round icon="question_answer" :class="menu === 'setting'? 'bg-secondary text-white':''">
            <q-badge floating rounded color="red">2</q-badge>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view/>
  </q-page-container>
</template>

<script setup lang="ts">
import {ref} from "vue";

const menu = ref('message');
</script>

<style lang="sass">

</style>