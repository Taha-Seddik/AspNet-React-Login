import { userActions } from "./user.slice";
import { userService } from "../api/account.service";

const storeUser = (newUser) => {
  return (dispatch, getState) => {};
};

const storeUserError = () => {
  return (dispatch, getState) => {};
};

export const userCustomActions = {
  storeUser,
  storeUserError,
};
