import { useAuth } from "@/hooks/useAuth";
import type Auth from "@/models/AuthModel";
import type CurrentUser from "@/models/CurrentUserModel";
import type User from "@/models/UserModel";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () =>
    ({
      uid: null,
      email: null,
      isLogin: false,
    } as CurrentUser),
  actions: {
    async signUp(fields: Auth): Promise<void> {
      const { signUp } = useAuth();

      const userCredentials = await signUp(fields.email, fields.password);
      this.autoAuth(userCredentials.user);
    },
    async signIn(user: { email: string; password: string }): Promise<void> {
      const { signIn } = useAuth();

      const userCredentials = await signIn(user.email, user.password);
      this.autoAuth(userCredentials.user);
    },
    async autoAuth(user: User) {
      if (user.email !== null && user.uid !== null) {
        this.$patch({
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
