import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const isAuthenticated: string | null = localStorage.getItem("__f_id");

  if (isAuthenticated) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default AuthRoute;
