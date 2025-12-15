import { memo } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";

// components
import "./style.css";
import axiosInstance from "../../../axios/AxiosInstance";
import { updatePersonDetail } from "../../../redux/slices/AuthSlice";
import FormikErrorMsg from "../../common/FormikErrorMsg";
import CustomButton from "../../common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IPersonalDetail } from "../../../types/interfaces/user.interface";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import { editProfileSchema } from "../../../validation/EditProfile.yup";

// Omit
type TOmitedPersonalDetail = Omit<
  IPersonalDetail,
  "_id" | "email" | "phoneNo" | "profilePicture"
>;

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: IPersonalDetail) => {
    const updatedData: Partial<TOmitedPersonalDetail> = {};
    const requiredFields: (keyof TOmitedPersonalDetail)[] = [
      "firstName",
      "lastName",
      "location",
    ];

    requiredFields.forEach((key) => {
      const _value = values[key].trim().replace(/\s+/g, " ");
      if (requiredFields.includes(key) && user && user[key] !== _value) {
        updatedData[key] = _value;
      }
    });

    if (Object.keys(updatedData).length === 0) return;

    try {
      const res = await axiosInstance.patch("/profile", {
        userDetail: updatedData,
      });
      toast.success(res.data.msg);
      dispatch(updatePersonDetail(res.data.userDetail));
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  return (
    <div className="editprofile-container">
      <div className="editprofile-form-container">
        <h2 className="editprofile-h2">Edit Details</h2>

        <Formik
          initialValues={user!}
          validationSchema={editProfileSchema}
          onSubmit={(value, { setSubmitting }) => {
            handleSubmit(value);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            //  { console.log(isSubmitting)}
            <Form className="editprofile-form">
              <div className="editprofile-input">
                <label htmlFor="first_name">First Name</label>
                <Field id="first_name" name="firstName" />

                <FormikErrorMsg name="firstName" />
              </div>

              <div className="editprofile-input">
                <label htmlFor="last_name">Last Name</label>
                <Field id="last_name" name="lastName" />

                <FormikErrorMsg name="lastName" />
              </div>

              <div className="editprofile-input">
                <label htmlFor="phone_no">Phone Number</label>
                <Field id="phone_no" name="phoneNo" readOnly />

                {/* <button
                  className="editprofile-edit-phone-no-button"
                  // onClick={changeMobileNo}
                >
                  Change
                </button> */}

                <FormikErrorMsg name="phoneNo" />
              </div>

              <div className="editprofile-input">
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" readOnly />

                <FormikErrorMsg name="email" />
              </div>

              <div className="editprofile-input">
                <label htmlFor="location">Location</label>
                <Field id="location" name="location" />

                <FormikErrorMsg name="location" />
              </div>

              <CustomButton
                text={"Save Changes"}
                type="submit"
                disabled={isSubmitting}
                className="editprofile-button"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default memo(EditProfile);
