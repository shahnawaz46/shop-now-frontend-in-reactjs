import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('__f_id');

  // inside location.state.from, i am getting the route from where the user clicked on the profile icon to view the profile.
  // If the user is not logged in then I am redirecting the user to the login page, but if the user clicks the back button.
  // Then I am redirecting the user to the previous page from where the user clicked on the profile icon to view the profile.
  const previousRoute = location?.state?.from || '/';

  if (!isAuthenticated)
    return <Navigate to={'/account/login'} replace={previousRoute} />;

  return children;
};

export default PrivateRoute;
