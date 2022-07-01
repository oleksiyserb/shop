export default interface Order {
  userId: string | null;
  name: string | undefined;
  surname: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  createdAt: string;
  items: Array<Item> | undefined;
}

interface Item {
  id: string;
  title: string;
  picture: string;
  price: number;
  count: number | undefined;
}
