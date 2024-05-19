import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies library

const withAdminAuth = (WrappedComponent) => {
  const AuthAdminComponent = (props) => {
    const navigate = useNavigate();
    const isAdmin = Cookies.get("isAdmin");
    if (isAdmin === "true") {
      return <WrappedComponent {...props} />;
    } else {
      //navigate("/adminsignin");
      window.location.href = "adminsignin";
    }
  };

  return AuthAdminComponent;
};

export default withAdminAuth;
