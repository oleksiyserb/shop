import { ref } from "vue";
import {
  getDocs,
  getDoc,
  query,
  where,
  documentId,
  QuerySnapshot,
} from "@firebase/firestore";
import { productCollection, productRef } from "@/firebase";
import { useHelpers } from "./useHelpers";
import type Product from "@/models/ProductModel";
import type ProductData from "@/models/ProductDataModel";
import type Items from "@/models/ItemsModel";

let errorCode: string;

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

  const getProductsByIds = async (
    items: Array<Items>
  ): Promise<Array<Product>> => {
    const { getIdsFromStore } = useHelpers();
    const ids = getIdsFromStore(items);

    const queryProducts = query(
      productCollection,
      where(documentId(), "in", ids)
    );
    const docsData: QuerySnapshot = await getDocs(queryProducts).catch(
      (error) => (errorCode = error.code)
    );

    if (errorCode) {
      const error = new Error(errorCode);
      throw error;
    }

    const products = docsData.docs.map((product) => {
      return { id: product.id, ...(product.data() as ProductData) };
    });

    return products;
  };

  return { getProducts, getProductsByIds, getCurrentProduct };
};
