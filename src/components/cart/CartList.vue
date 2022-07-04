<template>
  <div class="cart__items">
    <template v-if="!isLoading && countItems !== 0">
      <cart-item
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :description="product.description"
        :price="product.price"
        :picture="product.picture"
        :count-item="getCountItem(product.id)"
        @delete="handleDelete"
        @increment="increment"
        @decrement="decrement"
      />
    </template>
    <h1 class="empty-cart" v-else-if="isError || countItems === 0">
      {{ t("cart.empty") }}
      <router-link :to="{ name: 'main' }">{{ t("cart.goBack") }}</router-link>
    </h1>
    <base-spinner v-else width="200px" height="200px" fill="#e15b64" />
  </div>
</template>

<script setup lang="ts">
import CartItem from "./CartItem.vue";
import type Product from "@/models/product/ProductModel";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore } from "@/stores/cart";
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
  countItems: number;
}>();

const { getProductsByIds } = useProduct();
const { t } = useI18n();
const cart = useCartStore();

const products = ref<Array<Product> | null>(null);
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const storageProducts: Array<Product> = JSON.parse(
  localStorage.getItem("cartItems") as string
);

onBeforeMount(async () => {
  isLoading.value = true;
  if (storageProducts && storageProducts.length > 0) {
    products.value = storageProducts;
  } else {
    try {
      products.value = await getProductsByIds(cart.items);
      localStorage.setItem("cartItems", JSON.stringify(products.value));
      isError.value = false;
    } catch (err) {
      isError.value = true;
    }
  }
  isLoading.value = false;
});

// Get count items by id from store
const getCountItem = (id: string) => {
  const currentItem = cart.items.find((item) => item.id === id);

  return currentItem?.count ? currentItem.count : 0;
};

// Increment count item from store
const increment = (id: string) => {
  const currentItemIndex = cart.items.findIndex((item) => item.id === id);

  cart.increment(currentItemIndex);
};

// Decrement count item from store
const decrement = (id: string) => {
  const currentItemIndex = cart.items.findIndex((item) => item.id === id);

  if (cart.items[currentItemIndex].count <= 1) {
    return;
  }
  cart.decrement(currentItemIndex);
};

const handleDelete = (id: string) => {
  cart.handleDelete(id);

  if (products.value)
    products.value = products.value.filter((product) => product.id !== id);

  localStorage.setItem("cartItems", JSON.stringify(products.value));
};
</script>

<style scoped>
.cart__items {
  margin: 1em 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  max-height: 490px;
  overflow: auto;
}

.cart__items > * {
  color: var(--color-text-secondary);
}

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  margin: 1em 0;
}
</style>
