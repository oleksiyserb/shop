import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseModal from "./components/ui/BaseModal.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-modal", BaseModal);
app.component("base-badge", BaseBadge);

app.mount("#app");
