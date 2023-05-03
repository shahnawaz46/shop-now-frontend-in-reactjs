import React, { useEffect, useState } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

// components
import "./style.css";
import AddressForm from '../AddressForm'
import { fetchAddress } from "../../../redux/slices/AddressSlice";
import ShowError from "../../ShowError";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/AxiosInstance";
import { updateAddress } from "../../../redux/slices/AddressSlice";

const Address = () => {
  const dispatch = useDispatch()
  const { status, addressDetails, error } = useSelector((state) => state.address)
  console.log(addressDetails)

  const [showAddress, setShowAddress] = useState({type:'', show: false});
  const [userAddress, setUserAddress] = useState({});

  const removeAddressFnc = async (_id) => {
      try{
        const res = await axiosInstance.delete(`/user/deleteAddress/${_id}`)
        toast.success(res.data.msg)
        dispatch(updateAddress(res.data.address))

      }catch(error){
        if(error?.response?.data?.msg){
          toast.error(error?.response?.data?.msg)

        }else{
          toast.error(error?.message)
        }
      }
  }

  useEffect(()=>{
    if(status === 'idle') dispatch(fetchAddress())
  },[])

  if(status === 'failed'){
    return <ShowError message={error} />;
  }

  return (
    <div className="address-main-box">
      {addressDetails?.length === 0 ? (
        <div className="address-not-available">
          <FaRegAddressBook className="address-icon" />
          <div className="address-not-available-content">
            <h3>You haven't Added any Addresses</h3>
            <button
              onClick={() => setShowAddress({type:'Add Address', show: true})}
              className="address-add-button-1"
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div className="address-available-box">
          <div className="address-add-button-box">
            <h3>Saved Addresses</h3>
            <button
              onClick={() => setShowAddress({type:'Add Address',show: true})}
              className="address-add-button-2"
            >
              Add Address
            </button>
          </div>
          <div className="address-available">
            {addressDetails?.map((value, index) => (
              <div key={index} className="address-data-show">
                <span className="address-person-name">{value.name}</span>
                <span className="address-detail">{value.address}</span>
                <span className="address-detail">
                  {value.state} - {value.pinCode}
                </span>
                <span className="address-detail">
                  {value.city_DistrictTown}
                </span>
                <span className="address-detail">
                  Landmark : {value.landmark}
                </span>
                <span className="address-person-mobile-no">
                  Phone no : {value.mobileNumber}
                </span>
                <div className="address-edit-remove-button">
                  <button
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      setUserAddress(value);
                      setShowAddress({type:'Update Address',show: true});
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => removeAddressFnc(value._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {
        showAddress?.show && <AddressForm showAddress={showAddress} setShowAddress={setShowAddress} userAddress={userAddress} setUserAddress={setUserAddress} />
      }
    </div>
  );
};

export default React.memo(Address);
