<template>
  <div class="cart__item">
    <picture>
      <img :src="picture" alt="collar" />
    </picture>
    <div class="cart__item-content">
      <h1>{{ title }}</h1>
      <p>
        {{ description }}
      </p>
      <div class="cart__item-details">
        <div class="cart__item-count">
          <button @click="emit('decrement', id)">-</button>
          <span>{{ countItem }}</span>
          <button @click="emit('increment', id)">+</button>
        </div>
        <strong>{{ fullPrice }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHelpers } from "@/hooks/useHelpers";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  id: string;
  picture: string;
  title: string;
  description: string;
  price: number;
  countItem: number;
}>();

const emit = defineEmits<{
  (e: "decrement", id: string): void;
  (e: "increment", id: string): void;
}>();

const { formatedPrice } = useHelpers();

const fullPrice = computed(() => {
  const price = props.countItem * props.price;

  return formatedPrice(price);
});
</script>

<style scoped>
.cart__item {
  margin: var(--section-gap) 0;
  display: flex;
}

picture > img {
  height: 220px;
  width: 200px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

.cart__item-content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0 var(--section-gap);
}

.cart__item-content > h1 {
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.cart__item-content > p {
  line-height: 1.2;
}

.cart__item-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart__item-count > * {
  margin: 0 0.5em;
}

.cart__item-count > button {
  background-color: transparent;
  border: none;
  transition: color 0.3s;
}

.cart__item-count > button:hover {
  color: var(--color-link-hover);
}

.cart__item-count > span {
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  padding: 0 0.5em;
}
</style>
