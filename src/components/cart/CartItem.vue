<template>
  <div class="cart__item">
    <picture>
      <img
        src="https://images.unsplash.com/photo-1534719521254-e98a61a0a037?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="collar"
      />
    </picture>
    <div class="cart__item-content">
      <h1>Title and title</h1>
      <p>
        Ullamcorper malesuada proin libero nunc consequat interdum. Quam nulla
        porttitor massa id. Aliquam malesuada bibendum arcu vitae elementum
        curabitur vitae nunc sed. Rhoncus urna neque viverra justo nec ultrices.
        Arcu dictum varius duis at. Consectetur adipiscing elit pellentesque
        habitant. Quam nulla porttitor massa id neque aliquam vestibulum morbi.
        Aliquam ultrices sagittis orci a scelerisque purus semper. Nunc vel
        risus commodo viverra maecenas accumsan lacus vel facilisis. Massa eget
        egestas purus viverra accumsan in nisl.
      </p>
      <div class="cart__item-details">
        <div class="cart__item-count">
          <button>-</button>
          <span>0</span>
          <button>+</button>
        </div>
        <strong>$ 2000</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart__item {
  margin: var(--section-gap) 0;
  display: flex;
}

picture > img {
  height: 220px;
  width: 200px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

.cart__item-content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0 var(--section-gap);
}

.cart__item-content > h1 {
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.cart__item-content > p {
  line-height: 1.2;
}

.cart__item-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart__item-count > * {
  margin: 0 0.5em;
}

.cart__item-count > button {
  background-color: transparent;
  border: none;
  transition: color 0.3s;
}

.cart__item-count > button:hover {
  color: var(--color-link-hover);
}

.cart__item-count > span {
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  padding: 0 0.5em;
}
</style>
