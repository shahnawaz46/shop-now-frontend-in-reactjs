import React from "react";
import User from "../components/profile/User";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const Profile = () => {
    if (true) return <Loading />;
  return (
    <Layout>
      <User />
    </Layout>
  );
};

export default Profile;
