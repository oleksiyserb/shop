<template>
  <div class="wrapper" v-if="!errorMessage">
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
  <strong v-else>{{ errorMessage }}</strong>
  <div class="update-button">
    <base-button @click="loadMoreProducts">Load More Products</base-button>
  </div>
</template>

<script setup lang="ts">
import ProductItem from "./ProductItem.vue";
import { useProduct } from "@/hooks/useProduct";
import type Types from "@/models/TypesModel";
import { onBeforeMount, ref, toRefs, watch } from "vue";
import type Product from "@/models/ProductModel";

const products = ref<Array<Product> | null | void>(null);
const errorMessage = ref<string | null>(null);
const { getProducts, getSortedProducts } = useProduct();

onBeforeMount(async () => {
  products.value = await getProducts(6);
});

const loadMoreProducts = async () => {
  const loadProducts = await getProducts(3);
  if (loadProducts && products.value) products.value.push(...loadProducts);
};

const props = defineProps<{
  types: Types;
}>();
const { types } = toRefs(props);

watch(types, async (values) => {
  try {
    errorMessage.value = null;
    products.value = await getSortedProducts(values);
  } catch (err) {
    errorMessage.value = "Products is empty. Please select type.";
  }
});
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
