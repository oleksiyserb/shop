<template>
  <header>
    <div class="container">
      <nav>
        <h1>SerbShop</h1>
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
</template>

<style scoped>
header {
  background-color: var(--color-header);
}

nav {
  padding: 1em 0;
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
</style>
