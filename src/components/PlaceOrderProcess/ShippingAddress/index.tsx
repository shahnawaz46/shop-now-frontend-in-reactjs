import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

// components
import "./style.css";
import AddressForm from "../../Profile/AddressForm";
import axiosInstance from "../../../axios/AxiosInstance";
import { deleteAddress } from "../../../redux/slices/AddressSlice";
import CustomButton from "../../common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import {
  IOpenAddressModal,
  IAddressDetails,
} from "../../../types/interfaces/user.interface";
import { addressInitialState } from "../../Profile/Address";

const ShippingAddress = () => {
  const dispatch = useAppDispatch();

  const { addressDetails } = useAppSelector((state) => state.address);

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const [openAddressModal, setOpenAddressModal] = useState<IOpenAddressModal>({
    type: "Add Address",
    show: false,
  });
  const [userAddress, setUserAddress] =
    useState<IAddressDetails>(addressInitialState);

  const removeAddress = async (_id: string) => {
    try {
      const res = await axiosInstance.delete(`/address/${_id}`);
      toast.success(res.data.msg);
      dispatch(deleteAddress(_id));
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  const submitAddress = () => {
    if (!selectedAddressId)
      return toast.error("Please Select Shipping Address");

    navigate("/place-order?step=2", {
      state: { ...location.state, addressId: selectedAddressId },
    });
  };

  return (
    <>
      <div className="shippingAddress_container">
        <h2>Shipping Address</h2>
        <div
          className="shippingAddress_newaddress"
          onClick={() =>
            setOpenAddressModal({ type: "Add Address", show: true })
          }
        >
          <FaPlus />
          <span>Add Address</span>
        </div>
        <div className="shippingAddress_card_container">
          {addressDetails?.length > 0 ? (
            addressDetails?.map((item, index) => (
              <div
                key={index}
                className={`shippingAddress_card ${
                  selectedAddressId === item?._id
                    ? "shippingAddress_active"
                    : ""
                }`}
                onClick={() => setSelectedAddressId(item._id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "500",
                    }}
                    className="shippingAddress_info"
                  >
                    {item?.addressType}
                  </span>
                  <MdDelete
                    onClick={() => item._id && removeAddress(item._id)}
                    className="shippingAddress_info"
                  />
                </div>
                <div style={{ marginTop: "5px" }}>
                  <p className="shippingAddress_info">
                    {item?.address}, {item?.locality}, {item?.cityDistrictTown},
                  </p>
                  <p className="shippingAddress_info">
                    {" "}
                    {item?.state}, {item?.pinCode}
                  </p>
                  {item?.landmark && (
                    <span className="shippingAddress_info">
                      landmark: {item?.landmark}
                    </span>
                  )}
                  <h4
                    className="shippingAddress_info"
                    style={{ margin: "5px 0px" }}
                  >
                    {item?.name}
                  </h4>
                  <span className="shippingAddress_info">
                    {item?.mobileNumber}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              <p className="shippingAddress_info">
                No address available please add new address for move further
              </p>
            </div>
          )}
        </div>

        <div className="shippingAddress_btn_container">
          <CustomButton
            text={"Continue"}
            className={"shippingAddress_btn"}
            onClick={submitAddress}
          />
        </div>
      </div>

      <AddressForm
        openAddressModal={openAddressModal}
        setOpenAddressModal={setOpenAddressModal}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
      />
    </>
  );
};

export default ShippingAddress;
