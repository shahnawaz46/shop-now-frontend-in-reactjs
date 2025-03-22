import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router';

// components
import './style.css';
import AddressForm from '../../Profile/AddressForm';
import axiosInstance from '../../../axios/AxiosInstance';
import { updateAddress } from '../../../redux/slices/UserSlice';
import CustomButton from '../../common/CustomButton';

const ShippingAddress = () => {
  const dispatch = useDispatch();

  const { addressDetails } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addNewAddress, setAddNewAddress] = useState({
    type: 'Add Address',
    show: false,
  });
  const [userAddress, setUserAddress] = useState({});

  const removeAddress = async (_id) => {
    try {
      const res = await axiosInstance.delete(`/address/${_id}`);
      toast.success(res.data.msg);
      dispatch(updateAddress(res.data.address));
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  const submitAddress = () => {
    if (!selectedAddressId)
      return toast.error('Please Select Shipping Address');

    navigate('/place-order?step=2', {
      state: { ...location.state, addressId: selectedAddressId },
    });
  };

  return (
    <>
      <div className="shippingAddress_container">
        <h2>Shipping Address</h2>
        <div
          className="shippingAddress_newaddress"
          onClick={() => setAddNewAddress({ type: 'Add Address', show: true })}
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
                    ? 'shippingAddress_active'
                    : ''
                }`}
                onClick={() => setSelectedAddressId(item._id)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: '500',
                    }}
                    className="shippingAddress_info"
                  >
                    {item?.addressType}
                  </span>
                  <MdDelete
                    onClick={() => removeAddress(item._id)}
                    className="shippingAddress_info"
                  />
                </div>
                <div style={{ marginTop: '5px' }}>
                  <p className="shippingAddress_info">
                    {item?.address}, {item?.locality}, {item?.cityDistrictTown},
                  </p>
                  <p className="shippingAddress_info">
                    {' '}
                    {item?.state}, {item?.pinCode}
                  </p>
                  {item?.landmark && (
                    <span className="shippingAddress_info">
                      landmark: {item?.landmark}
                    </span>
                  )}
                  <h4
                    className="shippingAddress_info"
                    style={{ margin: '5px 0px' }}
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
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p className="shippingAddress_info">
                No address available please add new address for move further
              </p>
            </div>
          )}
        </div>

        <div className="shippingAddress_btn_container">
          <CustomButton
            text={'Continue'}
            className={'shippingAddress_btn'}
            onClick={submitAddress}
          />
        </div>
      </div>

      <AddressForm
        showAddress={addNewAddress}
        setShowAddress={setAddNewAddress}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
      />
    </>
  );
};

export default ShippingAddress;
