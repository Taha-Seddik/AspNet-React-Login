import React, { useEffect } from "react";
import { signinRedirectCallback } from "../api/userService";

export const CallbackComponent = () => {
  useEffect(() => {
    signinRedirectCallback()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <div>CallBack zouta</div>;
};
