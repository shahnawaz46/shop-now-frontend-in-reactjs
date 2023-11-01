import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import User from '../components/profile/User';
import RootLayout from '../components/Layout/RooLayout';
import Loading from '../components/Loading';
import { fetchPersonalDetails } from '../redux/slices/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { status, personalDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPersonalDetails());
  }, []);

  if (status === 'pending') return <Loading />;

  return (
    <RootLayout>
      <User userData={personalDetails} />
    </RootLayout>
  );
};

export default Profile;
