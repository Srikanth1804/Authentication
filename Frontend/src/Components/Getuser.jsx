import React, { useEffect } from "react";
import Axios from "axios";
const Getuser = () => {
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <div></div>;
};

export default Getuser;
