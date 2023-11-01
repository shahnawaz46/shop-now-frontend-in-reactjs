import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthPrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('__f_id');

  if (isAuthenticated) return <Navigate to={-1} />;

  return children;
};

export default AuthPrivateRoute;
