import React from "react";
import { userManager } from "../config/userManager";
import { CallbackComponent } from "redux-oidc";
import { useNavigate } from "react-router-dom";

export const CallbackZmonkaComponent = () => {
  const navigate = useNavigate();
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={(user) => {
        navigate("/home");
      }}
      errorCallback={(error) => {
        console.error("Login error", error);
      }}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
};
