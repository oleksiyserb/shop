<template>
  <div class="pre--header">
    <header>
      <div class="container">
        <nav>
          <router-link class="header__title" :to="{ name: 'main' }">
            <h1><span>Dog</span>Shop</h1>
          </router-link>
          <ul>
            <li>
              <router-link class="link" :to="{ name: 'main' }"
                >Our Products</router-link
              >
            </li>
            <template v-if="authStore.isLogin">
              <li>
                <router-link class="link" :to="{ name: 'cabinet' }"
                  >Cabinet</router-link
                >
              </li>
              <li>
                <base-button @click="signOut">Sign Out</base-button>
              </li>
            </template>
            <li v-else>
              <base-button :to="{ name: 'register' }" link>Sign Up</base-button>
            </li>
            <li>
              <base-button class="link__cart" :to="{ name: 'cart' }" link>
                <shoping-cart /> <span>Cart</span> ({{ countItems }})
              </base-button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import ShopingCart from "../icons/ShopingCart.vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

const authStore = useAuthStore();
const cartStore = useCartStore();
const { replace } = useRouter();

const countItems = computed(() => cartStore.countItems);

const signOut = () => {
  authStore.signOut();
  replace("/");
};
</script>

<style scoped>
header {
  background-color: var(--color-layout);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
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
  transition: color 0.3s;
}

.header__title:hover > h1 > span {
  color: var(--color-link-active);
}

button {
  display: flex;
}

button > * {
  margin-left: 0.5em;
}
</style>
