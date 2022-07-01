<template>
  <div class="product">
    <picture><img :src="picture" alt="labrador" /></picture>
    <div>
      <span>Title</span>
      <p>{{ title }}</p>
    </div>
    <div>
      <span>Price</span>
      <p>{{ normalizedPrice }}</p>
    </div>
    <div>
      <span>Count</span>
      <p>{{ getCountItem }}</p>
    </div>
    <div>
      <span>Total price</span>
      <p>{{ totalPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useHelpers } from "@/hooks/useHelpers";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
  id: string;
  picture: string;
  title: string;
  price: number;
}>();

const { formatedPrice } = useHelpers();
const cartStore = useCartStore();

const normalizedPrice = computed(() => formatedPrice(props.price));

// Get count items by id from store
const getCountItem = computed(() => {
  const currentItem = cartStore.items.find((item) => item.id === props.id);

  return currentItem?.count ? currentItem.count : 0;
});

const totalPrice = computed(() => {
  const price = getCountItem.value * props.price;
  return formatedPrice(price);
});
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0.5em 0;
}

.product + .product {
  border-top: 1px solid var(--color-border);
}

.product * {
  color: var(--color-text-secondary);
}

.product > div {
  text-align: center;
  flex-grow: 1;
}

.product > div > span {
  font-size: 0.8rem;
  margin-bottom: 0.5em;
  color: var(--color-text-tertiary);
  display: inline-block;
}

.product > picture > img {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.product > div > p {
  max-width: 200px;
  margin: 0 auto;
}
</style>
