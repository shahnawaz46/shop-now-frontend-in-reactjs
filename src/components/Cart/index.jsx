import React, { useEffect } from "react";
import "./style.css";
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { giveMeImages } from "../../axios/UlrConfig";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../../redux/slices/CartSlice";

// action
// import { getCartItem, addToCart, removeCartMessage, removeCartItem } from '../../actions/CartAction';

const Cart = ({ show, setShow }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch()


  const itemIncrementFnc = (_id, size, sellingPrice) => {
    const product = { _id, size, qty: 1, sellingPrice };
    dispatch(addToCart(product));
  };

  const itemDecrementFnc = (_id, size, sellingPrice) => {
    const product = { _id, size, qty: -1,sellingPrice: -sellingPrice};
    dispatch(addToCart(product));
  };

  const deleteCartItemFnc = (_id, size) => {
    const product = { _id, size};
    dispatch(removeCartItem(product));
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

  // useEffect(() => {
  //     if (message)
  //         dispatch(getCartItem())

  //     if (message)
  //         dispatch(removeCartMessage())

  // }, [message])

  const PlaceOrderPageFunc = () => {
    if (user.authenticate) {
      History.push(`/place-order/Cart`);
    } else {
      History.push("/login");
    }
  };

  return (
    <div className={show ? "cart-box" : null}>
      <div className="cart-empyt-box" onClick={() => setShow(false)}></div>

      <div className={show ? "cart-main-box show-cart-box" : "cart-main-box"}>
        <div className="cart-first-box">
          <h2>Shop</h2>
          <IoMdClose
            onClick={() => setShow(false)}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        </div>

        <div className="cart-second-box">
          {cartItems?.length > 0 ? (
            cartItems.map((product, index) => {
              return (
                <div key={index} className="cart-image-product-details">
                  <img
                    src={giveMeImages(product.productImage)}
                    alt=""
                  />
                  <div className="cart-product-details">
                    <Link to={`/preview/${product._id}`}>
                      <h3 onClick={() => setShow(false)}>
                        {product.productName}
                      </h3>
                    </Link>
                    <h4>Size: {product.size}</h4>
                    <div className="cart-icons-div">
                      <div className="add-remove-icon">
                        <button
                          style={{
                            borderRight: "1px solid #e8e8e1",
                            cursor: "pointer",
                          }}
                          disabled={product.qty <= 1 ? true : false}
                          onClick={() =>
                            itemDecrementFnc(product._id, product.size, product.sellingPrice)
                          }
                        >
                          <IoMdRemove
                            className="cart-icons click"
                            style={{ fontSize: "16px" }}
                          />
                        </button>
                        <h4 className="cart-icons">{product.qty}</h4>
                        <button
                          style={{
                            borderLeft: "1px solid #e8e8e1",
                            cursor: "pointer",
                          }}
                          onClick={() => itemIncrementFnc(product._id, product.size, product.sellingPrice)}>
                          <IoMdAdd
                            className="cart-icons click"
                            style={{ fontSize: "16px" }}
                          />
                        </button>
                      </div>

                      <MdDelete
                        className="cart-icons click"
                        style={{ fontSize: "20px", cursor:'pointer' }}
                        onClick={() =>
                          deleteCartItemFnc(product._id, product.size)
                        }
                      />
                    </div>
                    <h4>Rs. {product.sellingPrice}</h4>
                  </div>
                </div>
              );
            })
          ) : (
            <span>No Item in Cart</span>
          )}
        </div>

        <div className="cart-third-box">
          <div className="cart-price">
            <h3>SUBTOTAL</h3>
            <h3>
              Rs. {cartItems?.length > 0 ? cartItems.reduce((total, item)=> total + (item.sellingPrice * item.qty), 0) : 0 }
            </h3>
          </div>
          <p>Shipping, taxes, and discounts calculated at checkout.</p>
          <button style={{cursor:'pointer'}}>Check out</button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
