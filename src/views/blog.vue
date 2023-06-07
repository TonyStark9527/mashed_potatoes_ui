<template>
<!--  <q-btn label="hshsh" @click="get"></q-btn>-->
  <div style="height: 50%; width: 50%">
    <video-player :src="url" :media-source="mediaSource" />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const url = ref<string>('http://127.0.0.1/视频2.mp4')
// const markdown = ref<any>(null)
const mediaSource = ref<string>('default')
</script>
