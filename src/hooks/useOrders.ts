import { orderCollection } from "@/firebase";
import type Order from "@/models/order/OrderModel";
import { addDoc, getDocs, query, where } from "@firebase/firestore";

export const useOrders = () => {
  const createOrder = async (order: Order) => {
    await addDoc(orderCollection, order);
  };

  const getOrdersByUserId = async (id: string) => {
    const orderQuery = query(orderCollection, where("userId", "==", id));
    const rawOrders = await getDocs(orderQuery);

    const orders = rawOrders.docs.map((order) => {
      return { id: order.id, ...(order.data() as Order) };
    });

    return orders;
  };

  return { createOrder, getOrdersByUserId };
};
