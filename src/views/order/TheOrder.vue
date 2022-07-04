<template>
  <div class="container" v-if="!success">
    <h1 class="order-heading">{{ t("order.title") }}</h1>
    <form @submit.prevent="submitForm" class="order__wrapper">
      <order-checkout />
      <order-aside :totalPrice="totalPrice" />
    </form>
  </div>
  <div v-else class="success">
    <div class="container">
      <h1 class="success__title">{{ t("order.success.title") }}</h1>
      <h2 class="success__message">{{ t("order.success.subtitle") }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderCheckout from "@/components/order/OrderCheckout.vue";
import OrderAside from "@/components/order/OrderAside.vue";
import { onBeforeMount, ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { useHelpers } from "@/hooks/useHelpers";
import { array, object, string } from "yup";
import { useForm } from "vee-validate";
import { useOrders } from "@/hooks/useOrders";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const schema = object({
  name: string().required().min(2),
  surname: string().required().min(2),
  lastName: string().required().min(2),
  phoneNumber: string().required().min(10).max(10),
  email: string().required().email(),
  state: string().required(),
  products: array().required(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const cart = useCartStore();
const auth = useAuthStore();
const router = useRouter();
const { createOrder } = useOrders();
const { formatedPrice, getDate } = useHelpers();
const { t } = useI18n();

const success = ref<boolean>(false);

onBeforeMount(async () => {
  if (cart.countItems <= 0) {
    router.replace({ name: "main" });
  }
});

const totalPrice = computed(() => {
  let price = 0;
  cart.items.forEach((item) => {
    price += item.count * item.price;
  });

  return formatedPrice(price);
});

const submitForm = handleSubmit(async (values) => {
  let selectedItems;

  if (values.products)
    selectedItems = values.products.map((product) => {
      const item = cart.items.find((item) => item.id === product.id);

      return {
        id: product.id,
        picture: product.picture,
        title: product.title,
        price: product.price,
        count: item?.count,
      };
    });

  const newOrder = {
    userId: auth.userId,
    name: values.name,
    surname: values.surname,
    lastName: values.lastName,
    phoneNumber: values.phoneNumber,
    email: values.email,
    state: `${values.state} обл.`,
    createdAt: getDate(),
    items: selectedItems,
  };

  await createOrder(newOrder);
  cart.$reset();
  localStorage.removeItem("cartItems");
  localStorage.removeItem("cart");
  success.value = true;

  setTimeout(() => {
    router.replace({ name: "cabinet" });
  }, 3000);
});
</script>

<style scoped>
.order-heading {
  font-size: 2rem;
  text-decoration: underline;
  text-underline-offset: 4px;
  margin-bottom: 1em;
}

@media (max-width: 425px) {
  .order-heading {
    font-size: 1.875rem;
  }
}

.order__checkout > section {
  margin: 1em 0;
}

.order__wrapper {
  display: grid;
  gap: var(--section-gap);
  grid-template-columns: repeat(12, 1fr);
}

.order__wrapper > div {
  grid-column: span 8;
}

.order__wrapper > aside {
  grid-column: span 4;
}

@media (max-width: 768px) {
  .order__wrapper > div {
    grid-column: span 12;
  }

  .order__wrapper > aside {
    grid-column: span 12;
  }
}

.success {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.success > .container > * {
  margin: 1rem 0;
}

.success__title {
  text-align: center;
  font-size: 4rem;
  font-weight: 800;
}

.success__message {
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .success__title {
    font-size: 2rem;
  }

  .success__message {
    font-size: 1.5rem;
  }
}
</style>
