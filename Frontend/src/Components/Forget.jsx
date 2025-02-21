import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINT from "./General";

const Forget = () => {
  let [email, setEmail] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(`${API_ENDPOINT}/api/forgot-password`, { email })
      .then((res) => {
        if (res.data.status) {
          toast.success("📩 Reset link sent to your email!", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.error("⚠️ " + res.data.msg, { position: "top-center" });
        }
      })
      .catch(() => {
        toast.error("❌ Something went wrong!", { position: "top-center" });
      });

    setEmail("");
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "25px",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <ToastContainer />
      <h2 className="mb-4 text-center" style={{ color: "#343a40" }}>
        Forget Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              borderColor: "#007bff",
              boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ fontWeight: "bold" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forget;
