import { memo, useOptimistic, useTransition } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { BsFillCameraFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

// components
import './style.css';
import Address from '../Address';
import EditProfile from '../EditProfile';
import PlaceOrders from '../PlaceOrder';
// import WishList from '../Exchange';
import { updatePersonDetail } from '../../../redux/slices/UserSlice';
import axiosInstance from '../../../axios/AxiosInstance';
import { clearStateAndStorage } from '../../../utils/ClearStateAndStorage';

const userConfig = [
  {
    id: 1,
    name: 'Your Address',
    link: '/my-account/address',
    component: Address,
  },
  {
    id: 2,
    name: 'Edit Profile',
    link: '/my-account/edit-profile',
    component: EditProfile,
  },
  {
    id: 3,
    name: 'Your Order',
    link: '/my-account/orders',
    component: PlaceOrders,
  },
  // { id: 4, name: 'Your Wish List', link: '/my-account/wish-list',  component: WishList, },
  // { id: 5, name: 'Return', link: '/my-account/return' },
];

const User = ({ userData }) => {
  const dispatch = useDispatch();

  const { page } = useParams();
  const navigate = useNavigate();
  const [optimisticProfile, addOptimisticProfile] = useOptimistic(
    userData?.profilePicture
  );
  const [isPending, startTransition] = useTransition();

  const logoutHandle = async () => {
    try {
      navigate('/');
      await axiosInstance.post('/signout');
      clearStateAndStorage();
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  const updateProfileFnc = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    startTransition(async () => {
      addOptimisticProfile(URL.createObjectURL(file));

      try {
        const res = await axiosInstance.patch('/profile-pic', formData);
        toast.success('Profile picture updated successfully');
        dispatch(updatePersonDetail(res.data.userDetails));
      } catch (error) {
        toast.error(error?.response?.data?.error || error?.message);
      }
    });

    e.target.value = null;
  };

  // find activeComponent based on URL
  const ActiveComponent = userConfig.find((nav) =>
    nav.link.includes(page)
  ).component;

  return (
    <>
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
                optimisticProfile ||
                'https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y='
              }
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <label
              htmlFor="for-upload-profile"
              style={{ visibility: isPending ? 'hidden' : 'visible' }}
            >
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
            {userConfig.map((nav) => (
              <li key={nav.id}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) => (isActive ? 'active-tab' : '')}
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-features-box">
          <ActiveComponent />
        </div>
      </div>
    </>
  );
};
export default memo(User);
