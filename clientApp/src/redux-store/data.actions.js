import { stuffService } from "../api/stuff.service";

const findSomeData = (callback) => {
  return (dispatch, getState) => {
    stuffService.findSomeData
      .then((res) => {
        const data = res.data;
        callback();
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
};

export const dataActions = {
  findSomeData,
};
