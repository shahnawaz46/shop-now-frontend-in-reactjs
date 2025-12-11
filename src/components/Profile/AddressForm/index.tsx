import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { Field, Form, Formik } from "formik";

// components
import "./style.css";
import Modal from "../../common/Modal";
import { addAddress, updateAddress } from "../../../redux/slices/AddressSlice";
import axiosInstance from "../../../axios/AxiosInstance";
import FormTitle from "../../common/FormTitle";
import { addressFormLabel, addressInitialState } from "../Address";
import { ScreenLoading } from "../../Loaders";
import CustomButton from "../../common/CustomButton";
import { useAppDispatch } from "../../../redux/hooks";
import {
  IOpenAddressModal,
  IAddressDetails,
} from "../../../types/interfaces/user.interface";
import { RequestStatus } from "../../../types/enums/RequestStatus";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import { validateAddress } from "../../../validation/User.validation";
import FormikErrorMsg, { ErrorMsg } from "../../common/FormikErrorMsg";
import PinCodeLogic from "./PinCodeLogic";
import { CustomSelectInput } from "../../common/CustomInput";

interface IAddressFormProps {
  openAddressModal: IOpenAddressModal;
  setOpenAddressModal: React.Dispatch<React.SetStateAction<IOpenAddressModal>>;
  userAddress: IAddressDetails;
  setUserAddress: React.Dispatch<React.SetStateAction<IAddressDetails>>;
}

