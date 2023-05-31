<template>
  <div id="vditor"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import Vditor from "vditor"
import 'vditor/dist/index.css'
import {useQuasar} from "quasar"

const $q = useQuasar()

const vditor = ref<Vditor | null>(null)

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '100%',
    width: '100%',
    theme: $q.dark.isActive ? 'dark' : 'classic',
    mode: 'sv',
    toolbar: ['emoji'],
    after: () => {
      vditor.value!.setValue('Vue Composition API + Vditor + TypeScript Minimal Example')
    }
  })
})

// 监听主题模式的变化，变化编辑器主题
watch(() => $q.dark.isActive, () => {
  vditor.value!.setTheme($q.dark.isActive ? 'dark' : 'classic')
})
</script>
