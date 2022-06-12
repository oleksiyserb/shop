import { ref } from "vue";
import { getDocs } from "@firebase/firestore";
import { productCollection } from "@/firebase";
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

  return { getProducts };
};
