<template>
  <div class="product__item">
    <base-card>
      <router-link class="product__link-mask" to="/collar"></router-link>
      <header>
        <h4>{{ title }}</h4>
      </header>
      <picture>
        <img :src="picture" alt="collar" />
      </picture>
      <div class="product__info">
        <ul class="product__rating">
          <li v-for="i in 5" :key="i">
            <star-icon :selected="getRating(i, rating)" />
          </li>
        </ul>
        <div class="product__actions">
          <strong>{{ formatedPrice }}</strong>
          <base-button>Add To Cart</base-button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import StarIcon from "../icons/StarIcon.vue";
interface Product {
  id: string;
  title: string;
  rating: number;
  price: number;
  picture: string;
  count: number;
}

const props = defineProps<Product>();

const formatedPrice = computed((): string => {
  if (String(props.price).length > 3) {
    const arrayPrice = String(props.price).split("").reverse();

    for (let i = 3; arrayPrice.length > i; i += 4) {
      arrayPrice.splice(i, 0, " ");
    }

    return `₴ ${arrayPrice.reverse().join("")}`;
  }

  return `₴ ${props.price}`;
});

const getRating = (i: number, rating: number): boolean => {
  return rating - i >= 0;
};
</script>

<style scoped>
.product__item {
  grid-column: span 4;
  position: relative;
}

.product__link-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 3.75em;
  z-index: 4;
}

.product__link-mask:hover + header > h4 {
  color: var(--color-link-hover);
}

@media (max-width: 768px) {
  .product__item {
    grid-column: span 6;
  }
}

@media (max-width: 425px) {
  .product__item {
    grid-column: span 12;
  }

  .product__item picture > img {
    height: 200px;
    object-fit: cover;
    object-position: top;
  }
}

header {
  margin-bottom: 1em;
}

header > h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color 0.3s;
}

picture {
  display: block;
}

picture > img {
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product__info > *:not(button) {
  margin: 0.5rem 0;
  color: var(--color-text-secondary);
}

.product__rating {
  display: flex;
  border-radius: 12px;
}

.product__actions > strong {
  margin: 0.5em 0;
  display: block;
}

.product__actions > button {
  display: block;
  width: 100%;
}

.product__actions > strong {
  font-size: 1.125rem;
}
</style>
