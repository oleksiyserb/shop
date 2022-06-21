<template>
  <div class="wrapper">
    <product-item
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :title="product.title"
      :rating="product.rating"
      :price="product.price"
      :picture="product.picture"
      :count="product.count"
      :type="product.type"
    />
  </div>
  <div class="update-button">
    <base-button @click="loadMoreProducts">Load More Products</base-button>
  </div>
</template>

<script setup lang="ts">
import ProductItem from "./ProductItem.vue";
import { useProduct } from "@/hooks/useProduct";

const { getProducts } = useProduct();

const products = await getProducts(6);

const loadMoreProducts = async () => {
  const loadProducts = await getProducts(3);
  if (products && loadProducts) products.value!.push(...loadProducts!.value!);
};
</script>

<style scoped>
.update-button {
  position: relative;
  text-align: center;
  margin-top: 2em;
}

.update-button::before,
.update-button::after {
  content: "";
  height: 1px;
  width: 30%;
  position: absolute;
  background-color: var(--color-border-secondary);
}

.update-button::before {
  left: 0;
  top: 50%;
}

.update-button::after {
  right: 0;
  top: 50%;
}
</style>
