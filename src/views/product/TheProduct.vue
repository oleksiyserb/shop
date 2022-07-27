<script setup lang="ts">
import StarIcon from "@/components/icons/StarIcon.vue";
import { ref } from "vue";
import useProduct from "@/hooks/useProduct";
import type ProductData from "@/models/product/ProductDataModel";
import { useRouter } from "vue-router";
import useCartStore from "@/stores/cart";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  id: string;
}>();
const product = ref<ProductData | null>(null);
const { getCurrentProduct } = useProduct();
const { replace } = useRouter();
const cartStore = useCartStore();
const { t } = useI18n();

(async () => {
  product.value = await getCurrentProduct(props.id);
  if (Object.keys(product.value).length === 0) replace({ name: "404" });
})();

const getRating = (i: number, rating: number): boolean => {
  return rating - i >= 0;
};

const addToCart = () => {
  if (product.value) cartStore.addToCart(props.id, product.value.price);
};
</script>

<template>
  <section class="product">
    <div class="container">
      <base-card v-if="product && Object.keys(product).length !== 0">
        <div class="product__grid">
          <picture>
            <img :src="product.picture" alt="picture" />
          </picture>
          <div class="product__details">
            <header>
              <h1>{{ product.title }}</h1>
              <ul>
                <li v-for="i in 5" :key="i">
                  <star-icon :selected="getRating(i, product.rating)" />
                </li>
              </ul>
            </header>
            <div class="product__content">
              <p>{{ product.description }}</p>
              <ul class="product__badge">
                <base-badge :type="product.type" />
              </ul>
            </div>
            <footer class="product__actions">
              <base-button @click="addToCart">{{
                t("action.addToCart")
              }}</base-button>
            </footer>
          </div>
        </div>
      </base-card>
    </div>
  </section>
</template>

<style scoped>
.product .card {
  padding: 1.5em;
}

.product__grid {
  display: grid;
  gap: var(--section-gap);
  grid-template-columns: repeat(12, 1fr);
}

picture {
  grid-column: span 4;
}

@media (max-width: 425px) {
  picture {
    grid-column: span 12;
  }
}

picture > img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
}

.product__details {
  grid-column: span 8;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

@media (max-width: 425px) {
  .product__details {
    grid-column: span 12;
  }
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header > h1 {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-text-secondary);
}

header > ul {
  display: flex;
}

.product__content {
  margin: 1em 0;
}

.product__content > p {
  font-size: 1.125rem;
  line-height: 1.2;
  color: var(--color-text-secondary);
}

.product__badge {
  margin: 1em 0;
}
</style>
