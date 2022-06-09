<template>
  <the-header />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import TheHeader from "./components/layouts/TheHeader.vue";
</script>

<style>
@import "@/assets/reset.css";
@import "@/assets/base.css";
</style>
