import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { HomeComponent } from "../components/home";
import LoginComponent from "../components/login";
import { RegisterComponent } from "../components/register";

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
      </Routes>
    </Router>
  );
};
