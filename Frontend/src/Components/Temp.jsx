import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Forget from "./Forget";
import Reset from "./Reset";
import Getuser from "./Getuser";

const isAuthenticated = () => {
  const token = localStorage.getItem("auth-token");
  console.log("Auth Token:", token); // Debugging
  return token !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

const Temp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/reset-password/:id/:token" element={<Reset />} />
        <Route path="/get" element={<Getuser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Temp;
