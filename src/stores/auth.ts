import { useAuth } from "@/hooks/useAuth";
import type Auth from "@/models/AuthModel";
import type CurrentUser from "@/models/CurrentUserModel";
import type User from "@/models/UserModel";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () =>
    ({
      displayName: null,
      uid: null,
      email: null,
      isLogin: false,
    } as CurrentUser),
  getters: {
    userName: (state) => state.displayName,
    userId: (state) => state.uid,
    userEmail: (state) => state.email,
  },
  actions: {
    async signUp(fields: Auth): Promise<void> {
      const { signUp } = useAuth();

      try {
        const userCredentials = await signUp(
          fields.name,
          fields.surname,
          fields.email,
          fields.password
        );
        if (userCredentials) this.autoAuth(userCredentials);
      } catch (err) {
        if (err instanceof Error) {
          const error = new Error(err.message || "Something went wrong");
          throw error;
        }
      }
    },
    async signIn(user: { email: string; password: string }): Promise<void> {
      const { signIn } = useAuth();

      try {
        const userCredentials = await signIn(user.email, user.password);
        if (userCredentials) this.autoAuth(userCredentials.user);
      } catch (err) {
        if (err instanceof Error) {
          const error = new Error(err.message || "Something went wrong");
          throw error;
        }
      }
    },
    async autoAuth(user: User) {
      if (
        user.email !== null &&
        user.uid !== null &&
        user.displayName !== null
      ) {
        this.$patch({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          isLogin: true,
        });
      }
    },
    async signOut() {
      const { logOut } = useAuth();

      logOut();
      this.$reset();
    },
  },
});
