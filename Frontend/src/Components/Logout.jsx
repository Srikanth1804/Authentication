import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ENDPOINT from "./General";

const Logout = () => {
  let Navigate = useNavigate();

  let Handlelogout = (e) => {
    Axios.get(`${API_ENDPOINT}/api/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.msg);

        if (res.data.status) {
          localStorage.removeItem("auth-token");
          Navigate("/", { replace: true });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={Handlelogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
