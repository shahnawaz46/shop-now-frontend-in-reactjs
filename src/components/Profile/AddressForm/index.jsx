import React, { useState } from 'react';
import axios from 'axios';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

// components
import './style.css';
import Modal from '../../common/Modal';
import { addAddress, updateAddress } from '../../../redux/slices/UserSlice';
import axiosInstance from '../../../axios/AxiosInstance';
import FormTitle from '../../common/FormTitle';
import { AddressType } from '../Address';
import { API_STATUS } from '../../../utils/Constants';
import { ScreenLoading } from '../../Loaders';

const AddressForm = (props) => {
  const { showAddress, setShowAddress, userAddress, setUserAddress } = props;

  const dispatch = useDispatch();

  const [invalidPinCodeMessage, setInvalidPinCodeMessage] = useState(null);
  const [locality, setLocality] = useState([]);
  const [showLocalityList, setShowLocalityList] = useState(false);
  const [laodingForPinCode, setLoadingForPinCode] = useState(false);
  const [status, setStatus] = useState(API_STATUS.IDLE);

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'pinCode') {
      setUserAddress({ ...userAddress, [name]: value });
      if (value.length === 6) {
        // updating state for show loading icon and blur form while fetching data based on pincode
        setLoadingForPinCode((prev) => !prev);

        // calling api for fetching data based on pincode
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        if (res.data[0].Status === 'Error' || res.data[0].Status === '404') {
          setInvalidPinCodeMessage('Invalid Pin Code');
          setLocality([]);
        } else {
          const postOffice = res.data[0].PostOffice[0];
          setUserAddress({
            ...userAddress,
            [name]: value,
            state: postOffice.State,
            cityDistrictTown: postOffice.District,
          });
          setLocality(res.data[0].PostOffice.map((value) => value.Name));
          setInvalidPinCodeMessage(null);
        }
        setLoadingForPinCode((prev) => !prev);
      }
    } else {
      setUserAddress({ ...userAddress, [name]: value });
    }
  };

  const handleForm = async (e, type) => {
    e.preventDefault();
    const { landmark, alternatePhone, __v, ...rest } = userAddress;

    // validation
    for (let key in rest) {
      if (!rest[key]) {
        toast.error(`${AddressType[key]} is required`);
        return;
      }
    }

    try {
      setStatus(API_STATUS.LOADING);
      let res;
      if (type === 'Update Address') {
        res = await axiosInstance.patch('/user/updateAddress', {
          ...userAddress,
        });
        dispatch(updateAddress(res.data.address));
      } else {
        res = await axiosInstance.post('/user/addAddress', { ...userAddress });
        dispatch(addAddress(res.data.address));
      }

      setShowAddress({ type: '', show: false });
      setUserAddress({});

      toast.success(res.data.msg);
      setStatus(API_STATUS.SUCCESS);
    } catch (error) {
      setStatus(API_STATUS.FAILED);
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  return (
    <>
      {status === API_STATUS.LOADING && (
        <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />
      )}

      <Modal
        open={showAddress?.show}
        // onClose={() => setShowAddress({ type: '', show: false })}
      >
        <div
          // onSubmit={(e) => handleForm(e, showAddress.type)}
          className="address-form"
          // style={{ filter: laodingForPinCode ? 'blur(0.5px)' : 'blur(0)' }}
        >
          <FormTitle
            text={'Add New Address'}
            flexDirection="row"
            justifyContent="space-between"
          >
            <IoClose
              style={{ fontSize: '1.25rem', cursor: 'pointer' }}
              onClick={() => setShowAddress({ type: '', show: false })}
            />
          </FormTitle>

          <form>
            <div className="input-flex">
              <div className="input-container input-container-address width-50">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userAddress.name || ''}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="input-container input-container-address width-50">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="number"
                  value={userAddress.mobileNumber || ''}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <div className="input-flex">
              <div className="input-container input-container-address width-50">
                <label htmlFor="pinCode">Pincode</label>

                <input
                  id="pinCode"
                  name="pinCode"
                  type="text"
                  value={userAddress.pinCode || ''}
                  maxLength="6"
                  onChange={handleInput}
                  required
                />
                {invalidPinCodeMessage && (
                  <span style={{ fontSize: '14px', color: 'red' }}>
                    *{invalidPinCodeMessage}
                  </span>
                )}
              </div>

              <div className="input-container input-container-address width-50">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  value={userAddress.state || ''}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="input-container input-container-address">
              <label htmlFor="" className="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={userAddress.address || ''}
                placeholder="House no. 101 Block no 32"
                onChange={handleInput}
                required
              />
            </div>

            <div className="input-flex">
              <div className="input-container input-container-address width-50">
                <label htmlFor="" className="locality">
                  Locality
                </label>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="locality"
                    name="locality"
                    type="text"
                    value={userAddress.locality || ''}
                    onChange={handleInput}
                    required
                  />
                  {showLocalityList ? (
                    <MdKeyboardArrowUp
                      onClick={() => setShowLocalityList(false)}
                      style={{ marginLeft: '-18px' }}
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      onClick={() => setShowLocalityList(true)}
                      style={{ marginLeft: '-18px' }}
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
                <label htmlFor="City">City/District Town</label>
                <input
                  id="City"
                  type="text"
                  value={userAddress.cityDistrictTown || ''}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="input-container input-container-address">
              <label htmlFor="landmark">
                Landmark <span style={{ fontSize: '15px' }}>(optional)</span>
              </label>
              <input
                id="landmark"
                name="landmark"
                type="text"
                value={userAddress.landmark || ''}
                placeholder="Near Apolo Hospital"
                onChange={handleInput}
              />
            </div>

            <div className="input-container input-container-address">
              <label htmlFor="alternatePhone">
                Alternate Phone Number{' '}
                <span style={{ fontSize: '15px' }}>(optional)</span>
              </label>
              <input
                id="alternatePhone"
                name="alternatePhone"
                type="text"
                value={userAddress.alternatePhone || ''}
                onChange={handleInput}
              />
            </div>

            <div className="input-container input-container-address">
              <label>Addres Type</label>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    style={{ marginRight: '2px' }}
                    type="radio"
                    checked={userAddress.addressType === 'home' && true}
                    name="addressType"
                    onChange={(e) =>
                      setUserAddress({
                        ...userAddress,
                        [e.target.name]: 'home',
                      })
                    }
                    required
                  />
                  <span>Home</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    style={{ marginRight: '2px' }}
                    type="radio"
                    checked={userAddress.addressType === 'work' && true}
                    name="addressType"
                    onChange={(e) =>
                      setUserAddress({
                        ...userAddress,
                        [e.target.name]: 'work',
                      })
                    }
                    required
                  />
                  <span>Work</span>
                </div>
              </div>
            </div>

            <div className="address-form-buttons">
              <button
                className="address-form-buttton"
                id={invalidPinCodeMessage && 'disable-add-address-button'}
                disabled={invalidPinCodeMessage}
                onClick={(e) => handleForm(e, showAddress.type)}
              >
                {showAddress.type}
              </button>
              <button
                className="address-form-buttton"
                onClick={() => {
                  setUserAddress({});
                  setShowAddress(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddressForm;
