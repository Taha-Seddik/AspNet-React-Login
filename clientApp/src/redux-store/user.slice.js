import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoadingUser: false,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.isLoadingUser = false;
      debugger;
      state.user = action.payload;
    },
    storeUserError: (state, action) => {
      state.isLoadingUser = false;
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
