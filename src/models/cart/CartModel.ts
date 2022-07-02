import type Items from "@/models/cart/ItemsModel";

export default interface Cart {
  quantity: number;
  items: Array<Items>;
}
