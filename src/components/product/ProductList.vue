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
</template>

<script setup lang="ts">
import ProductItem from "./ProductItem.vue";
import { useProduct } from "@/hooks/useProduct";
const { getProducts } = useProduct();

const products = await getProducts();
</script>
