import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "@firebase/auth";
import { auth } from "@/firebase";
import type User from "@/models/UserModel";
import { checkError } from "./useCheckError";

let errorCode: string | null = null;

export const useAuth = () => {
  const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<void | UserCredential> => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      errorCode = error.code;
    });

    if (errorCode) {
      const error: Error = new Error(checkError(errorCode));
      throw error;
    }

    return userCredentials;
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<void | UserCredential> => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      errorCode = error.code;
    });

    if (errorCode) {
      const error: Error = new Error(checkError(errorCode));
      throw error;
    }

    return userCredentials;
  };

  const logOut = async (): Promise<void> => {
    signOut(auth);
  };

  return { getCurrentUser, signIn, signUp, logOut };
};
