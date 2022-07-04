<template>
  <section class="order-delivery">
    <order-header rank="2" :title="t('order.delivery.title')" />
    <order-body>
      <div class="form-control order-delivery__select">
        <h2>{{ t("order.delivery.state") }}</h2>
        <base-select v-model:value="state" :items="states" />
        <p v-if="stateError">{{ stateError }}</p>
      </div>
    </order-body>
  </section>
</template>

<script setup lang="ts">
import OrderBody from "./OrderBody.vue";
import OrderHeader from "./OrderHeader.vue";
import axios, { type AxiosResponse } from "axios";
import { useField } from "vee-validate";
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";
import type State from "@/models/api/StateModel";

interface DataState {
  data: Array<State>;
}

const { t } = useI18n();

const { value: state, errorMessage: stateError } = useField("state");
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
.order-delivery__select {
  margin: 1em 0;
}

.order-delivery__select > h2 {
  font-size: 1.125rem;
  margin-bottom: 0.5em;
}

.form-control > p {
  margin-top: 0.2em;
  color: var(--color-text-warn);
}
</style>
