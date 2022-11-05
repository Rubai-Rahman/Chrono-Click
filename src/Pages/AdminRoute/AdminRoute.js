import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const {
    allContexts: { user, admin },
  } = useAuth();

  if (user.email && admin) {
    return children;
  }
  return <Navigate to={location} />;
};

export default AdminRoute;
