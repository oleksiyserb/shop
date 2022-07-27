<script setup lang="ts">
defineProps<{
  title: string;
  rank: string;
}>();
</script>

<template>
  <header class="order-header">
    <span>{{ rank }}</span>
    <p>{{ title }}</p>
  </header>
</template>

<style scoped>
.order-header {
  display: flex;
  align-items: center;
}

.order-header > span {
  margin-right: 0.5em;
  padding: 0.3rem 0.5rem;
  background-color: var(--color-layout-secondary);
  font-weight: bold;
  border-radius: 50%;
}

.order-header > p {
  font-size: 1.5rem;
}
</style>
