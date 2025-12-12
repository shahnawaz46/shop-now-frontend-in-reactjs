import { useEffect, useState } from "react";
import { Navigate } from "react-router";

// components
import User from "../components/Profile/User";
import RootLayout from "../components/Layout/RootLayout";
import { ScreenLoading } from "../components/Loaders";
import { fetchPersonalDetails } from "../redux/slices/UserSlice";
import { clearStateAndStorage } from "../utils/ClearStateAndStorage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ERequestStatus } from "../types/enums";
import { IPersonalDetail } from "../types/interfaces/user.interface";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { status, personalDetails } = useAppSelector((state) => state.user);

  const [notAuthenticated, setNotAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (status === ERequestStatus.Idle) {
      dispatch(fetchPersonalDetails());
    }
  }, []);

  useEffect(() => {
    if (status === ERequestStatus.Failed) {
      clearStateAndStorage();
      setNotAuthenticated(true);
    }
  }, [status]);

  if (notAuthenticated)
    return <Navigate to={"/account/login"} replace={true} />;

  if (
    status === ERequestStatus.Idle ||
    status === ERequestStatus.Pending ||
    status === ERequestStatus.Failed
  )
    return <ScreenLoading />;

  return (
    <RootLayout>
      {/* using type assertion because i know User component will only rendered when there is personalDetails */}
      <User userData={personalDetails as IPersonalDetail} />
    </RootLayout>
  );
};

export default Profile;
