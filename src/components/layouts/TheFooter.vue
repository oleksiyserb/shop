<template>
  <footer>
    <div class="container">
      <div class="footer__details">
        <h2>{{ t("footer.footer") }}</h2>
        <p>Copyright 2022 &copy;</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
footer {
  background-color: var(--color-layout);
  padding: 1em 0;
}

.footer__details {
  display: flex;
  justify-content: space-between;
}

.footer__details > h2 {
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
