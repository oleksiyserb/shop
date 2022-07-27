<script setup lang="ts">
import { useI18n } from "vue-i18n";
import useCartStore from "@/stores/cart";

defineProps<{
  totalPrice: string;
}>();

const { t } = useI18n();
const cart = useCartStore();
</script>

<template>
  <aside class="order-info">
    <base-card>
      <header class="order-info__header">
        <h1>{{ t("order.aside.title") }}</h1>
      </header>
      <div class="order-info__price">
        <span
          >{{ t("order.aside.toPay") }} (x{{ cart.items.length }}):
          <strong>{{ totalPrice }}</strong></span
        >
      </div>
      <footer class="order-info__actions">
        <base-button>{{ t("order.aside.button") }}</base-button>
      </footer>
    </base-card>
  </aside>
</template>

<style scoped>
.order-info__header {
  border-bottom: 1px solid var(--color-border);
}

.order-info__header > h1 {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.order-info__actions {
  border-top: 1px solid var(--color-border);
}

.order-info__actions > button {
  margin-top: 0.5em;
}

.order-info__items {
  max-height: 200px;
  overflow: auto;
}

.order-info__price {
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
}

.order-info__price > span {
  margin: 0.5em 0;
}

.order-info__actions > button {
  width: 100%;
}
</style>
