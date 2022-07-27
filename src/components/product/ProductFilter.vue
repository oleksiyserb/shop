<script setup lang="ts">
import { ref } from "@vue/reactivity";
import type Types from "@/models/TypesModel";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
  (e: "change-type", updatedTypes: Types): void;
}>();

const types = ref<Types>({
  canvas: true,
  sport: true,
  waterRepellent: true,
});

const { t } = useI18n();

const typeChanged = (e: any) => {
  const inputId = e.target.id;
  const isActive = e.target.checked;

  const updatedTypes = {
    ...types.value,
    [inputId]: isActive,
  };
  types.value = updatedTypes;
  emit("change-type", updatedTypes);
};
</script>

<template>
  <aside class="product__filters">
    <base-card>
      <header>
        <h1>{{ t("filter.title") }}:</h1>
      </header>
      <div class="product__actions">
        <div class="product__actions-item">
          <h3>{{ t("filter.types") }}:</h3>
          <ul class="product__type">
            <li>
              <input
                id="canvas"
                type="checkbox"
                checked
                @change="typeChanged"
              />
              <label for="canvas">{{ t("filter.canvas") }}</label>
            </li>
            <li>
              <input id="sport" type="checkbox" checked @change="typeChanged" />
              <label for="sport">{{ t("filter.sport") }}</label>
            </li>
            <li>
              <input
                id="waterRepellent"
                type="checkbox"
                checked
                @change="typeChanged"
              />
              <label for="waterRepellent">{{
                t("filter.waterRepellent")
              }}</label>
            </li>
          </ul>
        </div>
      </div>
    </base-card>
  </aside>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--color-border);
}

header > h1 {
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
}

.product__filters {
  grid-column: span 3;
}

@media (max-width: 1028px) {
  .product__filters {
    grid-column: span 12;
  }
}

.product__actions-item {
  margin-top: 0.5em;
}

.product__actions-item > h3 {
  font-weight: 600;
  margin-bottom: 0.3125rem;
}

.product__actions-item input {
  margin-right: 0.3125em;
}

.product__actions * {
  color: var(--color-text-secondary);
}

.product__type > li {
  margin-left: 0.5em;
}

.product__radios {
  display: flex;
}

.product__radios > li {
  margin: 0 0.5em;
}

label {
  margin-bottom: 0.3125em;
}
</style>
