import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user.slice";

export const rootReducer = combineReducers({
  userState: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["UserSlice/storeUser"],
      },
    }),
  devTools: true,
});

export default store;
