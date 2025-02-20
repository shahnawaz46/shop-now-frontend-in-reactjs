import { memo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsFillCameraFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

// components
import './style.css';
import Address from '../Address';
import EditProfile from '../EditProfile';
import PlaceOrders from '../PlaceOrder';
import WishList from '../Exchange';
import { updatePersonDetail } from '../../../redux/slices/UserSlice';
import axiosInstance from '../../../axios/AxiosInstance';
import { clearStateAndStorage } from '../../../utils/ClearStateAndStorage';

const User = ({ userData }) => {
  const dispatch = useDispatch();

  const { page } = useParams();
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      navigate('/home');
      await axiosInstance.post('/signout');
      clearStateAndStorage();
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  const updateProfileFnc = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const res = await axiosInstance.patch('/profile-pic', formData);
      toast.success('successfully');
      dispatch(updatePersonDetail(res.data.userDetails));
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }

    e.target.file = null;
  };

  return (
    <div className="profile-main-box">
      <h2
        style={{
          textAlign: 'center',
          fontWeight: '400',
          paddingTop: '15px',
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
              userData?.profilePicture ||
              'https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y='
            }
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <label htmlFor="for-upload-profile">
            <BsFillCameraFill className="profile-edit-icon" />
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .avif, .webp"
              id="for-upload-profile"
              style={{ display: 'none' }}
              onChange={updateProfileFnc}
            />
          </label>
        </div>
        <div className="profile-detail-box">
          <h2 className="profile-name-box">{`${userData?.firstName} ${userData?.lastName}`}</h2>
          <div className="profile-details">
            First Name - {userData?.firstName}
          </div>
          <div className="profile-details">
            Last Name - {userData?.lastName}
          </div>
          <div className="profile-details">Email - {userData?.email}</div>
          <div className="profile-details">
            Mobile No. - {userData?.phoneNo}
          </div>

          <button className="profile-user-button" onClick={logoutHandle}>
            Logout
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="profile-main-features-box">
        <ul className="profile-main-features-ul">
          <NavLink
            to="/my-account/address"
            className={({ isActive }) => (isActive ? 'active-tab' : '')}
          >
            <li>Your Address</li>
          </NavLink>
          <NavLink
            to="/my-account/edit-profile"
            className={({ isActive }) => (isActive ? 'active-tab' : '')}
          >
            <li>Edit Profile</li>
          </NavLink>
          <NavLink
            to="/my-account/orders"
            className={({ isActive }) => (isActive ? 'active-tab' : '')}
          >
            <li>Your Order</li>
          </NavLink>
          {/* <NavLink
            to='/my-account/wish-list'
            className={({ isActive }) => (isActive ? 'active-tab' : '')}
          >
            <li>Your Wish List</li>
          </NavLink> */}
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
        {page === 'address' && <Address />}

        {page === 'edit-profile' && <EditProfile />}

        {page === 'orders' && <PlaceOrders />}

        {page === 'wish-list' && <WishList />}

        {/* {page === "return" && <Return />} */}
      </div>
    </div>
  );
};
export default memo(User);
