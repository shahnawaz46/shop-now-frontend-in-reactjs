import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

// components
import "./style.css";
import axiosInstance from "../../../axios/AxiosInstance";
import { emptyCart } from "../../../redux/slices/CartSlice";
import CustomButton from "../../common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ICurrentOrder,
  IPlaceOrder,
} from "../../../types/interfaces/placeOrder.interface";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import { ScreenLoading } from "../../Loaders";

const Payment = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { personalDetails } = useAppSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] =
    useState<IPlaceOrder["paymentMethod"]>();

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmOrder = async () => {
    if (!paymentMethod) return toast.error("Please Choose Payment");

    setLoading(true);

    let orderDetails: ICurrentOrder;
    // if user buy product directly then i am sending data inside location state
    if (location.state?.productId) {
      const { addressId, productId, qty, size } = location.state;

      orderDetails = {
        addressId,
        paymentMethod,
        process: "direct", // for track order process(direct buy or checkout from cart)
        items: [{ product: productId, qty, size }],
      };
    } else {
      const { addressId } = location.state;
      orderDetails = {
        addressId,
        paymentMethod,
        process: "checkout", // for track order process(direct buy or checkout from cart)
        items: cartItems.map((item) => ({
          product: item._id,
          qty: item.qty,
          size: item.size,
        })),
      };
    }

    try {
      const createOrderRes = await axiosInstance.post("/order", orderDetails);

      setLoading(false);

      // if paymentMethod is cod then redirect to the order successful page
      if (paymentMethod === "cod") {
        navigate("/place-order?status=done", { replace: true });
      }

      // if paymentMethod is card then i am getting additional data from server(because i am using razorpay)
      else if (paymentMethod === "card") {
        await handleVerifyPayment(createOrderRes.data);
      }

      // if customer place order through cart then the cart will be emptied after a successful order.
      orderDetails?.process === "checkout" && dispatch(emptyCart());
    } catch (error) {
      handleAxiosError({ error });
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (orderRes: any) => {
    const options = {
      key: orderRes.key,
      amount: orderRes.amount,
      currency: "INR",
      name: "ShopNow",
      image:
        "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      order_id: orderRes.razorOrderId,
      handler: async (response: any) => {
        try {
          // Once the payment is processed, payment verification will be done in server.
          await axiosInstance.post(
            `/order/payment-verification/${orderRes.orderId}`,
            { ...response, process: orderRes?.process }
          );
          navigate("/place-order?status=done", { replace: true });
        } catch (error) {
          handleAxiosError({ error });
        }
      },
      // customer details
      prefill: {
        name: `${personalDetails?.firstName} ${personalDetails?.lastName}`,
        email: personalDetails?.email,
        contact: personalDetails?.phoneNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // creating razorPay instance for open payment channel
    const razorPay = new window.Razorpay(options);
    razorPay.open();

    razorPay.on(
      "payment.failed",
      async (response: {
        error: { metadata: { order_id: any; payment_id: any } };
      }) => {
        // console.log("payment failed callback");
        try {
          await axiosInstance.post("/order/payment-failed", {
            orderId: orderRes.orderId,
            razorpay_order_id: response?.error?.metadata?.order_id,
            razorpay_payment_id: response?.error?.metadata?.payment_id,
          });
          toast.error("Payment failed please try again");
          // razorPay.close();
        } catch (error) {
          handleAxiosError({ error });
        }
      }
    );
  };

  return (
    <>
      <script
        async={true}
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></script>

      <div className="payment_container">
        {loading && (
          <ScreenLoading
            position="absolute"
            backgroundColor="rgba(0,0,0,0.5)"
          />
        )}

        <h2>Payment Methods</h2>
        <div className="payment_method_container">
          <span>Choose One</span>
          <div className="payment_method">
            <input
              type="radio"
              name="payment_method"
              id="cash_payment"
              onChange={() => setPaymentMethod("cod")}
            />
            <label htmlFor="cash_payment">Cash on Delivery</label>
          </div>
          <div className="payment_method">
            <input
              type="radio"
              name="payment_method"
              id="card_payment"
              onChange={() => setPaymentMethod("card")}
            />
            <label htmlFor="card_payment">Card Payment</label>
          </div>
        </div>
        <div className="payment_placeOrder_btn_container">
          <CustomButton
            text={"Order Now"}
            className={"payment_placeOrder_btn"}
            onClick={handleConfirmOrder}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
