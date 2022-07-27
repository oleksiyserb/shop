<script setup lang="ts">
import CartList from "../../components/cart/CartList.vue";
import { ref, computed } from "@vue/reactivity";
import useHelpers from "@/hooks/useHelpers";
import useCartStore from "@/stores/cart";
import { useI18n } from "vue-i18n";

const { formatedPrice } = useHelpers();
const { t } = useI18n();

const cartStore = useCartStore();

const totalPrice = computed(() => {
  const count = ref<number>(0);

  cartStore.items.forEach((item) => {
    count.value += item.count * item.price;
  });

  return formatedPrice(count.value);
});

// All Count Items
const countItems = computed(() => cartStore.countItems);
</script>

<template>
  <section class="cart">
    <div class="container">
      <base-card>
        <header class="cart__header">
          <h1>{{ t("cart.cartItems", { count: countItems }) }}</h1>
        </header>
        <cart-list :countItems="countItems" />
        <div class="cart__actions">
          <base-button :to="{ name: 'ordering' }" v-if="countItems > 0" link>{{
            t("action.ordering")
          }}</base-button>
          <span v-html="t('cart.totalPrice', { totalPrice })"></span>
        </div>
      </base-card>
    </div>
  </section>
</template>

<style scoped>
.cart * {
  color: var(--color-text-secondary);
}

.cart__header > h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.cart__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart__actions > * {
  margin: 0.5em;
}

.cart__actions > button {
  color: var(--color-text);
}
</style>
