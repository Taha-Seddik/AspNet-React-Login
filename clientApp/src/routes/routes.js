import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { HomeComponent } from "../components/home";
import LoginComponent from "../components/login";
import { RegisterComponent } from "../components/register";
import { CallbackComponent } from "../components/callBack";
import { SilentRenewComponent } from "../components/silentRenew";

export const RoutesWrapper = () => {
  return (
    <Router>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/login" style={{ marginLeft: 5 }}>
          Login
        </Link>
      </div>
      <Routes>
        <Route exact path="/home" element={<HomeComponent />} />
        <Route exact path="/login" element={<LoginComponent />} />
        <Route exact path="/register" element={<RegisterComponent />} />
        <Route exact path="/callback" element={<CallbackComponent />} />
        <Route exact path="/silent_renew" element={<SilentRenewComponent />} />
      </Routes>
    </Router>
  );
};
