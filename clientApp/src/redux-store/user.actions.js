import { userService } from "../api/account.service";
import { storeUser } from "../api/userService";

const login = (loginPayload, callback) => {
  return (dispatch, getState) => {
    userService
      .login(loginPayload)
      .then(async (res) => {
        const data = res.data;
        await storeUser();
        callback();
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
