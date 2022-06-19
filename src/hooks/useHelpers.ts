import type Items from "@/models/ItemsModel";

export const useHelpers = () => {
  const formatedPrice = (price: number) => {
    if (String(price).length > 3) {
      const arrayPrice = String(price).split("").reverse();

      for (let i = 3; arrayPrice.length > i; i += 4) {
        arrayPrice.splice(i, 0, " ");
      }

      return `₴ ${arrayPrice.reverse().join("")}`;
    }

    return `₴ ${price}`;
  };

  const getIdsFromStore = (items: Array<Items>) => {
    const newArray: Array<string> = [];

    for (const key in items) {
      newArray.push(items[key].id);
    }

    return newArray;
  };

  const getShort = (text: string, stringQuantity: number): string => {
    if (text.length < stringQuantity) {
      return text;
    }
    return text.slice(0, stringQuantity) + "...";
  };

  return { getIdsFromStore, formatedPrice, getShort };
};
