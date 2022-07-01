<template>
  <div class="container" v-if="!success">
    <h1 class="order-heading">Оформлення замовлення</h1>
    <div class="order__wrapper">
      <div class="order__checkout">
        <section class="order-contacts">
          <header class="order-header">
            <span>1</span>
            <p>Ваші контактні дані:</p>
          </header>
          <div class="order__body order-contacts__body">
            <div class="order-contacts__group">
              <div>
                <label for="surname">Прізвище</label>
                <input type="text" id="surname" v-model.trim="name" />
              </div>
              <div>
                <label for="name">Ім'я</label>
                <input type="text" id="name" v-model.trim="surname" />
              </div>
            </div>
            <div class="order-contacts__single">
              <label for="parentName">По батькові</label>
              <input type="text" id="parentName" v-model.trim="lastName" />
            </div>
            <div class="order-contacts__single">
              <label for="phone">Номер телефону</label>
              <input type="text" id="phone" v-model.number="phoneNumber" />
            </div>
            <div class="order-contacts__single">
              <label for="email">Пошта</label>
              <input type="text" id="email" v-model.trim="email" />
            </div>
          </div>
        </section>
        <section class="order-delivery">
          <header class="order-header">
            <span>2</span>
            <p>Доставка:</p>
          </header>
          <div class="order__body">
            <div class="order-delivery__select">
              <h2>Область:</h2>
              <base-select v-model:value="selectedState" :items="states" />
            </div>
          </div>
        </section>
        <section class="order-product">
          <header class="order-header">
            <span>3</span>
            <p>Товари:</p>
          </header>
          <base-card class="order__body" v-if="!isLoading">
            <order-item
              v-for="product in products"
              :key="product.id"
              :id="product.id"
              :picture="product.picture"
              :title="product.title"
              :price="product.price"
            />
          </base-card>
          <base-spinner v-else width="200px" height="200px" fill="#e15b64" />
        </section>
      </div>
      <aside class="order-info">
        <base-card>
          <header class="order-info__header">
            <h1>Разом</h1>
          </header>
          <div class="order-info__price">
            <span
              >До сплати (x{{ cart.items.length }}):
              <strong>{{ totalPrice }}</strong></span
            >
          </div>
          <footer class="order-info__actions">
            <base-button @click="confirmOrder">Оформити замовлення</base-button>
          </footer>
        </base-card>
      </aside>
    </div>
  </div>
  <div v-else class="success">
    <h1>Дякуємо за замовлення</h1>
    <h2>Очікуйте повідомлення про доставку!</h2>
  </div>
</template>

<script setup lang="ts">
import axios, { type AxiosResponse } from "axios";
import { onBeforeMount, reactive, ref } from "vue";
import type State from "@/models/api/StateModel";
import OrderItem from "../../components/order/OrderItem.vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { useAuth } from "@/hooks/useAuth";
import { useProduct } from "@/hooks/useProduct";
import type Product from "@/models/ProductModel";
import { useHelpers } from "@/hooks/useHelpers";
import { computed } from "@vue/reactivity";

interface DataState {
  data: Array<State>;
}

const states: { [key: string]: string } = reactive({});
const isLoading = ref<boolean>(false);
const products = ref<Array<Product> | null>(null);
const name = ref<string | null>("");
const surname = ref<string>("");
const lastName = ref<string>("");
const phoneNumber = ref<string>("");
const email = ref<string>("");
const selectedState = ref<string | null>(null);
const success = ref<boolean>(false);

const { getCurrentUser } = useAuth();
const { getProductsByIds } = useProduct();
const cart = useCartStore();
const router = useRouter();
const { formatedPrice } = useHelpers();

onBeforeMount(async () => {
  if (cart.countItems <= 0) {
    router.replace({ name: "main" });
  }

  const user = await getCurrentUser();
  if (user && user.displayName && user.email) {
    const array = user.displayName.split(" ");

    name.value = array[0];
    surname.value = array[1];
    email.value = user.email;
  }

  isLoading.value = true;
  products.value = await getProductsByIds(cart.items);
  isLoading.value = false;

  const api: AxiosResponse<DataState> = await axios.post(
    "https://api.novaposhta.ua/v2.0/json/",
    {
      apiKey: "b34d9e0f51cb41b33324500ec38b8789",
      modelName: "Address",
      calledMethod: "getAreas",
    }
  );
  const itemsData = api.data.data;
  itemsData.forEach((item) => {
    states[item.Ref] = item.Description;
  });
});

const totalPrice = computed(() => {
  let price = 0;
  cart.items.forEach((item) => {
    price += item.count * item.price;
  });

  return formatedPrice(price);
});

const confirmOrder = () => {
  const selectedItems = products.value?.map((product) => {
    const item = cart.items.find((item) => item.id === product.id);

    return { id: product.id, count: item?.count };
  });

  const newOrder = {
    name: name.value,
    surname: surname.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    state: selectedState.value,
    items: selectedItems,
  };

  cart.$reset();
  localStorage.removeItem("cartItems");
  localStorage.removeItem("cart");
  success.value = true;

  setTimeout(() => {
    router.replace({ name: "cabinet" });
  }, 3000);
};
</script>

<style scoped>
.order-heading {
  font-size: 2rem;
  text-decoration: underline;
  text-underline-offset: 4px;
  margin-bottom: 1em;
}

.order__checkout > section {
  margin: 1em 0;
}

.order-header {
  display: flex;
  align-items: center;
}

.order-header > span {
  margin-right: 0.5em;
  padding: 0.3rem 0.5rem;
  background-color: var(--color-layout-secondary);
  font-weight: bold;
  border-radius: 50%;
}

.order-header > p {
  font-size: 1.5rem;
}

.order__body {
  margin: 0.5em 0 0 2em;
}

.order-contacts__single {
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
  flex-direction: column;
}

.order-contacts__body label {
  margin-bottom: 0.2em;
}

.order-contacts__body input {
  padding: 0.4em 0.5em;
  border-radius: 12px;
  border: none;
}

.order-contacts__group {
  flex-direction: row;
  display: flex;
  margin: 0.5em -0.5em 0;
  justify-content: space-between;
}

.order-contacts__group > div {
  display: flex;
  margin: 0 0.5em;
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;
}

.order-delivery__select {
  margin: 1em 0;
}

.order-delivery__select > h2 {
  font-size: 1.125rem;
  margin-bottom: 0.5em;
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

.order-info__header {
  border-bottom: 1px solid var(--color-border);
}

.order-info__header > h1 {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.order-info__actions {
  border-top: 1px solid var(--color-border);
}

.order-info__actions > button {
  margin-top: 0.5em;
}

.order-info__items {
  max-height: 200px;
  overflow: auto;
}

.order-info__price {
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
}

.order-info__price > span {
  margin: 0.5em 0;
}

.order-info__actions > button {
  width: 100%;
}

.success {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.success > * {
  margin: 1rem 0;
}

.success > h1 {
  font-size: 4rem;
  font-weight: 800;
}

.success > h2 {
  font-size: 4rem;
  font-weight: 600;
}
</style>
