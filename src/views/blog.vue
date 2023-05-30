<template>
  <div id="vditor"></div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Vditor from "vditor"
import 'vditor/dist/index.css'

const vditor = ref<Vditor | null>(null)

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '100%',
    theme: 'dark',
    mode: 'sv',
    toolbar: ['emoji'],
    after: () => {
      vditor.value!.setValue('Vue Composition API + Vditor + TypeScript Minimal Example')
    }
  })
})
</script>
