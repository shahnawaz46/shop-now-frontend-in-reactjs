import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

// components
import './style.css';
import axiosInstance from '../../../axios/AxiosInstance';
import { emptyCart } from '../../../redux/slices/CartSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (!paymentMethod) return toast.error('Please Choose Payment');
    // return console.log('handleConfirmOrder', location.state, paymentMethod);

    let orderDetails = {};
    if (location.state?.productId) {
      const { addressId, price, productId, qty, size, totalPrice } =
        location.state;

      orderDetails = {
        addressId,
        totalPrice,
        items: [{ product: productId, qty, size, price }],
        paymentMethod,
      };
    } else {
      const { addressId, totalPrice } = location.state;
      orderDetails = {
        addressId,
        items: cartItems.map((item) => ({
          product: item._id,
          qty: item.qty,
          size: item.size,
          price: item.sellingPrice,
          paymentMethod,
        })),
        totalPrice,
      };
    }

    try {
      const res = await axiosInstance.post('/user/addOrder', orderDetails);
      toast.success(res.data.msg);
      dispatch(emptyCart());
      navigate('/place-order?status=done');
    } catch (err) {
      toast.error(err?.resonse?.data?.error || err?.message);
    }
  };

  return (
    <div className='payment_container'>
      <h2>Payment Methods</h2>
      <div className='payment_method_container'>
        <span>Choose One</span>
        <div className='payment_method'>
          <input
            type='radio'
            name='payment_method'
            id='cash_payment'
            onChange={(e) => setPaymentMethod('cod')}
          />
          <label htmlFor='cash_payment'>Cash on Delivery</label>
        </div>
        <div className='payment_method'>
          <input
            type='radio'
            name='payment_method'
            id='card_payment'
            onChange={(e) => setPaymentMethod('card')}
          />
          <label htmlFor='card_payment'>Card Payment</label>
        </div>
      </div>
      <div className='payment_placeOrder_btn'>
        <button onClick={handleConfirmOrder}>Order Now</button>
      </div>
    </div>
  );
};

export default Payment;
