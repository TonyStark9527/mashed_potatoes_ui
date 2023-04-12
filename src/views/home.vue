<template>
  <q-carousel
      v-model="slide"
      vertical
      transition-prev="slide-down"
      transition-next="slide-up"
      transition-duration="4000"
      swipeable
      animated
      navigation
      class="bg-secondary text-white full-height"
  >
    <q-carousel-slide name="style" class="column no-wrap flex-center">
      <q-icon name="style" size="56px" />
      <div class="q-mt-md text-center">

      </div>
    </q-carousel-slide>
    <q-carousel-slide name="tv" class="column no-wrap flex-center">
      <q-icon name="live_tv" size="56px" />
      <div class="q-mt-md text-center">

      </div>
    </q-carousel-slide>
    <q-carousel-slide name="layers" class="column no-wrap flex-center">
      <q-icon name="layers" size="56px" />
      <div class="q-mt-md text-center">

      </div>
    </q-carousel-slide>
    <q-carousel-slide name="map" class="column no-wrap flex-center">
      <q-icon name="terrain" size="56px" />
      <div class="q-mt-md text-center">

      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script setup lang="ts">

import {ref} from "vue"

const slide = ref('style')
</script>
