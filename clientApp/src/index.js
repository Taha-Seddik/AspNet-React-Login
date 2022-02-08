import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

if (window.location.pathname === "/silent_renew") {
  console.log("🌞 doing silent renew 🌞");
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
