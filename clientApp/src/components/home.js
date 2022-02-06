import React, { useState, useEffect } from "react";
import { stuffService } from "../api/stuff.service";

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
  return <div>Hello man {JSON.stringify(infos)}</div>;
};
