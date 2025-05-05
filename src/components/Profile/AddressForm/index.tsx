import React, { useState } from "react";
import axios from "axios";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

// components
import "./style.css";
import Modal from "../../common/Modal";
import { addAddress, updateAddress } from "../../../redux/slices/UserSlice";
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
import { getKeyType } from "../../../utils/Objects";
import { checkAddressFields } from "../../../validation/User.validation";

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
  const [showLocalityList, setShowLocalityList] = useState<boolean>(false);
  const [, setLoadingForPinCode] = useState<boolean>(false);
  const [status, setStatus] = useState(RequestStatus.Idle);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    // first getting key type for check condition
    const _getKeyType: string = getKeyType(
      addressInitialState,
      name as keyof IAddressDetails
    );
    const updatedValue = _getKeyType === "number" ? Number(value) : value;
    setUserAddress({
      ...userAddress,
      [name]: updatedValue,
    });

    // if name === pincode then fetching data based on pincode
    if (name === "pinCode") {
      if (value.length === 6) {
        // updating state for show loading icon and blur form while fetching data based on pincode
        setLoadingForPinCode((prev) => !prev);

        // calling api for fetching data based on pincode
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        if (res.data[0].Status === "Error" || res.data[0].Status === "404") {
          setInvalidPinCodeMessage("Invalid Pin Code");
          setLocality([]);
        } else {
          const postOffice = res.data[0].PostOffice[0];
          setUserAddress((prev) => ({
            ...prev,
            state: postOffice.State,
            cityDistrictTown: postOffice.District,
          }));
          setLocality(
            res.data[0].PostOffice.map((value: { Name: string }) => value.Name)
          );
          setInvalidPinCodeMessage(null);
        }
        setLoadingForPinCode((prev) => !prev);
      }
    }
  };

  const handleForm = async (openAddressModal: IOpenAddressModal) => {
    // validation
    const result = checkAddressFields(userAddress);
    // console.log(result);
    if (result.error) {
      return toast.error(result.errorMsg);
    }

    try {
      setStatus(RequestStatus.Pending);
      let res;
      if (openAddressModal.type === "Update Address") {
        res = await axiosInstance.put("/address", result.data);
        dispatch(updateAddress(res.data.address));
      } else {
        res = await axiosInstance.post("/address", { ...userAddress });
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

          <form>
            <div className="input-flex">
              <div className="input-container input-container-address width-50">
                <label htmlFor="name">{addressFormLabel["name"]}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userAddress.name || ""}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="input-container input-container-address width-50">
                <label htmlFor="mobileNumber">
                  {addressFormLabel["mobileNumber"]}
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="number"
                  value={userAddress.mobileNumber || ""}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <div className="input-flex">
              <div className="input-container input-container-address width-50">
                <label htmlFor="pinCode">{addressFormLabel["pinCode"]}</label>

                <input
                  id="pinCode"
                  name="pinCode"
                  type="text"
                  value={userAddress.pinCode || ""}
                  maxLength={6}
                  onChange={handleInput}
                  required
                />
                {invalidPinCodeMessage && (
                  <span style={{ fontSize: "14px", color: "red" }}>
                    *{invalidPinCodeMessage}
                  </span>
                )}
              </div>

              <div className="input-container input-container-address width-50">
                <label htmlFor="state">{addressFormLabel["state"]}</label>
                <input
                  id="state"
                  type="text"
                  value={userAddress.state || ""}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="input-container input-container-address">
              <label htmlFor="" className="address">
                {addressFormLabel["address"]}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={userAddress.address || ""}
                placeholder="House no. 101 Block no 32"
                onChange={handleInput}
                required
              />
            </div>

            <div className="input-flex">
              <div className="input-container input-container-address width-50">
                <label htmlFor="">{addressFormLabel["locality"]}</label>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    id="locality"
                    name="locality"
                    type="text"
                    value={userAddress.locality || ""}
                    onChange={handleInput}
                    required
                  />
                  {showLocalityList ? (
                    <MdKeyboardArrowUp
                      onClick={() => setShowLocalityList(false)}
                      // style={{ marginLeft: '-18px' }}
                      className="input-locality-icon"
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      onClick={() => setShowLocalityList(true)}
                      // style={{ marginLeft: '-18px' }}
                      className="input-locality-icon"
                    />
                  )}
                </div>
                {showLocalityList && (
                  <div className="address-form-show-locality-box">
                    {/* <ul> */}
                    {locality.length > 0 &&
                      locality.map((value, index) => {
                        return (
                          <span
                            key={index}
                            className="address-form-show-locality"
                            onClick={() => {
                              setUserAddress({
                                ...userAddress,
                                locality: value,
                              });
                              setShowLocalityList(false);
                            }}
                          >
                            {value}
                          </span>
                        );
                      })}
                    {/* </ul> */}
                  </div>
                )}
              </div>

              <div className="input-container input-container-address width-50">
                <label htmlFor="City"></label>
                {addressFormLabel["cityDistrictTown"]}
                <input
                  id="City"
                  type="text"
                  value={userAddress.cityDistrictTown || ""}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="input-container input-container-address">
              <label htmlFor="landmark">
                {addressFormLabel["landmark"]}{" "}
                <span style={{ fontSize: "15px" }}>(optional)</span>
              </label>
              <input
                id="landmark"
                name="landmark"
                type="text"
                value={userAddress.landmark || ""}
                placeholder="Near Apolo Hospital"
                onChange={handleInput}
              />
            </div>

            <div className="input-container input-container-address">
              <label htmlFor="alternatePhone">
                {addressFormLabel["alternatePhone"]}{" "}
                <span style={{ fontSize: "15px" }}>(optional)</span>
              </label>
              <input
                id="alternatePhone"
                name="alternatePhone"
                type="text"
                value={userAddress.alternatePhone || ""}
                onChange={handleInput}
              />
            </div>

            <div className="input-container input-container-address">
              <label>{addressFormLabel["addressType"]}</label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ marginRight: "2px" }}
                    type="radio"
                    checked={userAddress.addressType === "home" && true}
                    name="addressType"
                    onChange={(e) =>
                      setUserAddress({
                        ...userAddress,
                        [e.target.name]: "home",
                      })
                    }
                    required
                  />
                  <span style={{ color: "var(--text-primary)" }}>Home</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ marginRight: "2px" }}
                    type="radio"
                    checked={userAddress.addressType === "work" && true}
                    name="addressType"
                    onChange={(e) =>
                      setUserAddress({
                        ...userAddress,
                        [e.target.name]: "work",
                      })
                    }
                    required
                  />
                  <span style={{ color: "var(--text-primary)" }}>Work</span>
                </div>
              </div>
            </div>

            <div className="address-form-buttons">
              <CustomButton
                text={openAddressModal.type}
                disabled={invalidPinCodeMessage ? true : false}
                className={`address-form-buttton ${
                  invalidPinCodeMessage ? "disable-add-address-button" : ""
                }`}
                onClick={() => {
                  handleForm(openAddressModal);
                }}
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
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddressForm;
