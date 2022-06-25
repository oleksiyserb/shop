import {
  getDocs,
  getDoc,
  query,
  where,
  documentId,
  QuerySnapshot,
  orderBy,
} from "@firebase/firestore";
import { productCollection, productRef } from "@/firebase";
import { useHelpers } from "./useHelpers";
import type Product from "@/models/ProductModel";
import type ProductData from "@/models/ProductDataModel";
import type Items from "@/models/ItemsModel";
import type Types from "@/models/TypesModel";

let errorCode: string;

export const useProduct = () => {
  const getProducts = async (
    sortedValues: Types | null = null
  ): Promise<Array<Product> | null | void> => {
    let products: Array<Product> | null = null;
    let productQuery;

    const arraySortedValues: Array<string> = [];

    for (const key in sortedValues) {
      if (sortedValues[key as never]) {
        arraySortedValues.push(key);
      }
    }

    if (sortedValues) {
      productQuery = query(
        productCollection,
        where("type", "in", arraySortedValues)
      );
    } else {
      productQuery = query(productCollection, orderBy("createdAt"));
    }

    const queryProducts = await getDocs(productQuery);

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
  };
};
