<template>
  <div class="product__item">
    <base-card>
      <header>
        <h4 />
      </header>
      <picture>
        <img />
      </picture>
      <div class="product__info">
        <ul class="product__rating">
          <li />
        </ul>
        <div class="product__badge">
          <span />
        </div>
        <div class="product__actions">
          <strong />
          <div />
        </div>
      </div>
    </base-card>
  </div>
</template>

<style scoped>
.product__item {
  grid-column: span 4;
  position: relative;
}

@media (max-width: 768px) {
  .product__item {
    grid-column: span 6;
  }
}

header {
  margin-bottom: 1em;
}

header > h4 {
  width: 100%;
  height: 48px;
  animation: pulse-bg 1s infinite;
}

.product__item picture {
  height: 200px;
  width: 100%;
  display: block;
  animation: pulse-bg 1s infinite;
}

.product__rating {
  height: 20px;
  animation: pulse-bg 1s infinite;
}

.product__info > * {
  margin: 0.5em 0;
}

.product__badge {
  height: 36px;
  animation: pulse-bg 1s infinite;
}

.product__actions > strong {
  margin: 0.5em 0;
  height: 18px;
  animation: pulse-bg 1s infinite;
}

.product__actions > div {
  height: 36px;
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
