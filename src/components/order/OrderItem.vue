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
      <p>{{ count }}</p>
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

const props = defineProps<{
  picture: string;
  title: string;
  price: number;
  count: number;
}>();

const { formatedPrice } = useHelpers();

const normalizedPrice = computed(() => formatedPrice(props.price));

const totalPrice = computed(() => {
  const price = props.count * props.price;
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

.product > div > p {
  max-width: 200px;
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
  margin: 0 0.5em;
}

.product > div > span {
  font-size: 0.8rem;
  margin-bottom: 0.5em;
  color: var(--color-text-tertiary);
  display: inline-block;
}

@media (max-width: 425px) {
  .product > div > span {
    font-size: 0.5rem;
  }
  .product > div > p {
    font-size: 0.8rem;
  }

  .product > div > p {
    max-width: auto;
  }
}

.product > picture > img {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
