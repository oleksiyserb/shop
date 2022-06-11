<template>
  <aside class="product__filters">
    <base-card>
      <header>
        <h1>Some filters:</h1>
      </header>
      <div class="product__actions">
        <div class="product__actions-item">
          <h3>Types([count]):</h3>
          <ul class="product__type">
            <li>
              <input id="canvas" type="checkbox" />
              <label for="canvas">Canvas</label>
            </li>
            <li>
              <input id="sport" type="checkbox" />
              <label for="sport">Sport</label>
            </li>
            <li>
              <input id="water-repellent" type="checkbox" />
              <label for="water-repellent">Water-repellent</label>
            </li>
          </ul>
        </div>
        <div class="product__actions-item">
          <h3>Sort By Price:</h3>
          <ul class="product__radios">
            <li>
              <input type="radio" id="asc" name="price" value="ASC" checked />
              <label for="asc">ASC</label>
            </li>
            <li>
              <input type="radio" id="desc" name="price" value="DESC" />
              <label for="desc">DESC</label>
            </li>
          </ul>
        </div>
      </div>
    </base-card>
  </aside>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--color-border);
}

header > h1 {
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
}

.product__filters {
  grid-column: span 3;
}

@media (max-width: 1028px) {
  .product__filters {
    grid-column: span 12;
  }
}

.product__actions-item {
  margin-top: 0.5em;
}

.product__actions-item > h3 {
  font-weight: 600;
  margin-bottom: 0.3125rem;
}

.product__actions-item input {
  margin-right: 0.3125em;
}

.product__actions * {
  color: var(--color-text-secondary);
}

.product__type > li {
  margin-left: 0.5em;
}

.product__radios {
  display: flex;
}

.product__radios > li {
  margin: 0 0.5em;
}

label {
  margin-bottom: 0.3125em;
}
</style>
