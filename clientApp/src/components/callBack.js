import React, { useEffect } from "react";
import { userManager } from "../api/userService";

export const CallbackComponent = () => {
  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <div>CallBack zouta</div>;
};
