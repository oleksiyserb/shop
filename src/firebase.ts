// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEBEylFVDY3ytLa90jm7AxdN_dSXpyD0c",
  authDomain: "dog-shop-942ee.firebaseapp.com",
  projectId: "dog-shop-942ee",
  storageBucket: "dog-shop-942ee.appspot.com",
  messagingSenderId: "1069768963240",
  appId: "1:1069768963240:web:45ee802cada93d43fcbe9d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const productCollection = collection(db, "products");
