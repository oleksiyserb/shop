<template>
  <router-link class="flat" :to="to" v-if="link">
    <slot />
  </router-link>
  <button class="flat" v-else>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  to?: object | string;
  link?: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.flat {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-button);
  transition: background-color 0.3s;
  font-size: 1.125rem;
  border: none;
}

a.flat {
  text-decoration: none;
}

.flat:hover {
  background-color: var(--color-button-hover);
}

button:disabled {
  background-color: var(--color-button-disabled);
}
</style>
