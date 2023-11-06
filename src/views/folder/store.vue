<template>
  <q-scroll-area class="full-width full-height q-pa-xs row">
    <div class="row justify-center q-gutter-sm">
      <q-intersection
          v-for="index in 60"
          :key="index"
          class="example-item"
      >
        <q-card flat bordered class="q-ma-sm">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="text-h6">Card #{{ index }}</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-scroll-area>
</template>
<script setup lang="ts"></script>
<style lang="sass">
.example-item
  height: 290px
  width: 290px
</style>
