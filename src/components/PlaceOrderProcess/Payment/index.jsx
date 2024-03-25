import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

// components
import './style.css';
import axiosInstance from '../../../axios/AxiosInstance';
import { emptyCart } from '../../../redux/slices/CartSlice';
import { apiUrl } from '../../../axios/UlrConfig';

const Payment = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { personalDetails } = useSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (!paymentMethod) return toast.error('Please Choose Payment');

    let orderDetails = {};
    if (location.state?.productId) {
      const { addressId, price, productId, qty, size, totalPrice } =
        location.state;

      orderDetails = {
        addressId,
        totalPrice,
        items: [{ product: productId, qty, size, price }],
        paymentMethod,
        process: 'direct', // for track order process(direct buy or checkout from cart)
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
        })),
        paymentMethod,
        process: 'checkout', // for track order process(direct buy or checkout from cart)
        totalPrice,
      };
    }

    try {
      const createOrderRes = await axiosInstance.post(
        '/user/createOrder',
        orderDetails
      );
      // if paymentMethod is cod then redirect to the order successful page
      if (paymentMethod === 'cod') {
        navigate('/place-order?status=done', { replace: true });
      }
      // if paymentMethod is card then i am getting additional data from server(because i am using razorpay)
      else if (paymentMethod === 'card') {
        const options = {
          key: createOrderRes.data.key,
          amount: createOrderRes.data.amount,
          currency: 'INR',
          name: 'ShopNow',
          image:
            'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          order_id: createOrderRes.data.razorOrderId,
          // callback_url: `${apiUrl}/user/paymentVerification/${res.data.orderId}`,
          handler: async (response) => {
            try {
              // Once the payment is processed, payment verification will be done in server.
              await axiosInstance.post(
                `/user/paymentVerification/${createOrderRes.data.orderId}`,
                { ...response, process: createOrderRes?.data?.process }
              );
              navigate('/place-order?status=done', { replace: true });
            } catch (err) {
              toast.error('Payment Failed');
              // console.log(err)
            }
          },
          // customer details
          prefill: {
            name: `${personalDetails?.firstName} ${personalDetails?.lastName}`,
            email: personalDetails?.email,
            contact: personalDetails?.phoneNo,
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };

        // creating razorPay instance for open payment channel
        const razorPay = new window.Razorpay(options);
        razorPay.open();
        razorPay.on('payment.failed', async (response) => {
          try {
            await axiosInstance.post('/user/paymentFailed', {
              orderId: createOrderRes.data.orderId,
              razorpay_order_id: response?.error?.metadata?.order_id,
              razorpay_payment_id: response?.error?.metadata?.payment_id,
            });
            toast.error('Payment failed please try again');
            // razorPay.close();
          } catch (err) {
            toast.error(err?.response?.error?.msg || err?.message);
          }
        });
      }

      // if customer place order through cart then the cart will be emptied after a successful order.
      orderDetails.process === 'checkout' && dispatch(emptyCart());
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
