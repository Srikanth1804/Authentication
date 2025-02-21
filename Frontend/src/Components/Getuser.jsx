import React, { useEffect, useState } from "react";
import Axios from "axios";
import API_ENDPOINT from "./General";

const Getuser = () => {
  const [data, setData] = useState([]);
  const userRole = localStorage.getItem("role"); // Get user role
  console.log("User Role:", userRole);

  useEffect(() => {
    Axios.get(`${API_ENDPOINT}/api/get`, { withCredentials: true })
      .then((res) => {
        console.log("Fetched Data:", res.data);
        setData(res.data.info ? res.data.info : []); // Ensure valid data
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting User ID:", id);

    if (userRole === "admin") {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return; // Stop if user cancels

      Axios.delete(`${API_ENDPOINT}/api/delete/${id}`)
        .then((res) => {
          console.log(res.data.msg);
          setData(data.filter((user) => user._id !== id)); // Remove from UI
        })
        .catch((e) => console.error("Delete failed:", e));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary fw-bold mb-3">User List</h3>
        <div className="list-group">
          {data.length > 0 ? (
            data.map((D, index) => (
              <div
                className={`row p-3 align-items-center border-bottom ${
                  index % 2 === 0 ? "bg-light" : "bg-white"
                }`}
                key={D._id}
              >
                <div className="col">
                  <b className="text-dark">
                    {D.Name}
                    {"  "}
                    <span
                      className={
                        D.Role === "admin" ? "text-success" : "text-danger"
                      }
                    >
                      ({D.Role})
                    </span>
                  </b>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(D._id)}
                    disabled={D.Role === "admin"} // Disable if the user is an admin
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-3">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Getuser;
