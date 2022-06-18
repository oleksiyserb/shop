export default interface Cart {
  quantity: number;
  items: Array<{
    id: string;
    quantity: number;
  }>;
}
