import { userActions } from "./user.slice";
import { userService } from "../api/account.service";

const login = (loginPayload, callback) => {
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

const logout = (logoutPayload) => {
  return (dispatch, getState) => {};
};

const register = (registerPayload) => {
  return (dispatch, getState) => {};
};

export const userCustomActions = {
  login,
  logout,
  register,
};
