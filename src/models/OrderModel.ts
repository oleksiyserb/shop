export default interface Order {
  userId: string | null;
  name: string | undefined;
  surname: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  createdAt: number;
  items: Array<Item> | undefined;
}

interface Item {
  id: string;
  count: number | undefined;
}
