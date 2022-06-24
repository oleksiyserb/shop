<template>
  <div class="container">
    <div class="cabinet__profile">
      <h1>Welcome {{ userName }}!</h1>
      <p>
        Your id: <strong>{{ userId }}</strong>
      </p>
      <p>
        Your Name: <strong>{{ userName }}</strong>
      </p>
      <p>
        Your Email: <strong>{{ userEmail }}</strong>
      </p>
    </div>
    <div class="cabinet__history-payment">
      <h1>Your history payment:</h1>
      <section class="cabinet__session">
        <h2>{{ new Date().getDay() }}</h2>
        <div>
          <div class="cabinet__product">
            <picture
              ><img
                src="https://images.unsplash.com/photo-1447684808650-354ae64db5b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80"
                alt="labrador"
            /></picture>
            <h1>Title</h1>
            <div class="cabinet__product-count">
              <span>Count</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const { userName, userId, userEmail } = useAuthStore();
</script>

<style scoped>
.cabinet__profile {
  margin-bottom: 2em;
}

.cabinet__profile > * {
  margin: 0.5em 0;
}

.cabinet__profile > h1 {
  font-size: 1.875rem;
}

.cabinet__profile > p {
  font-size: 1.125rem;
}

.cabinet__history-payment > h1 {
  font-size: 1.875rem;
}

.cabinet__session > h2 {
  margin: 1em 0;
}

.cabinet__product {
  display: grid;
  gap: var(--section-gap);
  grid-template-columns: repeat(12, 1fr);
  border: 1px solid var(--color-border-tertiary);
  overflow: hidden;
}

.cabinet__product:first-child {
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}

.cabinet__product:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.cabinet__product > picture > img {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.cabinet__product > picture {
  grid-column: span 1;
}

.cabinet__product > h1 {
  align-self: center;
  grid-column: span 9;
  font-size: 1.125rem;
}

.cabinet__product-count {
  grid-column: span 2;
  position: relative;
  border-left: 1px solid var(--color-border-tertiary);
}

.cabinet__product-count > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
