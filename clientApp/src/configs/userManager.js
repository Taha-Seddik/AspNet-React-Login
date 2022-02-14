import { createUserManager } from "redux-oidc";

export const userManager = createUserManager({
  authority: "http://localhost:3000",
  client_id: "coucou_frontend",
  redirect_uri: "http://localhost:3000/callback",
  silent_redirect_uri: "http://localhost:3000/silent_renew",
  response_type: "code",
  scope: "openid profile Nice_Api",
  post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
});
