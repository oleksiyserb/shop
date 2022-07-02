import type ProductData from "../product/ProductDataModel";

export default interface Product extends ProductData {
  id: string;
}
