import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const AuthPrivateRoute = ({ children }) => {
  const navigate = useNavigate();

//   console.log(param)
  const isAuthenticated = localStorage.getItem("__f_id");

  if (isAuthenticated) return <Navigate to={-1} />;
    
  return children;
};

export default AuthPrivateRoute;
