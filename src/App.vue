<template>
  <the-header />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>

<script setup lang="ts">
import TheHeader from "./components/layouts/TheHeader.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
</script>

<style>
@import "@/assets/css/reset.css";
@import "@/assets/css/base.css";
</style>
