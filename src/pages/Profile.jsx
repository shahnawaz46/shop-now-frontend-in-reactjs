import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// components
import User from '../components/Profile/User';
import RootLayout from '../components/Layout/RooLayout';
import { ScreenLoading } from '../components/Loaders';
import { fetchPersonalDetails } from '../redux/slices/UserSlice';
import { clearStateAndStorage } from '../utils/ClearStateAndStorage';

const Profile = () => {
  const dispatch = useDispatch();
  const { status, personalDetails } = useSelector((state) => state.user);

  useEffect(() => {
    status === 'idle'
      ? dispatch(fetchPersonalDetails())
      : status === 'failed'
      ? clearStateAndStorage()
      : null;
  }, [status]);

  if (status === 'idle' || status === 'pending') return <ScreenLoading />;

  if (status === 'failed') {
    return <Navigate to={'/login'} replace={true} />;
  }

  return (
    <RootLayout>
      <User userData={personalDetails} />
    </RootLayout>
  );
};

export default Profile;
