import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../redux-store/user.slice";
import { setAuthHeader } from "./axiosHeaders";

export default function AuthProvider({ userManager: manager, children }) {
  const dispatch = useDispatch();
  let userManager = useRef();

  useEffect(() => {
    userManager.current = manager;

    const onUserLoaded = (user) => {
      console.log(`user loaded: ${user}`);
      dispatch(userActions.storeUser(user));
    };

    const onUserUnloaded = () => {
      setAuthHeader(null);
      console.log(`user unloaded`);
    };

    const onAccessTokenExpiring = () => {
      console.log(`user token expiring`);
    };

    const onAccessTokenExpired = () => {
      console.log(`user token expired`);
    };

    const onUserSignedOut = () => {
      console.log(`user signed out`);
    };

    // events for user
    userManager.current.events.addUserLoaded(onUserLoaded);
    userManager.current.events.addUserUnloaded(onUserUnloaded);
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring);
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.current.events.addUserSignedOut(onUserSignedOut);

    // Specify how to clean up after this effect:
    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(
        onAccessTokenExpiring
      );
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired);
      userManager.current.events.removeUserSignedOut(onUserSignedOut);
    };
  }, [dispatch, manager]);

  return React.Children.only(children);
}
