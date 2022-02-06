import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      const loginData = action.payload;
      state.user = loginData;
    },
    register: (state, action) => {},
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
