import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // 'admin' | 'seller' | 'customer'

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
