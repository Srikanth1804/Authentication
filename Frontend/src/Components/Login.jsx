import React, { useState } from "react";
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

    Axios.post(`${API_ENDPOINT}/api/login`, Data, { withCredentials: true })
      .then((res) => {
        console.log(res.data.msg);

        if (res.data.status === false) {
          setErrorMessage(res.data.msg); // Show error message
          return; // Stop execution, don't navigate
        }

        // Store user details properly
        localStorage.setItem("auth-token", res.data.info);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);

        console.log("Stored in localStorage:", {
          role: res.data.role,
          name: res.data.name,
        });

        // Navigate after storing data
        Navigate("/home", { replace: true });

        // Reset form fields
        setemail("");
        setpassword("");
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage("Something went wrong!"); // Handle unexpected errors
      });
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
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          Login
        </button>

        <div className="text-center mt-3">
          <p style={{ fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/register" className="fw-bold">
              Sign up
            </Link>
          </p>
          <p style={{ fontSize: "14px" }}>
            <Link to="/forgot-password" className="fw-bold text-danger">
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
