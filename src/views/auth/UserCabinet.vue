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
    <div class="cabinet__history-payment" v-if="orders?.length !== 0">
      <h1>Your history payment:</h1>
      <section class="cabinet__session">
        <div v-for="order in orders" :key="order.id">
          <header class="cabinet__header">
            <h2>{{ order.createdAt }}</h2>
          </header>
          <base-card>
            <order-item
              v-for="product in order.items"
              :key="product.id"
              :id="product.id"
              :picture="product.picture"
              :price="product.price"
              :count="product.count"
              :title="product.title"
            />
          </base-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderItem from "@/components/order/OrderItem.vue";
import { ref } from "vue";
import { useOrders } from "@/hooks/useOrders";
import type Order from "@/models/OrderModel";
import { useAuthStore } from "@/stores/auth";
import { onBeforeMount } from "vue";

interface FullOrder extends Order {
  id: string;
}

const orders = ref<Array<FullOrder> | null>(null);
const { userName, userId, userEmail } = useAuthStore();
const { getOrdersByUserId } = useOrders();

onBeforeMount(async () => {
  if (userId) orders.value = await getOrdersByUserId(userId);
});
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

.cabinet__session > div > .card {
  border-top-left-radius: 0 !important;
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
