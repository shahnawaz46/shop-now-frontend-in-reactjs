import React, { useEffect } from 'react';
import '../css/Cart.css';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { giveMeImages } from '../../axios/UlrConfig';
import { useHistory } from 'react-router-dom'

// action
import { getCartItem, addToCart, removeCartMessage, removeCartItem } from '../../actions/CartAction';

const Cart = ({ show, setShow }) => {
    const { allCartItem, message } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.user)
    const History = useHistory()

    const itemIncrementFnc = (productId, size) => {
        const product = [{ productId, size, qty: 1 }]
        dispatch(addToCart(product))
    }

    const itemDecrementFnc = (productId, size) => {
        const product = [{ productId, size, qty: -1 }]
        dispatch(addToCart(product))
    }

    const deleteCartItemFnc = (productId, size) => {
        dispatch(removeCartItem(productId, size))
    }

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            if (window.innerWidth > 769) {
                document.body.style.paddingRight = '16px';
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
    }, [show])

    useEffect(() => {
        if (message)
            dispatch(getCartItem())

        if (message)
            dispatch(removeCartMessage())

    }, [message])

    const PlaceOrderPageFunc = () => {
        if(user.authenticate){
            History.push(`/place-order/Cart`)
        }else{
            History.push("/login")
        }
    }

    return (
        <div className={show ? "cart-box" : null}>
            <div className="cart-empyt-box" onClick={() => setShow(false)}>
            </div>

            <div className={show ? "cart-main-box show-cart-box" : "cart-main-box"}>
                <div className="cart-first-box">
                    <h2>Shop</h2>
                    <CloseIcon onClick={() => setShow(false)} />
                </div>

                <div className="cart-second-box">
                    {
                        allCartItem?.length > 0 ?
                            allCartItem.map((value, index) => {
                                return (
                                    <div key={index} className="cart-image-product-details">
                                        <img src={giveMeImages(value.productId.productPictures[0].img)} alt="" />
                                        <div className="cart-product-details">

                                            <Link to={`/preview/${value.productId._id}`} ><h3 onClick={() => setShow(false)}>{value.productId.productName}</h3></Link>
                                            <h4>Size: {value.size}</h4>
                                            <div className="cart-icons-div">
                                                <div className="add-remove-icon">
                                                    <button style={{ borderRight: '1px solid #e8e8e1', cursor: 'pointer' }} onClick={() => itemDecrementFnc(value.productId._id, value.size)} >
                                                        <RemoveIcon className="cart-icons click" style={{ fontSize: '16px' }} />
                                                    </button>
                                                    <h4 className="cart-icons">{value.qty}</h4>
                                                    <button style={{ borderLeft: '1px solid #e8e8e1', cursor: 'pointer' }} onClick={() => itemIncrementFnc(value.productId._id, value.size)} >
                                                        <AddIcon className="cart-icons click" style={{ fontSize: '16px' }} />
                                                    </button>
                                                </div>

                                                <DeleteIcon className="cart-icons click" style={{ fontSize: '20px' }} onClick={() => deleteCartItemFnc(value.productId._id, value.size)} />
                                            </div>
                                            <h4>Rs. {value.productId.sellingPrice}</h4>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <span>No Item in Cart</span>
                    }

                </div>

                <div className="cart-third-box">
                    <div className="cart-price">
                        <h3>SUBTOTAL</h3>
                        <h3>Rs. {allCartItem ? allCartItem.reduce((total, value) => total + (parseInt(value.productId.sellingPrice) * (value.qty)), 0) : 0}</h3>
                    </div>
                    <p>Shipping, taxes, and discounts calculated at checkout.</p>
                    <button onClick={PlaceOrderPageFunc}>Check out</button>
                </div>
            </div>
        </div>
    );
};
export default Cart;