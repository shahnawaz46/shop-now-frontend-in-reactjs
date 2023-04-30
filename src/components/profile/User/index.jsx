import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';
import { BsFillCameraFill } from "react-icons/bs";
// import CircularProgress from '@mui/material/CircularProgress';

// components
import "./style.css";
import Address from "../Address";
import EditProfile from "../EditProfile";
import PlaceOrders from "../PlaceOrder";
import Return from "../Return";
import AvatarImage from "../../../asset/avatar.jpg";
import WishList from "../Exchange";
// import { giveMeProfileImage } from '../../axios/UlrConfig';
// import ErrorHandle from '../ErrorHandle';

// action
// import { userLogout, getUserProfile, updateProfilePic, loginErrorRemove } from '../../actions/LoginSignupAction';
// import { getAddress, removeAddressMessageAndError } from '../../actions/AddressAction';

const User = () => {
  const { page } = useParams();
  // const { userDetail, authenticate, loading, updatedMessage, error } = useSelector((state) => state.user)
  // const { addressMessage, addressError } = useSelector((state) => state.address)
  // const dispatch = useDispatch()
  // const history = useHistory()

  const [userProfilePic, setUserProfilePic] = useState(null);

  // const userLogoutFnc = () => {
  //     dispatch(userLogout())
  // }

  // const updateProfileFnc = (e) => {
  //     const form = new FormData()
  //     form.append("profilePicture", e.target.files[0])

  //     dispatch(updateProfilePic(form))
  //     setUserProfilePic(null)
  // }

  // useEffect(() => {
  //     if (authenticate) {
  //         dispatch(getUserProfile())
  //         dispatch(getAddress())
  //     }
  //     if (!localStorage.getItem("__xyz__"))
  //         history.push('/home')
  // }, [authenticate])

  // useEffect(() => {
  //     if (updatedMessage) {
  //         console.log("updatedMessage")
  //         dispatch(getUserProfile())
  //     }
  //     if (addressMessage) {
  //         console.log("addressMessage")
  //         dispatch(getAddress())
  //     }
  // }, [updatedMessage, addressMessage])

  return (
    <div className="profile-main-box">
      <h2
        style={{
          textAlign: "center",
          fontWeight: "400",
          paddingTop: "15px",
        }}
      >
        Customer Dashboard
      </h2>

      {/* user personal details */}
      <div className="profile-detail-main-box">
        <div className="profile-picture-box">
          <img
            alt="Remy Sharp"
            src={
              // userDetail.profilePicture &&
              // giveMeProfileImage(userDetail.profilePicture)
              AvatarImage
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <BsFillCameraFill className="profile-edit-icon" />
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            className="profile-select-input"
            //   onChange={updateProfileFnc}
          />
        </div>
        <div className="profile-detail-box">
          {/* <h2 className="profile-name-box">{userDetail?.firstName}</h2> */}
          <h2 className="profile-name-box">{"Mohammad Shahnawaz"}</h2>
          <div className="profile-details">
            {/* First Name - {userDetail?.firstName} */}
            First Name - {"Mohammad"}
          </div>
          <div className="profile-details">
            {/* Last Name - {userDetail?.lastName} */}
            Last Name - {"Shahnawaz"}
          </div>
          <div className="profile-details">
            {/* Email - {userDetail?.email} */}
            Email - {"shahnawaz@gmail.com"}
          </div>
          <div className="profile-details">
            {/* Mobile No. - {userDetail?.phoneNo} */}
            Mobile No. - {"+91 9685748596"}
          </div>
          {/* <button onClick={userLogoutFnc} className="profile-user-button"> */}
          <button className="profile-user-button">Logout</button>
        </div>
      </div>

      {/* tabs */}
      <div className="profile-main-features-box">
        <ul className="profile-main-features-ul">
          <NavLink
            to="/my-account/address"
            className={({ isActive }) =>
              isActive ? "active-tab" : ""
            }
          >
            <li>Your Address</li>
          </NavLink>
          <NavLink
            to="/my-account/edit-profile"
            className={({ isActive }) =>
              isActive ? "active-tab" : ""
            }
          >
            <li>Edit Profile</li>
          </NavLink>
          <NavLink
            to="/my-account/orders"
            className={({ isActive }) =>
              isActive ? "active-tab" : ""
            }
          >
            <li>Your Order</li>
          </NavLink>
          <NavLink
            to="/my-account/wish-list"
            className={({ isActive }) =>
              isActive ? "active-tab" : ""
            }
          >
            <li>Your Wish List</li>
          </NavLink>
          {/* <NavLink
            to="/my-account/return"
            className={({ isActive }) =>
              isActive ? "active-tab" : ""
            }
          >
            <li>Return</li>
          </NavLink> */}
        </ul>
      </div>
      <div className="profile-features-box">
        {page === "address" && <Address />}

        {page === "edit-profile" && <EditProfile />}

        {page === "orders" && <PlaceOrders />}

        {page === "wish-list" && <WishList />}

        {/* {page === "return" && <Return />} */}
      </div>
      {/* for show error and messages */}
      {/* {(updatedMessage || error) && (
              <ErrorHandle
                message={updatedMessage}
                error={error}
                removeAction={loginErrorRemove}
              />
            )} */}

      {/* for show error and messages */}
      {/* {(addressMessage || addressError) && (
              <ErrorHandle
                message={addressMessage}
                error={addressError}
                removeAction={removeAddressMessageAndError}
              />
            )} */}
    </div>
  );
};
export default User;
