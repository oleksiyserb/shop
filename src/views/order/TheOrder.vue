<template>
  <div class="container">
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
                <input type="text" id="surname" />
              </div>
              <div>
                <label for="name">Ім'я</label>
                <input type="text" id="name" />
              </div>
            </div>
            <div class="order-contacts__single">
              <label for="parentName">По батькові</label>
              <input type="text" id="parentName" />
            </div>
            <div class="order-contacts__single">
              <label for="phone">Номер телефону</label>
              <input type="text" id="phone" />
            </div>
            <div class="order-contacts__single">
              <label for="email">Пошта</label>
              <input type="text" id="email" />
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
              <h2>State:</h2>
              <base-select :items="states" />
            </div>
          </div>
        </section>
        <section class="order-product">
          <header class="order-header">
            <span>3</span>
            <p>Товари:</p>
          </header>
          <base-card class="order__body">
            <order-item />
            <order-item />
            <order-item />
          </base-card>
        </section>
      </div>
      <aside class="order-info">
        <base-card>
          <header class="order-info__header">
            <h1>Разом</h1>
          </header>
          <div class="order-info__price">
            <span>1 товар на суму:</span>
            <span>До сплати:</span>
          </div>
          <footer class="order-info__actions">
            <base-button>Оформити замовлення</base-button>
          </footer>
        </base-card>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { type AxiosResponse } from "axios";
import { onBeforeMount, reactive } from "vue";
import type State from "@/models/api/StateModel";
import OrderItem from "../../components/order/OrderItem.vue";

interface DataState {
  data: Array<State>;
}

const states: { [key: string]: string } = reactive({});

onBeforeMount(async () => {
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
</style>
