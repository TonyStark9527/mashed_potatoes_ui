<template>
<!--  <q-btn label="hshsh" @click="get"></q-btn>-->
  <div style="height: 50%; width: 50%">
    <markdown-editor ref="markdown"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const markdown = ref<any>(null)
</script>
