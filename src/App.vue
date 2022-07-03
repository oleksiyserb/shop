<template>
  <the-header v-model:locale="locale" />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
  <the-footer />
</template>

<script setup lang="ts">
import TheHeader from "./components/layouts/TheHeader.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
import { useI18n } from "vue-i18n";
import { useAuth } from "./hooks/useAuth";
import { onBeforeMount } from "vue";
import { useAuthStore } from "./stores/auth";
import { useCartStore } from "./stores/cart";

const { getCurrentUser } = useAuth();
const authStore = useAuthStore();
const cartStore = useCartStore();

cartStore.initializeCart();
const { locale } = useI18n();

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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active {
  transition: all 0.3s ease-in;
}

.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
