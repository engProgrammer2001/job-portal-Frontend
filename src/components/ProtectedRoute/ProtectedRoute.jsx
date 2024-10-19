import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const role = localStorage.getItem("role"); // Retrieve the role from localStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />; // Redirect to home if user does not have the required role
  }

  return children;
};

export default ProtectedRoute;
