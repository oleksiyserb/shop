<script setup lang="ts">
import { computed } from "@vue/reactivity";
import useHelpers from "@/hooks/useHelpers";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  picture: string;
  title: string;
  price: number;
  count: number | undefined;
}>();

const { formatedPrice } = useHelpers();
const { t } = useI18n();

const normalizedPrice = computed(() => formatedPrice(props.price));

const totalPrice = computed(() => {
  const price = (props.count || 0) * props.price;
  return formatedPrice(price);
});
</script>

<template>
  <div class="product">
    <picture><img :src="picture" alt="labrador" /></picture>
    <div>
      <span>{{ t("orderItem.title") }}</span>
      <p>{{ title }}</p>
    </div>
    <div>
      <span>{{ t("orderItem.price") }}</span>
      <p>{{ normalizedPrice }}</p>
    </div>
    <div>
      <span>{{ t("orderItem.count") }}</span>
      <p>{{ count }}</p>
    </div>
    <div>
      <span>{{ t("orderItem.totalPrice") }}</span>
      <p>{{ totalPrice }}</p>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0.5em 0;
}

.product > div > p {
  max-width: 200px;
  margin: 0 auto;
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
