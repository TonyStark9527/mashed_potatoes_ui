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
import {onMounted, ref, watch} from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {useQuasar} from 'quasar'

const $q = useQuasar()

const vditorShow = ref<boolean>(false)
const loading = ref<boolean>(true)

const vditor = ref<Vditor | null>(null)

function getValue() {
  return vditor.value!.getValue()
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '100%',
    width: '100%',
    toolbar: [
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      '|',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'edit-mode',
      {
        name: 'more',
        toolbar: [
          'export',
          'preview'
        ],
      }],
    toolbarConfig: {
      pin: true
    },
    theme: $q.dark.isActive ? 'dark' : 'classic',
    icon: 'material',
    mode: 'sv',
    preview: {
      actions: []
    },
    after: () => {
      vditor.value!.setValue('```abc\n' +
          'X: 24   \n' +
          'T: Clouds Thicken   \n' +
          'C: Paul Rosen   \n' +
          'S: Copyright 2005, Paul Rosen   \n' +
          'M: 6/8   \n' +
          'L: 1/8   \n' +
          'Q: 3/8=116   \n' +
          'R: Creepy Jig   \n' +
          'K: Em   \n' +
          '|:"Em"EEE E2G|"C7"_B2A G2F|"Em"EEE E2G|\\   \n' +
          '"C7"_B2A "B7"=B3|"Em"EEE E2G|   \n' +
          '"C7"_B2A G2F|"Em"GFE "D (Bm7)"F2D|\\   \n' +
          '1"Em"E3-E3:|2"Em"E3-E2B|:"Em"e2e gfe|   \n' +
          '"G"g2ab3|"Em"gfeg2e|"D"fedB2A|"Em"e2e gfe|\\   \n' +
          '"G"g2ab3|"Em"gfe"D"f2d|"Em"e3-e3:|\n' +
          '```')
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
