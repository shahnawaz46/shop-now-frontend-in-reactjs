import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import './style.css';
import orderConfirmedGif from '../../../asset/order_confirmed.gif';

const OrderDone = () => {
  const { personalDetails } = useSelector((state) => state.user);

  return (
    <div className="orderDone_container">
      <div className="orderDone_msg">
        <h2>Order Successfull</h2>
        <img
          src={orderConfirmedGif}
          alt="order-confirmed"
          style={{ objectFit: 'contain', width: '100px' }}
        />
        <p>You will get notify to you {personalDetails?.email}</p>
        <Link to={'/my-account/orders'}>
          <button className="orderDone_btn">Your Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderDone;
