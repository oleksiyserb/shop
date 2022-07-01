import { orderCollection } from "@/firebase";
import type Order from "@/models/OrderModel";
import { addDoc } from "@firebase/firestore";

export const useOrders = () => {
  const createOrder = async (order: Order) => {
    await addDoc(orderCollection, order);
  };

  return { createOrder };
};
