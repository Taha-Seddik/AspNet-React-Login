import React, { useState, useEffect } from "react";
import { stuffService } from "../api/stuff.service";
import { userManager } from "../configs/userManager";

export const HomeComponent = () => {
  const [infos, setInfos] = useState();
  useEffect(() => {
    stuffService
      .findSomeData()
      .then((res) => {
        setInfos(res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const handleClick = () => {
    userManager
      .signinSilent()
      .then((re) => {})
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      Hello man {JSON.stringify(infos)}
      <button onClick={handleClick}>SignIn</button>
    </div>
  );
};
