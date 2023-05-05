import React, { useEffect } from "react";
import User from "../components/profile/User";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import ShowError from "../components/ShowError";
import { fetchPersonalDetails, removeErrorMsg } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, personalDetails, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") dispatch(fetchPersonalDetails());
  }, []);

  if (status === "pending") return <Loading />;

  if (status === "failed") {
    if (error === "Authorization denied") {
      setTimeout(() => {
        localStorage.removeItem("_f_id");
        dispatch(removeErrorMsg());
        navigate("/login");
      }, 2000);

      return
    }

    dispatch(removeErrorMsg());
    return <ShowError message={error} />;
  }
  
  return (
    <Layout>
      <User userData={personalDetails} />
    </Layout>
  );
};

export default Profile;