const AddressForm = (props: IAddressFormProps) => {
  const { openAddressModal, setOpenAddressModal, userAddress, setUserAddress } =
    props;

  const dispatch = useAppDispatch();

  const [invalidPinCodeMessage, setInvalidPinCodeMessage] = useState<
    string | null
  >(null);
  const [locality, setLocality] = useState<string[]>([]);
  const [status, setStatus] = useState(RequestStatus.Idle);

  const handleSubmit = async (values: IAddressDetails) => {
    try {
      setStatus(RequestStatus.Pending);
      let res;
      if (openAddressModal.type === "Update Address") {
        res = await axiosInstance.put("/address", values);
        dispatch(updateAddress(res.data.address));
      } else {
        res = await axiosInstance.post("/address", values);
        dispatch(addAddress(res.data.address));
      }

      setOpenAddressModal({ type: "", show: false });
      setUserAddress(addressInitialState);

      toast.success(res.data.msg);
      setStatus(RequestStatus.Succeeded);
    } catch (error) {
      setStatus(RequestStatus.Failed);
      handleAxiosError({ error });
    }
  };

  return (
    <>
      {status === RequestStatus.Pending && (
        <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />
      )}

      <Modal open={openAddressModal?.show}>
        <div
          // onSubmit={(e) => handleForm(e, openAddressModal.type)}
          className="address-form"
          // style={{ filter: laodingForPinCode ? 'blur(0.5px)' : 'blur(0)' }}
        >
          <FormTitle
            text={"Add New Address"}
            flexDirection="row"
            justifyContent="space-between"
          >
            <IoClose
              style={{
                fontSize: "1.25rem",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
              onClick={() => setOpenAddressModal({ type: "", show: false })}
            />
          </FormTitle>

          <Formik
            initialValues={userAddress}
            validate={validateAddress}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <div className="input-flex">
                  <div className="input-container input-container-address width-50">
                    <label htmlFor="name">{addressFormLabel["name"]}</label>
                    <Field id="name" name="name" />

                    <FormikErrorMsg name="name" />
                  </div>

                  <div className="input-container input-container-address width-50">
                    <label htmlFor="mobileNumber">
                      {addressFormLabel["mobileNumber"]}
                    </label>
                    <Field id="mobileNumber" name="mobileNumber" />

                    <FormikErrorMsg name="mobileNumber" />
                  </div>
                </div>

                <div className="input-flex">
                  <div className="input-container input-container-address width-50">
                    <label htmlFor="pinCode">
                      {addressFormLabel["pinCode"]}
                    </label>
                    <Field id="pinCode" name="pinCode" maxLength={6} />

                    <PinCodeLogic
                      pinCode={values.pinCode}
                      onResult={(state, cityDistrictTown, locality, error) => {
                        if (error) {
                          setFieldValue("state", "");
                          setFieldValue("cityDistrictTown", "");
                          setFieldValue("locality", "");
                          setLocality([]);
                          setInvalidPinCodeMessage(error);
                        } else {
                          setLocality(locality);
                          setFieldValue("state", state);
                          setFieldValue("cityDistrictTown", cityDistrictTown);
                          setInvalidPinCodeMessage("");
                        }
                      }}
                    />

                    {errors.pinCode ? (
                      <FormikErrorMsg name="pinCode" />
                    ) : invalidPinCodeMessage ? (
                      <ErrorMsg msg={invalidPinCodeMessage} />
                    ) : null}
                  </div>

                  <div className="input-container input-container-address width-50">
                    <label htmlFor="state">{addressFormLabel["state"]}</label>
                    <Field id="state" name="state" readOnly />

                    <FormikErrorMsg name="state" />
                  </div>
                </div>

                <div className="input-container input-container-address">
                  <label htmlFor="address">{addressFormLabel["address"]}</label>

                  <Field
                    id="address"
                    name="address"
                    placeholder="House no. 101 Block no 32"
                  />

                  <FormikErrorMsg name="address" />
                </div>

                <div className="input-flex">
                  <div className="input-container input-container-address width-50">
                    <label>{addressFormLabel["locality"]}</label>

                    <CustomSelectInput
                      value={values.locality}
                      options={locality}
                      onSelect={(value) => {
                        setFieldValue("locality", value);
                      }}
                      disabled={locality.length === 0}
                    />

                    <FormikErrorMsg name="locality" />
                  </div>

                  <div className="input-container input-container-address width-50">
                    <label htmlFor="cityDistrictTown">
                      {addressFormLabel["cityDistrictTown"]}
                    </label>

                    <Field id="cityDistrictTown" name="cityDistrictTown" />

                    <FormikErrorMsg name="cityDistrictTown" />
                  </div>
                </div>

                <div className="input-container input-container-address">
                  <label htmlFor="landmark">
                    {addressFormLabel["landmark"]}{" "}
                    <span style={{ fontSize: "15px" }}>(optional)</span>
                  </label>

                  <Field
                    id="landmark"
                    name="landmark"
                    placeholder="Near Apolo Hospital"
                  />

                  <FormikErrorMsg name="landmark" />
                </div>

                <div className="input-container input-container-address">
                  <label htmlFor="alternatePhone">
                    {addressFormLabel["alternatePhone"]}{" "}
                    <span style={{ fontSize: "15px" }}>(optional)</span>
                  </label>

                  <Field id="alternatePhone" name="alternatePhone" />

                  <FormikErrorMsg name="alternatePhone" />
                </div>

                <div className="input-container input-container-address">
                  <div>{addressFormLabel["addressType"]}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Field type="radio" name="addressType" value="home" />
                        <span
                          style={{
                            color: "var(--text-primary)",
                            marginLeft: "5px",
                          }}
                        >
                          Home
                        </span>
                      </div>
                    </label>

                    <label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Field type="radio" name="addressType" value="work" />
                        <span
                          style={{
                            color: "var(--text-primary)",
                            marginLeft: "5px",
                          }}
                        >
                          Work
                        </span>
                      </div>
                    </label>
                  </div>

                  <FormikErrorMsg name="addressType" />
                </div>

                <div className="address-form-buttons">
                  <CustomButton
                    text={openAddressModal.type}
                    className={`address-form-buttton`}
                    type="submit"
                  />
                  <CustomButton
                    text={"Cancel"}
                    className={`address-form-buttton`}
                    onClick={() => {
                      setUserAddress(addressInitialState);
                      setOpenAddressModal({ type: "", show: false });
                    }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default AddressForm;
