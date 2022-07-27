<script setup lang="ts">
import OrderBody from "./OrderBody.vue";
import OrderHeader from "./OrderHeader.vue";
import OrderItem from "./OrderItem.vue";
import { useI18n } from "vue-i18n";
import useCartStore from "@/stores/cart";
import { onBeforeMount, ref } from "vue";
import useProduct from "@/hooks/useProduct";
import type Product from "@/models/product/ProductModel";
import { useField, type FieldContext } from "vee-validate";

const { t } = useI18n();
const cart = useCartStore();
const { getProductsByIds } = useProduct();

const isLoading = ref<boolean>(false);
const { value: products }: FieldContext<Array<Product> | null> =
  useField("products");

const getCurrentProductCount = (id: string) => {
  const product = cart.items.find((item) => item.id === id);
  return product?.count ? product.count : 0;
};

onBeforeMount(async () => {
  isLoading.value = true;
  products.value = await getProductsByIds(cart.items);
  isLoading.value = false;
});
</script>

<template>
  <section class="order-product">
    <order-header rank="3" :title="t('order.products')" />
    <order-body>
      <base-card v-if="!isLoading">
        <order-item
          v-for="product in products"
          :key="product.id"
          :picture="product.picture"
          :title="product.title"
          :price="product.price"
          :count="getCurrentProductCount(product.id)"
        />
      </base-card>
      <base-spinner v-else width="200px" height="200px" fill="#e15b64" />
    </order-body>
  </section>
</template>
