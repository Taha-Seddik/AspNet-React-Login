import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as oidcReducer } from "redux-oidc";

export const rootReducer = combineReducers({
  oidc: oidcReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "redux-oidc/USER_FOUND",
          "redux-oidc/SILENT_RENEW_ERROR",
        ],
        ignoredPaths: ["oidc.user"],
      },
    }),
  devTools: true,
});

export default store;
