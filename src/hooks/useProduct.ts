import { onBeforeUnmount } from "vue";
import {
  getDocs,
  getDoc,
  query,
  where,
  documentId,
  QuerySnapshot,
  limit,
  orderBy,
  startAfter,
  type DocumentData,
} from "@firebase/firestore";
import { productCollection, productRef } from "@/firebase";
import { useHelpers } from "./useHelpers";
import type Product from "@/models/ProductModel";
import type ProductData from "@/models/ProductDataModel";
import type Items from "@/models/ItemsModel";
import type Types from "@/models/TypesModel";

let errorCode: string;
let latestProduct: DocumentData | null;

export const useProduct = () => {
  onBeforeUnmount(() => {
    latestProduct = null;
  });

  const getProducts = async (
    quantity: number
  ): Promise<Array<Product> | null | void> => {
    let products: Array<Product> | null = null;
    const productQuery = query(
      productCollection,
      orderBy("createdAt"),
      startAfter(latestProduct || 0),
      limit(quantity)
    );

    const queryProducts = await getDocs(productQuery);
    if (queryProducts.empty) {
      return;
    }
    latestProduct = queryProducts.docs[queryProducts.docs.length - 1];

    products = queryProducts.docs.map((product) => {
      return { id: product.id, ...(product.data() as ProductData) };
    });

    return products;
  };

  const getSortedProducts = async (sortedValues: Types) => {
    let products: Array<Product> | null = null;
    const arraySortedValues: Array<string> = [];

    for (const key in sortedValues) {
      if (sortedValues[key as never]) {
        arraySortedValues.push(key);
      }
    }
    const productQuery = query(
      productCollection,
      where("type", "in", arraySortedValues)
    );

    const queryProducts = await getDocs(productQuery);

    if (queryProducts)
      products = queryProducts.docs.map((product) => {
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

  return {
    getProducts,
    getProductsByIds,
    getCurrentProduct,
    getSortedProducts,
  };
};
