<template>
  <q-drawer show-if-above side="left" behavior="desktop" elevated>
    <q-tree node-key="label" :nodes="simple" v-model:selected="selected" selected-color="primary" class="q-pa-md"
            default-expand-all>
      <template v-slot:default-header="prop">
        <q-btn :icon="prop.node.icon" outline rounded :color="prop.node.color || 'primary'" class="full-width" :label="prop.node.label" />
      </template>
    </q-tree>
  </q-drawer>

  <q-page class="row full-height">
    <div class="column full-height full-width">
      <router-view v-slot="{Component, route}">
        <component ref="routerViewRef" :is="Component"/>
      </router-view>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import {ref} from "vue";

const menu = ref('store')
const routerViewRef = ref<any>(null)

const simple = ref(
    [
      {
        label: '全部文件',
        children: [
          {
            label: '图片',
            icon: 'mdi-image-area'
          },
          {
            label: '文档',
            icon: 'mdi-file-document'
          },
          {
            label: '视频',
            icon: 'mdi-movie-filter'
          },
          {
            label: '其他',
            icon: 'mdi-dots-horizontal'
          }
        ]
      },
      {
        label: '回收站',
        icon: 'mdi-trash-can',
        color: 'red'
      },
      {
        label: '快捷访问',
        color: 'secondary',
        children: [
          {
            label: 'Food',
            icon: 'mdi-folder',
            color: 'secondary',
          },
          {
            label: 'Room service',
            icon: 'mdi-folder',
            color: 'secondary',
          },
          {
            label: 'Room view',
            icon: 'mdi-folder',
            color: 'secondary',
          }
        ]
      }
    ])
let selected = ref('Food')
</script>
