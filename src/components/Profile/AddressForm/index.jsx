import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// components
import './style.css';
import Modal from '../../../common/Modal';
import { addAddress, updateAddress } from '../../../redux/slices/UserSlice';
import axiosInstance from '../../../axios/AxiosInstance';
import Loading from '../../Loading';

const AddressForm = (props) => {
  const { showAddress, setShowAddress, userAddress, setUserAddress } = props;

  const dispatch = useDispatch();

  const [invalidPinCodeMessage, setInvalidPinCodeMessage] = useState(null);
  const [locality, setLocality] = useState([]);
  const [showLocalityList, setShowLocalityList] = useState(false);
  const [laodingForPinCode, setLoadingForPinCode] = useState(false);

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'pinCode') {
      setUserAddress({ ...userAddress, [name]: value });
      if (value.length == 6) {
        // updating state for show loading icon and blur form while fetching data based on pincode
        setLoadingForPinCode((prev) => !prev);

        // calling api for fetching data based on pincode
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        if (res.data[0].Status === 'Error') {
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
    // return console.log(type, userAddress);

    try {
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

      toast.success(res.data.msg);
    } catch (error) {
      if (error?.response?.data?.msg) {
        // console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
      } else {
        // console.log(error);
        toast.error(error?.message);
      }
    }

    setShowAddress({ type: '', show: false });
    setUserAddress({});
  };

  return (
    <>
      {laodingForPinCode && <Loading />}

      <Modal
        open={showAddress?.show}
        onClose={() => setShowAddress({ type: '', show: false })}
      >
        <form
          onSubmit={(e) => handleForm(e, showAddress.type)}
          className='address-form'
          style={{ filter: laodingForPinCode ? 'blur(1px)' : 'blur(0)' }}
        >
          <div className='address-form-delivery-tag'>
            <h2>Add New Address</h2>
          </div>
          <div className='address-form-box-part-II'>
            <div className='address-form-input-filed-box'>
              <div style={{ marginRight: '5px', width: '100%' }}>
                <h4 className='address-form-input-field-name'>Full Name</h4>
                <input
                  type='text'
                  value={userAddress.name || ''}
                  name='name'
                  className='address-form-input'
                  onChange={handleInput}
                  required
                />
              </div>

              <div style={{ width: '100%' }}>
                <h4 className='address-form-input-field-name'>Mobile Number</h4>
                <input
                  type='number'
                  value={userAddress.mobileNumber || ''}
                  name='mobileNumber'
                  className='address-form-input'
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <div className='address-form-input-filed-box'>
              <div style={{ marginRight: '5px', width: '100%' }}>
                <h4 className='address-form-input-field-name'>Pincode</h4>
                <input
                  type='text'
                  value={userAddress.pinCode || ''}
                  name='pinCode'
                  maxLength='6'
                  className='address-form-input'
                  onChange={handleInput}
                  required
                />
                {invalidPinCodeMessage && (
                  <span style={{ fontSize: '14px', color: 'red' }}>
                    *{invalidPinCodeMessage}
                  </span>
                )}
              </div>

              <div style={{ width: '100%' }}>
                <h4 className='address-form-input-field-name'>State</h4>
                <input
                  type='text'
                  value={userAddress.state || ''}
                  readOnly
                  className='address-form-input'
                  required
                />
              </div>
            </div>

            <div style={{ width: '100%' }}>
              <h4 className='address-form-input-field-name'>Address</h4>
              <input
                type='text'
                value={userAddress.address || ''}
                name='address'
                placeholder='House no. 101 Block no 32'
                className='address-form-input'
                onChange={handleInput}
                required
              />
            </div>

            <div className='address-form-input-filed-box'>
              <div
                style={{
                  marginRight: '5px',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <h4 className='address-form-input-field-name'>Locality</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type='text'
                    name='locality'
                    value={userAddress.locality || ''}
                    className='address-form-input'
                    onChange={(e) =>
                      setUserAddress({
                        ...userAddress,
                        locality: e.target.value,
                      })
                    }
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
                  <div className='address-form-show-locality-box'>
                    {/* <ul> */}
                    {locality.length > 0 &&
                      locality.map((value, index) => {
                        return (
                          <span
                            key={index}
                            className='address-form-show-locality'
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

              <div style={{ width: '100%' }}>
                <h4 className='address-form-input-field-name'>
                  City/District Town
                </h4>
                <input
                  type='text'
                  value={userAddress.cityDistrictTown || ''}
                  readOnly
                  className='address-form-input'
                  required
                />
              </div>
            </div>

            <div>
              <h4 className='address-form-input-field-name'>
                landmark <span style={{ fontSize: '15px' }}>(optional)</span>
              </h4>
              <input
                type='text'
                value={userAddress.landmark || ''}
                name='landmark'
                placeholder='Near Apolo Hospital'
                className='address-form-input'
                onChange={handleInput}
              />

              <h4 className='address-form-input-field-name'>
                Alternate Phone Number{' '}
                <span style={{ fontSize: '15px' }}>(optional)</span>
              </h4>
              <input
                type='text'
                value={userAddress.alternatePhone || ''}
                name='alternatePhone'
                className='address-form-input'
                onChange={handleInput}
              />
            </div>
          </div>
          <h4 className='address-form-input-field-name'>Addres Type</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{ marginRight: '2px' }}
                type='radio'
                checked={userAddress.addressType == 'home' && true}
                name='addressType'
                onChange={(e) =>
                  setUserAddress({ ...userAddress, [e.target.name]: 'home' })
                }
                required
              />
              <span>Home</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{ marginRight: '2px' }}
                type='radio'
                checked={userAddress.addressType == 'work' && true}
                name='addressType'
                onChange={(e) =>
                  setUserAddress({ ...userAddress, [e.target.name]: 'work' })
                }
                required
              />
              <span>Work</span>
            </div>
          </div>
          <div className='address-form-buttons'>
            <button
              className='address-form-buttton'
              id={invalidPinCodeMessage && 'disable-add-address-button'}
              disabled={invalidPinCodeMessage}
            >
              {showAddress.type}
            </button>
            <button
              className='address-form-buttton'
              onClick={() => {
                setUserAddress({});
                setShowAddress(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddressForm;
