import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies library

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    // Check if user is authenticated
    const isAuthenticated = Cookies.get("currentUser");

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      //navigate("/clientsignin");
      window.location.href = "clientsignin";
      return null; // Return null while redirecting
    }
  };

  return AuthComponent;
};

export default withAuth;
