<template>
  <div class="container">
    <div class="cabinet__profile">
      <h1>{{ t("cabinet.welcome") }}{{ userName }}!</h1>
      <p>
        {{ t("cabinet.yourId") }}<strong>{{ userId }}</strong>
      </p>
      <p>
        {{ t("cabinet.yourName") }}<strong>{{ userName }}</strong>
      </p>
      <p>
        {{ t("cabinet.yourEmail") }}<strong>{{ userEmail }}</strong>
      </p>
    </div>
    <div class="cabinet__history-payment" v-if="orders?.length !== 0">
      <h1>{{ t("cabinet.yourHistory") }}</h1>
      <section class="cabinet__session" v-if="!isLoading">
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
      <base-spinner v-else width="200px" height="200px" fill="#e15b64" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderItem from "@/components/order/OrderItem.vue";
import { ref } from "vue";
import { useOrders } from "@/hooks/useOrders";
import type Order from "@/models/order/OrderModel";
import { useAuthStore } from "@/stores/auth";
import { onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";

interface FullOrder extends Order {
  id: string;
}

const orders = ref<Array<FullOrder> | null>(null);
const isLoading = ref<boolean>(false);
const { t } = useI18n();
const { userName, userId, userEmail } = useAuthStore();
const { getOrdersByUserId } = useOrders();

onBeforeMount(async () => {
  isLoading.value = true;
  if (userId) orders.value = await getOrdersByUserId(userId);
  isLoading.value = false;
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
