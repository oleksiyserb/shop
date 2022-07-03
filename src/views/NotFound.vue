<template>
  <div class="not-found">
    <h1>{{ t("notFound.ops") }}</h1>
    <h2>{{ t("notFound.error") }}</h2>
    <base-button :to="{ name: 'main' }" link>{{
      t("notFound.message")
    }}</base-button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.not-found > * {
  margin: 1rem 0;
}

h1 {
  font-size: 4rem;
  font-weight: 800;
}

h2 {
  font-size: 4rem;
  font-weight: 600;
}

a {
  font-size: 1.125rem;
}
</style>
