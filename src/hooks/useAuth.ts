import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "@/firebase";
import { onUnmounted, reactive, ref } from "vue";
import type User from "@/models/UserModel";

export const useAuth = () => {
  const isLogin = ref<boolean>(false);
  const user: User = reactive({
    email: null,
    uid: null,
  });
  const unsubscribe = onAuthStateChanged(auth, (_user) => {
    if (_user) {
      user.email = _user.email;
      user.uid = _user.uid;
      isLogin.value = true;
    }
  });
  onUnmounted(unsubscribe);

  const signIn = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async (): Promise<void> => {
    await signOut(auth);
  };

  return { user, signIn, signUp, logOut };
};
