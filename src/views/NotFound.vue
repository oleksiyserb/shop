<template>
  <div class="not-found">
    <h1>Ops...</h1>
    <h2>404 - Page Not Found!</h2>
    <base-button :to="{ name: 'main' }" link
      >Maybe you want search some products?</base-button
    >
  </div>
</template>

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
