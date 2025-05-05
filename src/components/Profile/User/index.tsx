import React, { memo, useOptimistic, useTransition } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { BsFillCameraFill } from "react-icons/bs";
import { toast } from "react-toastify";

// components
import "./style.css";
import Address from "../Address";
import EditProfile from "../EditProfile";
import PlaceOrders from "../PlaceOrder";
import { updatePersonDetail } from "../../../redux/slices/UserSlice";
import axiosInstance from "../../../axios/AxiosInstance";
import { clearStateAndStorage } from "../../../utils/ClearStateAndStorage";
import CustomButton from "../../common/CustomButton";
import Toggle from "../../Toggle";
import { IPersonalDetail } from "../../../types/interfaces/user.interface";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import { useAppDispatch } from "../../../redux/hooks";
import useElementSize from "../../../hooks/useMultipleElementSizes";

const userConfig = [
  {
    id: 1,
    name: "Your Address",
    link: "/my-account/address",
    component: Address,
  },
  {
    id: 2,
    name: "Edit Profile",
    link: "/my-account/edit-profile",
    component: EditProfile,
  },
  {
    id: 3,
    name: "Your Order",
    link: "/my-account/orders",
    component: PlaceOrders,
  },
  // { id: 4, name: 'Your Wish List', link: '/my-account/wish-list',  component: WishList, },
  // { id: 5, name: 'Return', link: '/my-account/return' },
] as const;

const User = ({ userData }: { userData: IPersonalDetail }) => {
  const dispatch = useAppDispatch();

  const { page } = useParams();
  const navigate = useNavigate();
  const [optimisticProfile, addOptimisticProfile] = useOptimistic<
    string | null
  >(userData.profilePicture);

  const [isPending, startTransition] = useTransition();
  const { totalHeight, elementRefs } = useElementSize();

  const logoutHandle = async () => {
    try {
      navigate("/");
      await axiosInstance.post("/signout");
      clearStateAndStorage();
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  const updateProfileFnc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("profilePicture", file);

    startTransition(async () => {
      addOptimisticProfile(URL.createObjectURL(file));

      try {
        const res = await axiosInstance.patch("/profile-pic", formData);
        toast.success("Profile picture updated successfully");
        dispatch(updatePersonDetail(res.data.userDetails));
      } catch (error) {
        handleAxiosError({ error });
      }
    });

    e.target.value = "";
  };

  // find activeComponent based on URL
  const ActiveComponent = userConfig.find((nav) => {
    const pg = page as string;
    return nav.link.includes(pg);
  })?.component;

  return (
    <>
      <div className="profile-container">
        <div
          className="profile-top"
          ref={(el) => {
            elementRefs.current[0] = el;
          }}
        >
          <h2 className="profile-heading">Customer Dashboard</h2>
          <div style={{ paddingRight: "12px" }}>
            <Toggle />
          </div>
        </div>

        {/* user personal details */}
        <div
          className="profile-user-container"
          ref={(el) => {
            elementRefs.current[1] = el;
          }}
        >
          <div className="profile-user-image-container">
            <img
              alt="Remy Sharp"
              src={
                optimisticProfile ||
                "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <label
              htmlFor="for-upload-profile"
              style={{ visibility: isPending ? "hidden" : "visible" }}
            >
              <BsFillCameraFill className="profile-user-edit-icon" />
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .avif, .webp"
                id="for-upload-profile"
                style={{ display: "none" }}
                onChange={updateProfileFnc}
              />
            </label>
          </div>

          <div className="profile-user-detail-container">
            <h2 className="profile-user-name">{`${userData?.firstName} ${userData?.lastName}`}</h2>
            <div className="profile-user-details">
              First Name - {userData?.firstName}
            </div>
            <div className="profile-user-details">
              Last Name - {userData?.lastName}
            </div>
            <div className="profile-user-details">
              Email - {userData?.email}
            </div>
            <div className="profile-user-details">
              Mobile No. - {userData?.phoneNo}
            </div>

            <CustomButton
              text={"Logout"}
              className={"profile-user-button"}
              onClick={logoutHandle}
            />
          </div>
        </div>

        {/* tabs */}
        <div
          ref={(el) => {
            elementRefs.current[2] = el;
          }}
        >
          <ul className="profile-tab-container">
            {userConfig.map((nav) => (
              <li key={nav.id}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) =>
                    isActive ? "active-tab profile-tab" : "profile-tab"
                  }
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {ActiveComponent && <ActiveComponent totalHeight={totalHeight} />}
        </div>
      </div>
    </>
  );
};
export default memo(User);
