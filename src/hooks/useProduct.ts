import { reactive, ref, type Ref } from "vue";
import { getDocs, getDoc } from "@firebase/firestore";
import { productCollection, productRef } from "@/firebase";
import type Product from "@/models/ProductModel";
import type ProductData from "@/models/ProductDataModel";

export const useProduct = () => {
  // Get Products From Firestore
  const getProducts = async () => {
    const products = ref<Array<Product> | null>(null);
    const queryProducts = await getDocs(productCollection);

    products.value = queryProducts.docs.map((product) => {
      return { id: product.id, ...(product.data() as ProductData) };
    });

    return products;
  };

  const getCurrentProduct = async (id: string): Promise<ProductData> => {
    const queryProduct = await getDoc(productRef(id));

    const product = {
      ...(queryProduct.data() as ProductData),
    };

    return product;
  };

  return { getProducts, getCurrentProduct };
};
