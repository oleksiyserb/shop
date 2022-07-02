import type User from "./UserModel";

export default interface CurrentUser extends User {
  isLogin: boolean;
}
