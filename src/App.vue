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
import { onBeforeMount } from "vue";
import { useAuthStore } from "./stores/auth";

const { getCurrentUser } = useAuth();
const authStore = useAuthStore();

onBeforeMount(async () => {
  const user = await getCurrentUser();

  if (user !== null) {
    authStore.autoAuth(user);
  }
});
</script>

<style>
@import "@/assets/css/reset.css";
@import "@/assets/css/base.css";
</style>
