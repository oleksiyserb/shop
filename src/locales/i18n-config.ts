import { createI18n } from "vue-i18n";
import ua from "@/locales/dictionary/ua";
import en from "@/locales/dictionary/en";

const i18n = createI18n({
  locale: "ua", // set locale
  fallbackLocale: "ua", // set fallback locale
  messages: { ua, en }, // set locale messages
});

export default i18n;
