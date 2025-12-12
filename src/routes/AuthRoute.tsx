import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { ScreenLoading } from "../components/Loaders";

const AuthRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (isAuthenticated === null) return <ScreenLoading />;

  if (isAuthenticated) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default AuthRoute;
