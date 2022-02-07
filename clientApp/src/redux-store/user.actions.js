import { userActions } from "./user.slice";
import { userService } from "../api/account.service";

const storeUser = (logoutPayload) => {
  return (dispatch, getState) => {};
};

const storeUserError = (loginPayload, callback) => {
  return (dispatch, getState) => {
    userService
      .login(loginPayload)
      .then((res) => {
        const data = res.data;
        callback();
        dispatch(userActions.login(data));
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
};

export const userCustomActions = {
  storeUser,
  storeUserError,
};
