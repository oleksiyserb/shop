<template>
  <div class="product">
    <picture
      ><img
        src="https://images.unsplash.com/photo-1447684808650-354ae64db5b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80"
        alt="labrador"
    /></picture>
    <div>
      <span>Title</span>
      <h1>Lorem ipsum dolor sit.</h1>
    </div>
    <div>
      <span>Price</span>
      <p>234</p>
    </div>
    <div>
      <span>Count</span>
      <p>2</p>
    </div>
    <div>
      <span>Total price</span>
      <p>890</p>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0.5em 0;
}

.product + .product {
  border-top: 1px solid var(--color-border);
}

.product * {
  color: var(--color-text-secondary);
}

.product > div {
  text-align: center;
  flex-grow: 1;
}

.product > div > span {
  font-size: 0.8rem;
  margin-bottom: 0.5em;
  color: var(--color-text-tertiary);
  display: inline-block;
}

.product > picture > img {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.product > h1 {
  font-size: 1.125rem;
}
</style>
