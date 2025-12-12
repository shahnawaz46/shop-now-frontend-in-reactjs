import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";
// import { ERequestStatus } from "../types/enums";
import { ScreenLoading } from "../components/Loaders";
import { ERequestStatus } from "../types/enums";

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const location = useLocation();

  // inside location.state.from, i am getting the route from where the user clicked on the profile icon to view the profile.
  // If the user is not logged in then I am redirecting the user to the login page, but if the user clicks the back button.
  // Then I am redirecting the user to the previous page from where the user clicked on the profile icon to view the profile.
  const previousRoute = location?.state?.from || "/";

  if (isAuthenticated === null) return <ScreenLoading />;

  if (!isAuthenticated)
    return <Navigate to={"/account/login"} replace={previousRoute} />;

  return <Outlet />;
};

export default PrivateRoute;
