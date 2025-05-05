import { Link } from "react-router";

// components
import "./style.css";
import orderConfirmedGif from "../../../asset/order_confirmed.gif";
import CustomButton from "../../common/CustomButton";
import { useAppSelector } from "../../../redux/hooks";

const OrderDone = () => {
  const { personalDetails } = useAppSelector((state) => state.user);

  return (
    <div className="orderDone_container">
      <div className="orderDone_msg">
        <h2>Order Successfull</h2>
        <img
          src={orderConfirmedGif}
          alt="order-confirmed"
          style={{ objectFit: "contain", width: "100px" }}
        />
        <p>You will get notify to you {personalDetails?.email}</p>
        <Link to={"/my-account/orders"}>
          <CustomButton text={"Your Orders"} className={"orderDone_btn"} />
        </Link>
      </div>
    </div>
  );
};

export default OrderDone;
