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
import { useAuth } from "./hooks/useAuth";
import { useAuthStore } from "./stores/auth";

const { getUser } = useAuth();
const authStore = useAuthStore();

getUser((user) => {
  if (user) {
    authStore.autoAuth(user);
  }
});
</script>

<style>
@import "@/assets/css/reset.css";
@import "@/assets/css/base.css";
</style>
