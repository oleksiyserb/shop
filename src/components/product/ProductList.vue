<template>
  <div class="wrapper" v-if="!errorMessage">
    <template v-if="!isLoading">
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
    </template>
    <template v-else>
      <product-item-skeleton v-for="i in 6" :key="i" />
    </template>
  </div>
  <strong v-else>{{ errorMessage }}</strong>
</template>

<script setup lang="ts">
import ProductItem from "./ProductItem.vue";
import { useProduct } from "@/hooks/useProduct";
import type Types from "@/models/TypesModel";
import { onBeforeMount, ref, toRefs, watch } from "vue";
import type Product from "@/models/ProductModel";
import ProductItemSkeleton from "./ProductItemSkeleton.vue";

const products = ref<Array<Product> | null | void>(null);
const errorMessage = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const { getProducts } = useProduct();

onBeforeMount(async () => {
  isLoading.value = true;
  products.value = await getProducts();
  isLoading.value = false;
});

const props = defineProps<{
  types: Types;
}>();
const { types } = toRefs(props);

watch(types, async (values) => {
  try {
    errorMessage.value = null;
    products.value = await getProducts(values);
  } catch (err) {
    errorMessage.value = "Products is empty. Please select type.";
  }
});
</script>
