<template>
  <div class="product__item">
    <base-card>
      <!-- <a href="/collar">Test</a> -->
      <header>
        <h4>Product</h4>
        <ul class="product__rating">
          <li v-for="i in 5" :key="i"><star-icon /></li>
        </ul>
      </header>
      <picture>
        <img src="../../assets/img/collar-1.jpg" alt="collar" />
      </picture>
      <div class="product__info">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <!-- TODO: Якщо продукт закінчується <span>The product is running out</span> -->
        <div class="product__actions">
          <strong>₴2 000</strong>
          <base-button>Add To Cart</base-button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import StarIcon from "../icons/StarIcon.vue";
</script>

<style scoped>
.product__item {
  grid-column: span 4;
}

@media (max-width: 768px) {
  .product__item {
    grid-column: span 6;
  }
}

@media (max-width: 425px) {
  .product__item {
    grid-column: span 12;
  }

  .product__item picture > img {
    height: 200px;
    object-fit: cover;
    object-position: top;
  }
}

header {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
}

header > h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

picture {
  display: block;
}

picture > img {
  display: block;
  width: 100%;
}

.product__info > *:not(button) {
  margin: 0.5rem 0;
  color: var(--color-text-secondary);
}

.product__rating {
  display: flex;
  border-radius: 12px;
}

.product__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product__actions > strong {
  font-size: 1.125rem;
}
</style>
