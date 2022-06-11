<template>
  <div class="pre--header">
    <header>
      <div class="container">
        <nav>
          <h1>DogShop</h1>
          <ul>
            <li>
              <router-link class="link" :to="{ name: 'main' }"
                >All Products</router-link
              >
            </li>
            <li>
              <router-link class="link" :to="{ name: 'cabinet' }"
                >Cabinet</router-link
              >
            </li>
            <li>
              <base-button :to="{ name: 'register' }" link>Sign Up</base-button>
            </li>
          </ul>
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
  z-index: 3;
}

nav {
  padding: 1.25em 0;
  box-shadow: black;
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
  margin: 0 1em;
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
</style>
