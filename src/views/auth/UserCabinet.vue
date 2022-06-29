<template>
  <div class="container">
    <div class="cabinet__profile">
      <h1>Welcome {{ userName }}!</h1>
      <p>
        Your id: <strong>{{ userId }}</strong>
      </p>
      <p>
        Your Name: <strong>{{ userName }}</strong>
      </p>
      <p>
        Your Email: <strong>{{ userEmail }}</strong>
      </p>
    </div>
    <div class="cabinet__history-payment">
      <h1>Your history payment:</h1>
      <section class="cabinet__session">
        <header class="cabinet__header">
          <h2>29.06.2022</h2>
        </header>
        <base-card>
          <order-item />
          <order-item />
          <order-item />
          <order-item />
        </base-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderItem from "@/components/order/OrderItem.vue";
import { useAuthStore } from "@/stores/auth";

const { userName, userId, userEmail } = useAuthStore();
</script>

<style scoped>
.cabinet__profile {
  margin-bottom: 2em;
}

.cabinet__profile > * {
  margin: 0.5em 0;
}

.cabinet__profile > h1 {
  font-size: 1.875rem;
}

.cabinet__profile > p {
  font-size: 1.125rem;
}

.cabinet__history-payment > h1 {
  font-size: 1.875rem;
}

.cabinet__header {
  margin-top: 1em;
}

.cabinet__session > .card {
  border-top-left-radius: 0;
}

.cabinet__header > h2 {
  background-color: var(--color-layout-tertiary);
  display: inline-block;
  color: var(--color-text-secondary);
  padding: 0.5rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid var(--color-border);
}
</style>
