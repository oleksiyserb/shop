import type Cart from "@/models/cart/CartModel";
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
    addToCart(id: string, price: number): void {
      const cartItemIndex = this.items.findIndex((item) => {
        return item.id === id;
      });

      if (cartItemIndex >= 0) {
        this.items[cartItemIndex].count++;
      } else {
        this.items.push({ id, count: 1, price });
      }

      this.quantity++;
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: this.items, quantity: this.quantity })
      );
    },
    initializeCart() {
      const storage = JSON.parse(localStorage.getItem("cart") as string);

      if (storage) {
        this.items = [...storage.items];
        this.quantity = storage.quantity;
      }
    },
    handleDelete(id: string) {
      const countItems = this.items.find((item) => item.id === id)?.count;
      if (countItems) this.quantity = this.quantity - countItems;

      this.items = this.items.filter((item) => item.id !== id);
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: this.items, quantity: this.quantity })
      );
    },
    increment(index: number) {
      this.items[index].count++;
      this.quantity++;
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: this.items, quantity: this.quantity })
      );
    },
    decrement(index: number) {
      this.items[index].count--;
      this.quantity--;
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: this.items, quantity: this.quantity })
      );
    },
  },
});
