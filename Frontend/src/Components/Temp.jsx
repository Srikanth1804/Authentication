import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Forget from "./Forget";
import Reset from "./Reset";

const Temp = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<Forget />} />
          <Route path="/reset-password/:id/:token" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Temp;
