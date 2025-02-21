import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_ENDPOINT from "./General";

const Login = () => {
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [errorMessage, setErrorMessage] = useState(""); // State for error message
  let Navigate = useNavigate();
  let Handlesubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    let Data = { email, password };

    Axios.post(`${API_ENDPOINT}/api/login`, Data, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.status === false) {
          setErrorMessage(res.data.msg); // Show error message
          return; // Stop execution, don't navigate
        }

        localStorage.setItem("auth-token", res.data.info);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);

        Navigate("/home", { replace: true });
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage("Something went wrong!"); // Handle unexpected errors
      });

    setemail("");
    setpassword("");
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{ backgroundColor: "#f8f9fa", maxWidth: "500px" }}
    >
      <h2 className="mb-4 text-center text-dark">Login Form</h2>

      {errorMessage && (
        <div
          className="alert alert-danger text-center"
          style={{ fontSize: "14px" }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={Handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
            required
            value={email}
            style={{
              borderColor: "#007bff",
              boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
            required
            value={password}
            style={{
              borderColor: "#007bff",
              boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            padding: "10px",
          }}
        >
          Login
        </button>

        <div className="text-center mt-3">
          <p style={{ fontSize: "14px", color: "#555" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="fw-bold"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>
            <Link
              to="/forgot-password"
              className="fw-bold"
              style={{ color: "#dc3545", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
