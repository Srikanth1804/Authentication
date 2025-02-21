import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINT from "./General";

const Reset = () => {
  let [password, setPassword] = useState("");
  let { id, token } = useParams();
  let Navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(`${API_ENDPOINT}/api/reset-password/${id}/${token}`, {
      password,
    })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.status) {
          toast.success("Password Updated Successfully!", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            Navigate("/");
          }, 3500);
        } else {
          toast.error(res.data.msg || "Failed to update password!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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
      <div
        className="container mt-1"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <h2 className="mb-4" style={{ textAlign: "center", color: "#343a40" }}>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
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
            className="btn btn-success"
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              padding: "10px 20px",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Reset;
