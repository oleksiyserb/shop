<script setup lang="ts">
import ShopingCart from "../icons/ShopingCart.vue";
import useAuthStore from "@/stores/auth";
import useCartStore from "@/stores/cart";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { watch, ref, reactive, type InputHTMLAttributes } from "vue";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();

const burgerToggle = ref<InputHTMLAttributes | null>(null);
const locales = reactive({
  0: "ua",
  1: "en",
});

const countItems = computed(() => cartStore.countItems);

const signOut = () => {
  authStore.signOut();
  router.replace("/");
};

watch(route, () => {
  if (burgerToggle.value) burgerToggle.value.checked = false;
});
</script>

<template>
  <div class="pre--header">
    <header>
      <div class="container">
        <nav>
          <router-link class="header__title" :to="{ name: 'main' }">
            <h1><span>Dog</span>Collars</h1>
          </router-link>
          <div class="burger">
            <input id="menu-toggle" ref="burgerToggle" type="checkbox" />
            <label class="burger__btn" for="menu-toggle">
              <span></span>
            </label>
            <ul class="burger__menubox">
              <li class="burger__heading">
                <router-link class="header__title" :to="{ name: 'main' }">
                  <h1><span>Dog</span>Collars</h1>
                </router-link>
              </li>
              <li>
                <router-link class="link" :to="{ name: 'main' }">{{
                  t("header.ourProducts")
                }}</router-link>
              </li>
              <template v-if="authStore.isLogin">
                <li>
                  <router-link class="link" :to="{ name: 'cabinet' }">{{
                    t("header.cabinet")
                  }}</router-link>
                </li>
                <li>
                  <base-button @click="signOut">{{
                    t("action.signOut")
                  }}</base-button>
                </li>
              </template>
              <li v-else>
                <base-button :to="{ name: 'register' }" link>{{
                  t("action.signUp")
                }}</base-button>
              </li>
              <li>
                <base-button class="link__cart" :to="{ name: 'cart' }" link>
                  <shoping-cart /> <span>{{ t("header.cart") }}</span> ({{
                    countItems
                  }})
                </base-button>
              </li>
              <li>
                <base-select v-model:value="locale" :items="locales" />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
header {
  background-color: var(--color-layout);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

nav {
  padding: 1.25em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-weight: bold;
  font-size: 1.875rem;
}

ul {
  display: flex;
  align-items: center;
}

li {
  margin: 0 0.5em;
}

.link {
  color: var(--color-link);
  text-decoration: none;
  font-size: 1.125rem;
  transition: color 0.3s;
}

.link__cart {
  display: flex;
}

.link__cart > span {
  margin-right: 0.2em;
}

.link:hover {
  color: var(--color-link-hover);
  text-underline-offset: 2px;
  text-decoration: underline;
}

.link.router-link-active {
  text-decoration: underline;
  text-underline-offset: 2px;
  color: var(--color-link-active);
}

.pre--header {
  height: 4.375em;
}

.header__title {
  text-decoration: none;
}

.header__title > h1 > span {
  color: var(--color-link-active);
}

button {
  display: flex;
}

button > * {
  margin-left: 0.5em;
}

.burger > input,
.burger__btn {
  display: none;
}

.burger__heading {
  display: none;
}

@media (max-width: 768px) {
  .burger > input {
    display: inline-block;
  }

  .burger__btn {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 26px;
    height: 26px;
    cursor: pointer;
    z-index: 1;
  }

  .burger__btn > span,
  .burger__btn > span::before,
  .burger__btn > span::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #616161;
    transition-duration: 0.25s;
  }
  .burger__btn > span::before {
    content: "";
    top: -8px;
  }
  .burger__btn > span::after {
    content: "";
    top: 8px;
  }

  .burger__heading {
    display: block;
  }

  .burger__menubox {
    display: block;
    position: fixed;
    visibility: hidden;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 1.5em 0;
    list-style: none;
    background-color: var(--color-layout);
    box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.2);
    transition-duration: 0.25s;
  }

  .burger__menubox li {
    margin: 1rem 0.5rem;
  }

  .burger__menubox > li > a {
    display: inline-block;
  }

  .link__cart > * {
    display: inherit;
  }

  #menu-toggle {
    opacity: 0;
  }

  #menu-toggle:checked ~ .burger__butn > span {
    transform: rotate(45deg);
  }
  #menu-toggle:checked ~ .burger__butn > span::before {
    top: 0;
    transform: rotate(0);
  }
  #menu-toggle:checked ~ .burger__butn > span::after {
    top: 0;
    transform: rotate(90deg);
  }
  #menu-toggle:checked ~ .burger__menubox {
    visibility: visible;
    left: 0;
  }
}
</style>
