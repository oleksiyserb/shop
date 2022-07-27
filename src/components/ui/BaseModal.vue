<script setup lang="ts">
defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <teleport to="body">
    <div class="mask" @click="emit('close')"></div>
    <div class="modal" @click.stop>
      <header>
        <slot name="header">
          <h1>{{ title }}</h1>
        </slot>
      </header>
      <section>
        <slot />
      </section>
      <footer>
        <slot name="footer">
          <base-button @click="emit('close')">Close</base-button>
        </slot>
      </footer>
    </div>
  </teleport>
</template>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.modal {
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: var(--color-layout-secondary);
  padding: 1em;
}

header > h1 {
  font-size: 1.125rem;
  font-weight: 600;
}

section {
  padding: 1em;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

footer {
  padding: 1em;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .modal {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
