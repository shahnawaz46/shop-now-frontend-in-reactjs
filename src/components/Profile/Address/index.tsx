import { useState, memo, useEffect } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import { toast } from "react-toastify";

// components
import "./style.css";
import AddressForm from "../AddressForm";
import axiosInstance from "../../../axios/AxiosInstance";
import {
  deleteAddress,
  fetchAddressDetails,
} from "../../../redux/slices/AddressSlice";
import CustomButton from "../../common/CustomButton";
import {
  IAddressDetails,
  IOpenAddressModal,
} from "../../../types/interfaces/user.interface";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import { ERequestStatus } from "../../../types/enums";
import { ScreenLoading } from "../../Loaders";

export const addressInitialState: IAddressDetails = {
  name: "",
  mobileNumber: null,
  pinCode: null,
  state: "",
  cityDistrictTown: "",
  address: "",
  locality: "",
  landmark: "",
  alternatePhone: null,
  addressType: "",
};

// Omit _id when using for labels
type AddressFormLabelKeys = Omit<IAddressDetails, "_id">;
export const addressFormLabel: Record<keyof AddressFormLabelKeys, string> = {
  name: "Full Name",
  mobileNumber: "Mobile Number",
  pinCode: "Pincode",
  state: "State",
  cityDistrictTown: "City/District Town",
  address: "Address",
  locality: "Locality",
  landmark: "Landmark",
  alternatePhone: "Alternate Mobile Number",
  addressType: "Address Type",
};

const Address = ({ totalHeight }: { totalHeight?: number }) => {
  const dispatch = useAppDispatch();
  const { status, addressDetails } = useAppSelector((state) => state.address);
  console.log("addressDetails", status, addressDetails);

  const [openAddressModal, setOpenAddressModal] = useState<IOpenAddressModal>({
    type: "",
    show: false,
  });
  const [userAddress, setUserAddress] = useState(addressInitialState);

  const removeAddressFnc = async (_id: string) => {
    try {
      const res = await axiosInstance.delete(`/address/${_id}`);
      toast.success(res.data.msg);
      dispatch(deleteAddress(_id));
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  useEffect(() => {
    if (status === ERequestStatus.Idle) {
      dispatch(fetchAddressDetails());
    }
  }, []);

  if (status === ERequestStatus.Idle || status === ERequestStatus.Pending) {
    return (
      <div
        className="address-container"
        style={{
          minHeight: `calc(100vh - ${totalHeight ? totalHeight + 80 : 80}px)`,
          position: "relative",
        }}
      >
        <ScreenLoading position="absolute" />
      </div>
    );
  }

  if (!addressDetails || addressDetails?.length === 0) {
    return (
      <div
        className="address-container"
        style={{
          minHeight: `calc(100vh - ${totalHeight ? totalHeight + 80 : 80}px)`,
        }}
      >
        <div className="address-not-available-container">
          <FaRegAddressBook className="address-icon" />
          <div className="address-not-available-content">
            <h3 className="address-not-available-h3">
              You haven&apos;t Added any Addresses
            </h3>

            <CustomButton
              text={"Add Address"}
              className={"address-not-available-btn"}
              onClick={() =>
                setOpenAddressModal({ type: "Add Address", show: true })
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="address-container"
      style={{
        minHeight: `calc(100vh - ${totalHeight ? totalHeight + 80 : 80}px)`,
      }}
    >
      {addressDetails?.length === 0 ? (
        <div className="address-not-available-container">
          <FaRegAddressBook className="address-icon" />
          <div className="address-not-available-content">
            <h3 className="address-not-available-h3">
              You haven&apos;t Added any Addresses
            </h3>

            <CustomButton
              text={"Add Address"}
              className={"address-not-available-btn"}
              onClick={() =>
                setOpenAddressModal({ type: "Add Address", show: true })
              }
            />
          </div>
        </div>
      ) : (
        <div className="address-available-container">
          <div className="address-add-container">
            <h3 className="address-add-h3">Saved Addresses</h3>
            <CustomButton
              text={"Add Address"}
              className={"address-add-button"}
              onClick={() =>
                setOpenAddressModal({ type: "Add Address", show: true })
              }
            />
          </div>
          <div className="address-details-container">
            {addressDetails?.map((value, index) => (
              <div key={index} className="address-details">
                <span className="address-user-name">{value.name}</span>
                <span className="address-detail">{value.address}</span>
                <span className="address-detail">
                  {value.state} - {value.pinCode}
                </span>
                <span className="address-detail">{value.cityDistrictTown}</span>
                <span className="address-detail">
                  Landmark : {value.landmark}
                </span>
                <span className="address-person-mobile-no">
                  Phone no : {value.mobileNumber}
                </span>
                <div className="address-btn-container">
                  <CustomButton
                    text={"Edit"}
                    className={"address-edit-remove-button"}
                    onClick={() => {
                      setUserAddress(value);
                      setOpenAddressModal({
                        type: "Update Address",
                        show: true,
                      });
                    }}
                  />
                  <CustomButton
                    text={"Remove"}
                    className={"address-edit-remove-button"}
                    onClick={() => value._id && removeAddressFnc(value._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {openAddressModal?.show && (
        <AddressForm
          openAddressModal={openAddressModal}
          setOpenAddressModal={setOpenAddressModal}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
      )}
    </div>
  );
};

export default memo(Address);
