import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

// components
import "./style.css";
import axiosInstance from "../../../axios/AxiosInstance";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../../../redux/slices/CartSlice";
import { ScreenLoading } from "../../Loaders";
import CustomButton from "../../common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ICartItem,
  IProductSizes,
  IUpdateCartItem,
} from "../../../types/interfaces/product.interface";

export const DELIVERY_CHARGE = 200;

const OrderSummary = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const location = useLocation();
  const navigate = useNavigate();

  const [allOrders, setAllOrder] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const productIDRef = useRef(null);

  // if productIDRef available that means user is directly buying the product otherwise user clicked on checkout from cart
  const itemIncrementFnc = (product: ICartItem) => {
    if (productIDRef.current) {
      setAllOrder((prev) => [{ ...prev[0], qty: prev[0].qty + 1 }]);
    } else {
      const item: IUpdateCartItem = {
        productId: product.productId,
        size: product.size,
        qty: 1,
      };
      dispatch(incrementCartItem(item));
    }
  };

  const itemDecrementFnc = (product: ICartItem) => {
    if (productIDRef.current) {
      setAllOrder((prev) => [{ ...prev[0], qty: prev[0].qty - 1 }]);
    } else {
      const item: IUpdateCartItem = {
        productId: product.productId,
        size: product.size,
        qty: -1,
      };
      dispatch(decrementCartItem(item));
    }
  };

  const deleteCartItemFnc = (productId: string, size: keyof IProductSizes) => {
    if (productIDRef.current) {
      setAllOrder([]);
    } else {
      const product = { productId, size };
      dispatch(removeCartItem(product));
    }
  };

  // calculating total price
  const totalPrice =
    allOrders?.length > 0
      ? allOrders.reduce(
          (total, item) => total + item.sellingPrice * item.qty,
          0
        ) + DELIVERY_CHARGE
      : 0;

  const handleOrderSummary = () => {
    if (allOrders.length === 0)
      return toast.error("No product available, first select product");

    // if productId is present thats mean user
    productIDRef.current
      ? navigate("/place-order?step=3", {
          state: { ...location.state, qty: allOrders[0].qty },
        })
      : navigate("/place-order?step=3", {
          state: { ...location.state },
        });
  };

  const fetchProduct = async (productId: string) => {
    const res = await axiosInstance.get(
      `/product/single/checkout/${productId}`
    );

    setAllOrder([
      {
        productId: res?.data?.product?._id,
        productName: res?.data?.product?.productName,
        sellingPrice: res?.data?.product?.sellingPrice,
        productImage: res?.data?.product?.productPictures[1]?.img,
        size: location.state?.size,
        qty: 1,
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    // store productId from 'location state' to productIDRef, to indentify that
    // if user is directly buying the product then location state have productID
    // otherwise if user is coming from checkout (cart) then there is no productId is present in 'location state'
    productIDRef.current = location.state?.productId;
    if (productIDRef.current) {
      fetchProduct(productIDRef.current);
    } else {
      setAllOrder(cartItems);
      setLoading(false);
    }
  }, [cartItems]);

  if (loading) {
    return <ScreenLoading />;
  }

  return (
    <>
      <div className="orderSummary_container">
        <div className="orderSummary_left_card">
          <h2>Your Order Summary</h2>

          <div className="orderSummary_card_container">
            {allOrders?.length > 0 ? (
              allOrders.map((product) => {
                return (
                  <div key={product.productId} className="orderSummary_card">
                    <img src={product.productImage} alt="" />
                    <div className="orderSummary_product_details">
                      <h3>{product.productName}</h3>

                      <p>Size: {product.size}</p>
                      <div className="orderSummary_product_count">
                        <div className="orderSummary_product_add_remove">
                          <button
                            style={{
                              borderRight: "1px solid #e8e8e1",
                              cursor: "pointer",
                            }}
                            disabled={product.qty <= 1 ? true : false}
                            onClick={() => itemDecrementFnc(product)}
                            aria-label="remove"
                          >
                            <IoMdRemove style={{ fontSize: "16px" }} />
                          </button>
                          <span>{product.qty}</span>
                          <button
                            style={{
                              borderLeft: "1px solid #e8e8e1",
                              cursor: "pointer",
                            }}
                            onClick={() => itemIncrementFnc(product)}
                            aria-label="add"
                          >
                            <IoMdAdd style={{ fontSize: "16px" }} />
                          </button>
                        </div>

                        <MdDelete
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "var(--text-primary)",
                          }}
                          onClick={() =>
                            deleteCartItemFnc(product.productId, product.size)
                          }
                        />
                      </div>
                      <p>Rs. {product.sellingPrice}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span
                  style={{ fontSize: "1.125rem", color: "var(--text-primary)" }}
                >
                  No Product Available
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="orderSummary_right_card">
          <h2>Price Details</h2>

          <div className="orderSummary_item_price">
            <div>
              <span>
                Price (
                {allOrders?.length > 0
                  ? allOrders.reduce((total, item) => total + item.qty, 0)
                  : 0}{" "}
                items)
              </span>
              <span>
                Rs.{" "}
                {allOrders?.length > 0
                  ? allOrders.reduce(
                      (total, item) => total + item.sellingPrice * item.qty,
                      0
                    )
                  : 0}
              </span>
            </div>
            <div>
              <span>Delivery Charges</span>
              <span>Rs. {DELIVERY_CHARGE}</span>
            </div>
          </div>

          <div className="orderSummary_total_price">
            <span>Total Payable</span>
            <span>Rs. {totalPrice}</span>
          </div>

          <p className="orderSummary_message">
            Delivery fee and taxes (if applicable) to be calculating during
            order summary
          </p>

          <div className="orderSummary_btn_container">
            <CustomButton
              text={"Continue"}
              className={"orderSummary_btn"}
              onClick={handleOrderSummary}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
