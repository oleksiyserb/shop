import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "@firebase/auth";
import { auth } from "@/firebase";
import { onUnmounted, reactive } from "vue";
import type User from "@/models/UserModel";

export const useAuth = () => {
  const user: User = reactive({
    email: null,
    uid: null,
  });
  const unsubscribe = onAuthStateChanged(auth, (_user) => {
    if (_user) {
      user.email = _user.email;
      user.uid = _user.uid;
    }
  });
  onUnmounted(unsubscribe);

  const signIn = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async (): Promise<void> => {
    await signOut(auth);
  };

  return { user, signIn, signUp, logOut };
};
