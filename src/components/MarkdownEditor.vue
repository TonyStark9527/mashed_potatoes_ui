<template>
  <div style="height: 100%; width: 100%">
    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
      <div v-show="vditorShow" id="vditor">
      </div>
    </transition>
    <q-inner-loading :showing="loading" class="position-initial">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import Vditor from "vditor"
import 'vditor/dist/index.css'
import {useQuasar} from "quasar"

const $q = useQuasar()

const vditorShow = ref<boolean>(false)
const loading = ref<boolean>(true)

const vditor = ref<Vditor | null>(null)

function getValue() {
  return  vditor.value!.getValue()
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '100%',
    width: '100%',
    theme: $q.dark.isActive ? 'dark' : 'classic',
    mode: 'sv',
    preview: {
      actions: []
    },
    after: () => {
      vditor.value!.setValue('Vue Composition API + Vditor + TypeScript Minimal Example')
      loading.value = false
    }
  })
})

// 监听主题模式的变化，变化编辑器主题
watch(() => $q.dark.isActive, () => {
  vditor.value!.setTheme($q.dark.isActive ? 'dark' : 'classic')
})

watch(() => loading.value, () => {
  setTimeout(() => {
    vditorShow.value = true
  }, 300)
})

defineExpose({
  getValue
})
</script>

<style lang="sass">
.position-initial
  position: inherit
  height: 100%
  width: 100%
</style>
