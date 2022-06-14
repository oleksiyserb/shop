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
      this.signIn(userCredentials.user);
    },
    signIn(user: User): void {
      if (user.email !== null && user.uid !== null) {
        this.$patch({
          uid: user.uid,
          email: user.email,
          isLogin: true,
        });
      }
    },
  },
});
