import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINT from "./General";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("user");

  let navigate = useNavigate();

  let Handlesubmit = (e) => {
    e.preventDefault();

    Axios.post(`${API_ENDPOINT}/api/register`, {
      name,
      email,
      password,
      role,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success("✅ Successfully Registered!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            onClose: () => navigate("/"), // Navigate after toast closes
          });

          // Reset form fields only on success
          setName("");
          setEmail("");
          setPassword("");
          setRole("user");
        } else {
          toast.error("❌ " + res.data.msg, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Registration Failed!", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "25px",
        borderRadius: "8px",
      }}
    >
      <ToastContainer />
      <div
        className="container mt-1"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <h2 className="mb-4" style={{ textAlign: "center", color: "#343a40" }}>
          User Registration Form
        </h2>
        <form onSubmit={Handlesubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Role
            </label>
            <select
              className="form-select"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Register
          </button>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p style={{ fontSize: "14px", color: "#555" }}>
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
