import React, { useEffect, useState } from "react";
import Axios from "axios";

const Getuser = () => {
  const [data, setData] = useState([]);
  const userRole = localStorage.getItem("user-role"); // Get user role

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
      .then((res) => {
        console.log(res.data);
        setData(res.data.info || []);
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
      });
  }, []);

  const handleDelete = (id) => {
    if (userRole == "admin") {
      Axios.delete(`http://localhost:3001/api/delete/${id}`)
        .then(() => {
          setData(data.filter((user) => user._id !== id)); // Remove user from UI
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
                  <b className="text-dark">{D.Name}</b>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(D._id)}
                    disabled={D.Role == "admin"} // Disable for non-admin
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
