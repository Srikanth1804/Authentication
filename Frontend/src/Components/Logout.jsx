import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let Navigate = useNavigate();

  let Handlelogout = (e) => {
    Axios.get("http://localhost:3001/api/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data.msg);

        if (res.data.status) {
          Navigate("/");
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
