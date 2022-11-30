import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();

  useEffect(() => {
    localStorage.clear();
    history.push("/admin-login");
    document.body.style.overflow = "hidden";
  });
  return <></>;
};

export default Logout;
