import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('__f_id');

  if (!isAuthenticated) return <Navigate to={'/login'} />;

  return children;
};

export default PrivateRoute;
