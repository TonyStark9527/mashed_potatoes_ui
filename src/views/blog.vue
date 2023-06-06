<template>
<!--  <q-btn label="hshsh" @click="get"></q-btn>-->
  <div style="height: 100%; width: 100%">
    <markdown-editor ref="markdown"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const markdown = ref<any>(null)
</script>
