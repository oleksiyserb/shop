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
            <template v-if="user">
              <li>
                <router-link class="link" :to="{ name: 'cabinet' }"
                  >Cabinet</router-link
                >
              </li>
              <li>
                <base-button @click="logOut">Sign Out</base-button>
              </li>
            </template>
            <li v-else>
              <base-button :to="{ name: 'register' }" link>Sign Up</base-button>
            </li>
            <li>
              <base-button>Cart <shoping-cart /></base-button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import ShopingCart from "../icons/ShopingCart.vue";
import { useAuth } from "@/hooks/useAuth";

const { user, logOut } = useAuth();
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
