<template>
  <div class="order__checkout">
    <order-contacts />
    <order-delivery />
    <order-list />
  </div>
</template>

<script setup lang="ts">
import OrderContacts from "./OrderContacts.vue";
import OrderDelivery from "./OrderDelivery.vue";
import OrderList from "./OrderList.vue";
</script>
