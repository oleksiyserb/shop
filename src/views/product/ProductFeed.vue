<script setup lang="ts">
import ProductFilter from "../../components/product/ProductFilter.vue";
import ProductList from "../../components/product/ProductList.vue";
import { ref } from "@vue/reactivity";
import type Types from "@/models/TypesModel";

const types = ref<Types>({
  canvas: true,
  sport: true,
  waterRepellent: true,
});

const setTypes = (updatedTypes: Types) => {
  types.value = updatedTypes;
};
</script>

<template>
  <div class="container">
    <picture class="hero">
      <img src="../../assets/img/hero.jpg" alt="hero" />
    </picture>
    <div class="product">
      <product-filter @change-type="setTypes" />
      <section class="product__main">
        <product-list :types="types" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: block;
  position: relative;
  margin-bottom: var(--section-gap);
}

.hero > img {
  width: 100%;
  height: 200px;
  object-position: 50% 25%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  filter: grayscale(1);
}

.hero:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
}

.product {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--section-gap);
}

.product__main {
  grid-column: span 9;
}

@media (max-width: 1028px) {
  .product__main {
    grid-column: span 12;
  }
}
</style>
