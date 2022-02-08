import { UserManager } from "oidc-client";
import { userActions } from "../redux-store/user.slice";
import store from "../redux-store/store";

const config = {
  authority: "http://localhost:3000",
  client_id: "coucou_frontend",
  redirect_uri: "http://localhost:3000/callback",
  silent_redirect_uri: "http://localhost:3000/silent_renew",
  response_type: "code",
  scope: "openid profile Nice_Api",
  post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
};

const userManager = new UserManager(config);

export const storeUser = async () => {
  try {
    let user = await userManager.getUser();
    if (!user) {
      return store.dispatch(userActions.storeUserError());
    }
    store.dispatch(userActions.storeUser(user));
  } catch (e) {
    console.error(`User not found: ${e}`);
    store.dispatch(userActions.storeUserError());
  }
};

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
}

export default userManager;
