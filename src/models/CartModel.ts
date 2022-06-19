import type Items from "@/models/ItemsModel";

export default interface Cart {
  quantity: number;
  items: Array<Items>;
}
