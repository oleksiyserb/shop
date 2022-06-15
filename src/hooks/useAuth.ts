import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type NextOrObserver,
  type UserCredential,
} from "@firebase/auth";
import { auth } from "@/firebase";
import { onUnmounted } from "vue";
import type User from "@/models/UserModel";

export const useAuth = () => {
  const getUser = (callback: NextOrObserver<User>) => {
    const unsubscribe = onAuthStateChanged(auth, callback);
    onUnmounted(unsubscribe);
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async (): Promise<void> => {
    signOut(auth);
  };

  return { getUser, signIn, signUp, logOut };
};
