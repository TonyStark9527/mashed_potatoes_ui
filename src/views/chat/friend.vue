<template>
  <div class="q-gutter-none full-height full-width column no-wrap">

    <q-btn-group class="row text-secondary no-shadow" spread stretch square style="height: 60px">
      <q-btn label="添加好友" icon="person_add"/>
      <q-btn label="分组管理" icon="diversity_3"/>
    </q-btn-group>

    <q-separator/>

    <q-input standout="bg-teal text-white" v-model="text" class="row" label="搜索好友">
      <template v-slot:prepend>
        <q-icon name="person_search"/>
      </template>
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search"/>
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''"/>
      </template>
    </q-input>

    <q-scroll-area class="full-width full-height q-pa-xs row">
      <q-list class="rounded-borders full-height">
        <q-expansion-item
            expand-separator
            icon="diversity_2"
            label="默认分组"
            header-class="text-secondary"
        >
          <q-list bordered style="border-top: 0; border-left: 0; border-right: 0">
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
            <q-separator inset="item" />
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
            expand-separator
            icon="diversity_2"
            label="默认分组"
            header-class="text-secondary"
        >
          <q-list bordered style="border-top: 0; border-left: 0; border-right: 0">
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
            <q-separator inset="item" />
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
            expand-separator
            icon="diversity_2"
            label="默认分组"
            header-class="text-secondary"
        >
          <q-list bordered style="border-top: 0; border-left: 0; border-right: 0">
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
            <q-separator inset="item" />
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
            expand-separator
            icon="diversity_2"
            label="默认分组"
            header-class="text-secondary"
        >
          <q-list bordered style="border-top: 0; border-left: 0; border-right: 0">
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
            <q-separator inset="item" />
            <q-item class="q-my-sm">
              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  卧槽
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>卧槽</q-item-label>
                <q-item-label caption lines="1">wwk981124@gmail.com</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn size="xs" round color="secondary" icon="more_vert" @click="click"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>
<script setup lang="ts">
import notify from "@/utils/notify"
import {ref} from "vue"

let text = ref<string>('')

function click() {
  notify.info('我被点击了')
}
</script>
