import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./locales/i18n-config";

import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
const BaseSpinner = defineAsyncComponent(
  () => import("./components/ui/BaseSpinner.vue")
);
const BaseModal = defineAsyncComponent(
  () => import("./components/ui/BaseModal.vue")
);
const BaseBadge = defineAsyncComponent(
  () => import("./components/ui/BaseBadge.vue")
);
const BaseSelect = defineAsyncComponent(
  () => import("./components/ui/BaseSelect.vue")
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-modal", BaseModal);
app.component("base-badge", BaseBadge);
app.component("base-select", BaseSelect);

app.mount("#app");
