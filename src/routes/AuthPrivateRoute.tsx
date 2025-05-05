import { Navigate } from "react-router";
import { IChildren } from "../types/interfaces";

const AuthPrivateRoute = ({ children }: IChildren) => {
  const isAuthenticated: string | null = localStorage.getItem("__f_id");

  if (isAuthenticated) return <Navigate to={"/"} />;

  return children;
};

export default AuthPrivateRoute;
