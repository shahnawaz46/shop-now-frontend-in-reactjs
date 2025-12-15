import { useEffect } from "react";
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";

// components
import "./style.css";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../../redux/slices/CartSlice";
import CustomButton from "../common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  ICartItem,
  IProductSizes,
  IUpdateCartItem,
} from "../../types/interfaces/product.interface";

interface ICartProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = ({ show, setShow }: ICartProps) => {
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const itemIncrementFnc = (product: ICartItem) => {
    const item: IUpdateCartItem = {
      productId: product.productId,
      size: product.size,
      qty: 1,
    };
    dispatch(incrementCartItem(item));
  };

  const itemDecrementFnc = (product: ICartItem) => {
    const item: IUpdateCartItem = {
      productId: product.productId,
      size: product.size,
      qty: -1,
    };
    dispatch(decrementCartItem(item));
  };

  const deleteCartItemFnc = (productId: string, size: keyof IProductSizes) => {
    const product = { productId, size };
    dispatch(removeCartItem(product));
  };

  const PlaceOrderPageFunc = () => {
    setShow(false);
    if (user && Object.keys(user).length > 0) {
      navigate(`/place-order?step=1`);
    } else {
      navigate("/account/login", { state: { from: location.pathname } });
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 769) {
        document.body.style.paddingRight = "16px";
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [show]);

  // calculating total price
  const totalPrice =
    cartItems?.length > 0
      ? cartItems.reduce(
          (total, item) => total + item.sellingPrice * item.qty,
          0
        )
      : 0;

  return (
    <div className={show ? "cart-container" : ""}>
      <div className="cart-left-container" onClick={() => setShow(false)}></div>

      <div
        className={
          show ? "cart-right-container show-cart" : "cart-right-container"
        }
      >
        <div className="cart-header">
          <h2>Shop</h2>
          <IoMdClose
            onClick={() => setShow(false)}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div className="cart-product-container">
          {cartItems?.length > 0 ? (
            cartItems.map((product, index) => {
              return (
                <div key={index} className="cart-product-details">
                  <div className="cart-product-left">
                    <img src={product.productImage} alt="" />
                  </div>

                  <div className="cart-product-right">
                    <Link to={`/preview/${product.productId}`}>
                      <h3 onClick={() => setShow(false)}>
                        {product.productName}
                      </h3>
                    </Link>

                    <div className="cart-product-size">
                      <span>Size: {product.size}</span>
                    </div>

                    {/* add and remove icon */}
                    <div className="cart-icons-container">
                      <div className="cart-icons">
                        <button
                          style={{
                            borderRight: "1px solid #e8e8e1",
                            cursor: "pointer",
                          }}
                          disabled={product.qty <= 1 ? true : false}
                          onClick={() => itemDecrementFnc(product)}
                          aria-label="remove"
                        >
                          <IoMdRemove
                            className="click"
                            style={{ fontSize: "16px" }}
                          />
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
                          <IoMdAdd
                            className="click"
                            style={{ fontSize: "16px" }}
                          />
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

                    <div className="cart-product-selling-price">
                      <span>Rs. {product.sellingPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
              No Item in Cart
            </span>
          )}
        </div>

        <div className="cart-footer-container">
          <div className="cart-price">
            <span>SUBTOTAL</span>
            <span>Rs. {totalPrice}</span>
          </div>

          <p>Shipping, taxes, and discounts calculated at checkout.</p>

          {/* <button
            style={{
              cursor: cartItems.length ? 'pointer' : 'default',
              color: cartItems.length ? '#fff' : '#878787',
            }}
            disabled={!cartItems.length}
            onClick={PlaceOrderPageFunc}
          >
            Check out
          </button> */}

          <CustomButton
            text={"Check out"}
            disabled={!cartItems.length}
            className={`cart-product-checkout ${
              cartItems.length ? "active" : ""
            }`}
            onClick={PlaceOrderPageFunc}
          />
        </div>
      </div>
    </div>
  );
};
export default Cart;
