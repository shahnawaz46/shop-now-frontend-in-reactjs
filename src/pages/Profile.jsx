import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

// components
import User from '../components/Profile/User';
import RootLayout from '../components/Layout/RooLayout';
import { ScreenLoading } from '../components/Loaders';
import { fetchPersonalDetails } from '../redux/slices/UserSlice';
import { clearStateAndStorage } from '../utils/ClearStateAndStorage';

const Profile = () => {
  const dispatch = useDispatch();
  const { status, personalDetails } = useSelector((state) => state.user);

  const [notAuthenticated, setNotAuthenticated] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPersonalDetails());
    }
  }, []);

  useEffect(() => {
    if (status === 'failed' || personalDetails == null) {
      clearStateAndStorage();
      setNotAuthenticated(true);
    }
  }, [status]);

  if (notAuthenticated)
    return <Navigate to={'/account/login'} replace={true} />;

  if (status === 'idle' || status === 'pending') return <ScreenLoading />;

  return (
    <RootLayout>
      <User userData={personalDetails} />
    </RootLayout>
  );
};

export default Profile;
