import { memo, useActionState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// components
import './style.css';
import axiosInstance from '../../../axios/AxiosInstance';
import { updatePersonDetail } from '../../../redux/slices/UserSlice';
import { ErrorMsg } from '../../common/FormikErrorMsg';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { personalDetails } = useSelector((state) => state.user);

  const [data, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const formDataInfo = {};
      Array.from(formData.entries()).forEach(
        ([key, value]) => (formDataInfo[key] = value)
      );

      const error = {};
      for (let key in formDataInfo) {
        if (!formDataInfo[key]) {
          formDataInfo[key] = '';
          error[key + 'Error'] = `${key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()} required`;
        }
      }

      if (Object.keys(error).length > 0) return { ...formDataInfo, ...error };

      try {
        const res = await axiosInstance.patch('/profile', {
          userDetail: formDataInfo,
        });
        toast.success(res.data.msg);
        dispatch(updatePersonDetail(res.data.userDetail));
      } catch (error) {
        toast.error(error?.response?.data?.error || error?.message);
      }

      return formDataInfo;
    },
    personalDetails
  );

  return (
    <div className="editprofile_container">
      <div className="editprofile_form_container">
        <h2>Edit Details</h2>

        <form className="editprofile_form" action={formAction}>
          <div className="editprofile_input">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              defaultValue={data?.firstName}
            />

            {data?.firstNameError && <ErrorMsg msg={data?.firstNameError} />}
          </div>

          <div className="editprofile_input">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="lastName"
              defaultValue={data?.lastName}
            />

            {data?.lastNameError && <ErrorMsg msg={data?.lastNameError} />}
          </div>

          <div className="editprofile_input">
            <label htmlFor="phone_no">Phone No</label>
            <input
              type="number"
              id="phone_no"
              value={personalDetails?.phoneNo}
              readOnly
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
              name="email"
              defaultValue={data?.email}
            />

            {data?.emailError && <ErrorMsg msg={data?.emailError} />}
          </div>

          <div className="editprofile_input">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={data?.location}
            />

            {data?.locationError && <ErrorMsg msg={data?.locationError} />}
          </div>

          <button
            className="editprofile_button"
            type="submit"
            disabled={isPending}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(EditProfile);
