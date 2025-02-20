import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import './style.css';
import AddressForm from '../../Profile/AddressForm';
import axiosInstance from '../../../axios/AxiosInstance';
import { updateAddress } from '../../../redux/slices/UserSlice';

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
                className="shippingAddress_card"
                style={{
                  backgroundColor:
                    selectedAddressId === item?._id
                      ? 'rgb(208 227 251)'
                      : '#fff',
                  border:
                    selectedAddressId === item?._id
                      ? '2px solid #60A5FA'
                      : '1px solid #e8e8e1',
                }}
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
                    style={{ textTransform: 'uppercase', fontWeight: '500' }}
                  >
                    {item?.addressType}
                  </span>
                  <MdDelete onClick={() => removeAddress(item._id)} />
                </div>
                <div style={{ marginTop: '5px' }}>
                  <p>
                    {item?.address}, {item?.locality}, {item?.cityDistrictTown},
                  </p>
                  <p>
                    {' '}
                    {item?.state}, {item?.pinCode}
                  </p>
                  {item?.landmark && <span>landmark: {item?.landmark}</span>}
                  <h4 style={{ margin: '5px 0px' }}>{item?.name}</h4>
                  <span>{item?.mobileNumber}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p>
                No address available please add new address for move further
              </p>
            </div>
          )}
        </div>

        <div className="shippingAddress_btn">
          <button onClick={submitAddress}>Continue</button>
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
