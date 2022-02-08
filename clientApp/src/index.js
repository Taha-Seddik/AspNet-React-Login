import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { storeUser } from "./api/userService";

if (window.location.pathname === "/silent_renew") {
  console.log("🌞 doing silent renew 🌞");
  storeUser();
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
