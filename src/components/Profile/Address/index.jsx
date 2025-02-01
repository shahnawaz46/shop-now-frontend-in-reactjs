import React, { useState } from 'react';
import { FaRegAddressBook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// components
import './style.css';
import AddressForm from '../AddressForm';
import axiosInstance from '../../../axios/AxiosInstance';
import { deleteAddress } from '../../../redux/slices/UserSlice';

const initialState = {
  name: '',
  mobileNumber: '',
  pinCode: '',
  state: '',
  cityDistrictTown: '',
  address: '',
  locality: '',
  landmark: '',
  alternatePhone: '',
  addressType: '',
};

export const AddressType = {
  name: 'Full Name',
  mobileNumber: 'Mobile Number',
  pinCode: 'Pin Code',
  state: 'State',
  cityDistrictTown: 'City/District Town',
  address: 'Address',
  locality: 'Locality',
  landmark: 'Landmark',
  alternatePhone: 'Alternate Mobile Number',
  addressType: 'Address Type',
};

const Address = () => {
  const dispatch = useDispatch();
  const { addressDetails } = useSelector((state) => state.user);

  const [showAddress, setShowAddress] = useState({ type: '', show: false });
  const [userAddress, setUserAddress] = useState(initialState);

  const removeAddressFnc = async (_id) => {
    try {
      const res = await axiosInstance.delete(`/user/deleteAddress/${_id}`);
      toast.success(res.data.msg);
      dispatch(deleteAddress(_id));
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  return (
    <div className="address_container">
      {addressDetails?.length === 0 ? (
        <div className="address_not_available_container">
          <FaRegAddressBook className="address_icon" />
          <div className="address_not_available_content">
            <h3>You haven't Added any Addresses</h3>
            <button
              onClick={() =>
                setShowAddress({ type: 'Add Address', show: true })
              }
              className="address_not_available_btn"
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div className="address_available_container">
          <div className="address_add_container">
            <h3>Saved Addresses</h3>
            <button
              onClick={() =>
                setShowAddress({ type: 'Add Address', show: true })
              }
              className="address_add_button"
            >
              Add Address
            </button>
          </div>
          <div className="address_details_container">
            {addressDetails?.map((value, index) => (
              <div key={index} className="address_details">
                <span className="address_user_name">{value.name}</span>
                <span className="address_detail">{value.address}</span>
                <span className="address_detail">
                  {value.state} - {value.pinCode}
                </span>
                <span className="address_detail">
                  {value.city_DistrictTown}
                </span>
                <span className="address_detail">
                  Landmark : {value.landmark}
                </span>
                <span className="address-person-mobile-no">
                  Phone no : {value.mobileNumber}
                </span>
                <div className="address-edit-remove-button">
                  <button
                    style={{ marginRight: '5px' }}
                    onClick={() => {
                      setUserAddress(value);
                      setShowAddress({ type: 'Update Address', show: true });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: '5px' }}
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
      {showAddress?.show && (
        <AddressForm
          showAddress={showAddress}
          setShowAddress={setShowAddress}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
      )}
    </div>
  );
};

export default React.memo(Address);
