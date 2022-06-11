<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  padding: 1em;
  background-color: var(--color-card);
  border-radius: 12px;
}
</style>
