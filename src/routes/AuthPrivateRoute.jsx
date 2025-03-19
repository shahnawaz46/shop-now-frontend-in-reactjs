import { Navigate } from 'react-router';

const AuthPrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('__f_id');

  if (isAuthenticated) return <Navigate to={'/'} />;

  return children;
};

export default AuthPrivateRoute;
