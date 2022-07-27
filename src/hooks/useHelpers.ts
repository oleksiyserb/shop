import type Items from "@/models/cart/ItemsModel";

const useHelpers = () => {
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

  const getDate = (): string => {
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    let currentMonth: string | number = todayDate.getMonth() + 1;
    let currentDay: string | number = todayDate.getDay();

    if (currentMonth.toString().length < 2) currentMonth = `0${currentMonth}`;
    if (currentDay.toString().length < 2) currentDay = `0${currentDay}`;

    return `${currentDay}.${currentMonth}.${currentYear}`;
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

  return { getIdsFromStore, formatedPrice, getShort, getDate };
};

export default useHelpers;
