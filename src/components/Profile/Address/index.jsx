import { useState, memo } from 'react';
import { FaRegAddressBook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// components
import './style.css';
import AddressForm from '../AddressForm';
import axiosInstance from '../../../axios/AxiosInstance';
import { deleteAddress } from '../../../redux/slices/UserSlice';
import CustomButton from '../../common/CustomButton';

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
      const res = await axiosInstance.delete(`/address/${_id}`);
      toast.success(res.data.msg);
      dispatch(deleteAddress(_id));
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  return (
    <div className="address-container">
      {addressDetails?.length === 0 ? (
        <div className="address-not-available-container">
          <FaRegAddressBook className="address-icon" />
          <div className="address-not-available-content">
            <h3 className="address-not-available-h3">
              You haven&apos;t Added any Addresses
            </h3>

            <CustomButton
              text={'Add Address'}
              className={'address-not-available-btn'}
              onClick={() =>
                setShowAddress({ type: 'Add Address', show: true })
              }
            />
          </div>
        </div>
      ) : (
        <div className="address-available-container">
          <div className="address-add-container">
            <h3 className="address-add-h3">Saved Addresses</h3>
            <CustomButton
              text={'Add Address'}
              className={'address-add-button'}
              onClick={() =>
                setShowAddress({ type: 'Add Address', show: true })
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
                <span className="address-detail">
                  {value.city_DistrictTown}
                </span>
                <span className="address-detail">
                  Landmark : {value.landmark}
                </span>
                <span className="address-person-mobile-no">
                  Phone no : {value.mobileNumber}
                </span>
                <div className="address-btn-container">
                  <CustomButton
                    text={'Edit'}
                    className={'address-edit-remove-button'}
                    onClick={() => {
                      setUserAddress(value);
                      setShowAddress({ type: 'Update Address', show: true });
                    }}
                  />
                  <CustomButton
                    text={'Remove'}
                    className={'address-edit-remove-button'}
                    onClick={() => removeAddressFnc(value._id)}
                  />
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

export default memo(Address);
