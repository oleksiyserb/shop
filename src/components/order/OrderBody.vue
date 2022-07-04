<template>
  <div class="body">
    <slot />
  </div>
</template>

<style scoped>
.body {
  margin: 0.5em 0 0 2em;
}

@media (max-width: 425px) {
  .body {
    margin: 0.5em 0 0 0;
  }
}
</style>
