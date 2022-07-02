<template>
  <section class="cart">
    <div class="container">
      <base-card>
        <header class="cart__header">
          <h1>Cart Items: ({{ countItems }})</h1>
        </header>
        <div class="cart__items">
          <template v-if="!isLoading && products?.length !== 0">
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
            Cart is empty
            <router-link :to="{ name: 'main' }">go back</router-link>
          </h1>
          <base-spinner v-else width="200px" height="200px" fill="#e15b64" />
        </div>
        <div class="cart__actions">
          <base-button :to="{ name: 'ordering' }" v-if="countItems > 0" link
            >Ordering</base-button
          >
          <span
            >Total Price: <strong>{{ totalPrice }}</strong></span
          >
        </div>
      </base-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProduct } from "@/hooks/useProduct";
import type Product from "@/models/product/ProductModel";
import CartItem from "@/components/cart/CartItem.vue";
import { ref, computed } from "@vue/reactivity";
import { useHelpers } from "@/hooks/useHelpers";
import { useCartStore } from "@/stores/cart";

const { formatedPrice } = useHelpers();
const { getProductsByIds } = useProduct();
const cartStore = useCartStore();
const products = ref<Array<Product> | null>(null);
const isError = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const storageProducts: Array<Product> = JSON.parse(
  localStorage.getItem("cartItems") as string
);

(async () => {
  isLoading.value = true;
  if (storageProducts && storageProducts.length > 0) {
    products.value = storageProducts;
  } else {
    try {
      products.value = await getProductsByIds(cartStore.items);
      localStorage.setItem("cartItems", JSON.stringify(products.value));
      isError.value = false;
    } catch (err) {
      isError.value = true;
    }
  }
  isLoading.value = false;
})();

const totalPrice = computed(() => {
  const count = ref<number>(0);

  cartStore.items.forEach((item) => {
    count.value += item.count * item.price;
  });

  return formatedPrice(count.value);
});

// All Count Items
const countItems = computed(() => cartStore.countItems);

// Get count items by id from store
const getCountItem = (id: string) => {
  const currentItem = cartStore.items.find((item) => item.id === id);

  return currentItem?.count ? currentItem.count : 0;
};

// Increment count item from store
const increment = (id: string) => {
  const currentItemIndex = cartStore.items.findIndex((item) => item.id === id);

  cartStore.increment(currentItemIndex);
};

// Decrement count item from store
const decrement = (id: string) => {
  const currentItemIndex = cartStore.items.findIndex((item) => item.id === id);

  if (cartStore.items[currentItemIndex].count <= 1) {
    return;
  }
  cartStore.decrement(currentItemIndex);
};

const handleDelete = (id: string) => {
  cartStore.handleDelete(id);

  if (products.value)
    products.value = products.value.filter((product) => product.id !== id);

  localStorage.setItem("cartItems", JSON.stringify(products.value));
};
</script>

<style scoped>
.cart * {
  color: var(--color-text-secondary);
}

.cart__header > h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.cart__items {
  margin: 1em 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  max-height: 490px;
  overflow: auto;
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

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  margin: 1em 0;
}
</style>
