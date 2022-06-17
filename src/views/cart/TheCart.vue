<template>
  <section class="cart">
    <div class="container">
      <base-card>
        <header class="cart__header">
          <h1>Count Cart Items():</h1>
        </header>
        <div class="cart__items">
          <cart-item />
          <cart-item />
        </div>
        <div class="cart__actions">
          <base-button>Buy Products</base-button>
          <span>Total Price: <strong>$ 4000</strong></span>
        </div>
      </base-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import CartItem from "@/components/cart/CartItem.vue";
</script>

<style scoped>
.cart * {
  color: var(--color-text-secondary);
}

.cart__header > h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.cart__items {
  margin: 1em 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  height: 490px;
  overflow: auto;
}

.cart__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart__actions > * {
  margin: 0.5em;
}

.cart__actions > button {
  color: var(--color-text);
}
</style>
