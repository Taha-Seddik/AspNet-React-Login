import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { processSilentRenew } from "redux-oidc";

if (window.location.pathname === "/silent_renew") {
  console.log("🌞 doing silent renew 🌞");
  processSilentRenew();
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
