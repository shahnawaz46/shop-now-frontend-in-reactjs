import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// components
import './style.css';
import axiosInstance from '../../../axios/AxiosInstance';
import { updatePersonDetail } from '../../../redux/slices/UserSlice';
import { API_STATUS } from '../../../utils/Constants';
import { ScreenLoading } from '../../Loaders';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { personalDetails } = useSelector((state) => state.user);

  const [editUserDetail, setEditUserDetail] = useState(personalDetails);
  const [status, setStatus] = useState(API_STATUS.IDLE);

  const EditFormhandle = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, location } = editUserDetail;
    // console.log(firstName, lastName, email, location);
    if (!firstName) return toast.error('Please Enter First Name');
    else if (!lastName) return toast.error('Please Enter Last Name');
    else if (!email) return toast.error('Please Enter Email');
    else if (!location) return toast.error('Please Enter Location');

    try {
      setStatus(API_STATUS.LOADING);
      const res = await axiosInstance.patch('/profile', {
        userDetail: { firstName, lastName, email, location },
      });
      toast.success(res.data.msg);
      dispatch(updatePersonDetail(res.data.userDetail));
      setStatus(API_STATUS.SUCCESS);
      // return res.data.userDetail
    } catch (error) {
      setStatus(API_STATUS.FAILED);
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  // const changeMobileNo = (e) => {
  //   e.preventDefault();
  //   console.log('done');
  // };

  return (
    <>
      {status === API_STATUS.LOADING && (
        <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />
      )}

      <div className="editprofile_container">
        <div className="editprofile_form_container">
          <h2>Edit Details</h2>
          <form className="editprofile_form" onSubmit={EditFormhandle}>
            <div className="editprofile_input">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                value={editUserDetail?.firstName}
                onChange={(e) =>
                  setEditUserDetail({
                    ...editUserDetail,
                    firstName: e.target.value,
                  })
                }
              />
            </div>

            <div className="editprofile_input">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                value={editUserDetail?.lastName}
                onChange={(e) =>
                  setEditUserDetail({
                    ...editUserDetail,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            <div className="editprofile_input">
              <label htmlFor="phone_no">Phone No</label>
              <input
                type="number"
                id="phone_no"
                value={editUserDetail?.phoneNo}
                readOnly
                onChange={(e) =>
                  setEditUserDetail({
                    ...editUserDetail,
                    phoneNo: e.target.value,
                  })
                }
              />

              {/* <button
                className="editprofile-edit-phone-no-button"
                onClick={changeMobileNo}
              >
                Change
              </button> */}
            </div>

            <div className="editprofile_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={editUserDetail?.email}
                onChange={(e) =>
                  setEditUserDetail({
                    ...editUserDetail,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="editprofile_input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={editUserDetail?.location || ''}
                onChange={(e) =>
                  setEditUserDetail({
                    ...editUserDetail,
                    location: e.target.value,
                  })
                }
              />
            </div>

            <button className="editprofile_button">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(EditProfile);
