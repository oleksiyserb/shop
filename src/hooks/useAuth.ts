import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type UserCredential,
} from "@firebase/auth";
import { auth } from "@/firebase";
import type User from "@/models/UserModel";
import { checkError } from "./useCheckError";
import { ref } from "@vue/reactivity";

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
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    const userData = ref<User | null>(null);
    const userName = `${name} ${surname}`;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const { uid, email } = userCredentials.user;

        userData.value = {
          uid,
          email,
          displayName: userName,
        };
        await updateProfile(userCredentials.user, {
          displayName: userName,
        }).catch((error) => (errorCode = error.code));
      })
      .catch((error) => {
        errorCode = error.code;
      });

    if (errorCode) {
      const error: Error = new Error(checkError(errorCode));
      throw error;
    }

    return userData.value;
  };

  const logOut = async (): Promise<void> => {
    signOut(auth);
  };

  return { getCurrentUser, signIn, signUp, logOut };
};
