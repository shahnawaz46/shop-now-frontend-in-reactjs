import React, { useState } from "react";;
import {  NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsFillCameraFill } from "react-icons/bs";

// components
import "./style.css";
import Address from "../Address";
import EditProfile from "../EditProfile";
import PlaceOrders from "../PlaceOrder";
import AvatarImage from "../../../asset/avatar.jpg";
import WishList from "../Exchange";
import { logout } from "../../../redux/slices/UserSlice";
// import { giveMeProfileImage } from '../../axios/UlrConfig';


const User = ({userData}) => {
  const dispatch = useDispatch()
  const { page } = useParams();
  const navigate = useNavigate()

  const [userProfilePic, setUserProfilePic] = useState(null);

  const logoutHandle = () => {
    localStorage.removeItem("_f_id")
    dispatch(logout())
    navigate("/home", {replace:true})
  }

  // const updateProfileFnc = (e) => {
  //     const form = new FormData()
  //     form.append("profilePicture", e.target.files[0])

  //     dispatch(updateProfilePic(form))
  //     setUserProfilePic(null)
  // }


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
          <h2 className="profile-name-box">{`${userData?.firstName} ${userData?.lastName}`}</h2>
          <div className="profile-details">
            {/* First Name - {userDetail?.firstName} */}
            First Name - {userData?.firstName}
          </div>
          <div className="profile-details">
            {/* Last Name - {userDetail?.lastName} */}
            Last Name - {userData?.lastName}
          </div>
          <div className="profile-details">
            {/* Email - {userDetail?.email} */}
            Email - {userData?.email}
          </div>
          <div className="profile-details">
            {/* Mobile No. - {userDetail?.phoneNo} */}
            Mobile No. - {userData?.phoneNo}
          </div>
          {/* <button onClick={userLogoutFnc} className="profile-user-button"> */}
          <button className="profile-user-button" onClick={logoutHandle}>Logout</button>
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
    </div>
  );
};
export default React.memo(User);
