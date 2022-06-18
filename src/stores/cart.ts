import type Cart from "@/models/CartModel";
import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () =>
    ({
      items: [],
      quantity: 0,
    } as Cart),
  getters: {
    countItems(state): number {
      return state.quantity;
    },
  },
  actions: {
    addToCart(id: string): void {
      const cartItemIndex = this.items.findIndex((item) => {
        return item.id === id;
      });

      if (cartItemIndex >= 0) {
        this.items[cartItemIndex].quantity++;
      } else {
        this.items.push({ id, quantity: 1 });
      }

      this.quantity++;
    },
  },
});
