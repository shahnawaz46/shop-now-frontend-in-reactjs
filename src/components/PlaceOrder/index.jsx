// import React, { useState, useEffect } from 'react'
// import { Typography, Stepper, Step, StepLabel } from '@material-ui/core'
// import PersonIcon from '@mui/icons-material/Person'
// import LocalShippingIcon from '@mui/icons-material/LocalShipping'
// import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
// import '../css/PlaceOrder.css'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { giveMeImages } from '../../axios/UlrConfig'
// import RemoveIcon from '@material-ui/icons/Remove'
// import AddIcon from '@material-ui/icons/Add'
// import DeleteIcon from '@material-ui/icons/Delete'
// import AddressForm from './user_profile/js/AddressForm'
// import { getAddress, removeAddressMessageAndError } from '../../actions/AddressAction'
// import { getSingleProductById } from '../../actions/ProductAction'
// import { getCartItem, addToCart, removeCartMessage } from '../../actions/CartAction'
// import { addOrder } from '../../actions/OrderAction'
// import { FaRegAddressBook } from "react-icons/fa";
// import ErrorHandle from '../ErrorHandle';

// const PlaceOrder = () => {
//     const { productIdAndSize } = useParams()

//     // state for show address form and store address detail
//     const [newAddress, setNewAddress] = useState(false);
//     const [userAddressDetail, setUserAddressDetail] = useState({})

//     const [deliverAddress, setDeliverAddress] = useState();
//     const [activeStep, setActiveStep] = useState(0)
//     const [singleProductSize, setSingleProductSize] = useState();
//     const [productQuantity, setProductQuantity] = useState(1)

//     // const [ totalProductPrice, setTotalProductPrice ] = useState()

//     const { singleProduct } = useSelector((state) => state.product)
//     const { allCartItem, message } = useSelector((state) => state.cart)
//     const Data = allCartItem?.length > 0 && allCartItem.find(value => value.productId._id === singleProduct?._id && value.size === singleProductSize)

//     const user = useSelector((state) => state.user);
//     const dispatch = useDispatch()

//     const { addressMessage, addressError, address } = useSelector(state => state.address)

//     useEffect(() => {
//         // setNewAddress(false)
//         if (addressMessage) {
//             dispatch(getAddress())
//         }
//     }, [addressMessage])

//     useEffect(() => {
//         if (productIdAndSize !== 'Cart') {
//             const MyString = productIdAndSize.split("-")
//             dispatch(getSingleProductById(MyString[0]))
//             setSingleProductSize(MyString[1])
//         }
//     }, [productIdAndSize])

//     useEffect(() => {
//         if (message)
//             dispatch(getCartItem())
//         if (message)
//             dispatch(removeCartMessage())
//     }, [message])

//     const controlActiveStep = (activeStep) => {
//         if (user.authenticate && activeStep === 0) {
//             setActiveStep(1)
//         }
//     }

//     const DeliveryAddress = (AddressChoose) => {
//         setDeliverAddress(AddressChoose)
//         setActiveStep(2)
//     }

//     const steps = [
//         {
//             label: <Typography>Login</Typography>,
//             icon: <PersonIcon />
//         },
//         {
//             label: <Typography>Shipping Details</Typography>,
//             icon: <LocalShippingIcon />
//         },
//         {
//             label: <Typography>Confirm Order</Typography>,
//             icon: <LibraryAddCheckIcon />
//         },
//         {
//             label: <Typography>Payment</Typography>,
//             icon: <AccountBalanceIcon />
//         }
//     ]

//     const itemIncrementFnc = (productId, size) => {
//         const product = [{ productId, size, qty: 1 }]
//         dispatch(addToCart(product))
//     }

//     const itemDecrementFnc = (productId, size) => {
//         const product = [{ productId, size, qty: -1 }]
//         dispatch(addToCart(product))
//     }

//     const totalPrizeFunc = () => {
//         const TotalAmount = productIdAndSize !== 'Cart' ? (productQuantity * Data?.productId?.sellingPrice) : allCartItem.reduce((total, value) => total + (parseInt(value.productId.sellingPrice) * (value.qty)), 0)

//         return TotalAmount
//     }

//     const ConfirmOrder = () => {
//         const payload = {
//             addressId: addressId[0]?._id,
//             totalAmount: totalPrizeFunc(),
//             items: [
//                 {
//                     productId: singleProduct?._id,
//                     payablePrice: singleProduct?.sellingPrice,
//                     purChaseQty: productQuantity
//                 }
//             ],
//             paymentStatus: 'pending'
//         }
//         dispatch(addOrder(payload))
//     }

//     const orderSummeryFunc = (product) => {
//         return (
//             <>
//                 <div className="place-order-summery-main-box">
//                     <div className="place-order-summery-image-and-content-box">
//                         <img
//                             src={giveMeImages(product?.productId?.productPictures[0].img)}
//                             alt=""
//                             style={{ objectFit: "contain", width: "200px" }}
//                         />
//                         <div>
//                             <h3 className="place-order-form-input-field">{product?.productId?.productName}</h3>
//                             <h4 className="place-order-form-input-field">Size: {product?.size}</h4>
//                             <div className="place-order-add-sub-delete-box">
//                                 <div className="place-order-add-sub-delete-box" style={{ marginRight: "20px" }}>
//                                     <button style={{
//                                         border: '1px solid #e8e8e1',
//                                         padding: '10px',
//                                         cursor: 'pointer',
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center"
//                                     }} onClick={
//                                         productIdAndSize !== 'Cart' ?
//                                             () => {
//                                                 setProductQuantity(productQuantity - 1)
//                                                 if (productQuantity <= 1) {
//                                                     setProductQuantity(1)
//                                                 }
//                                             } : () => itemDecrementFnc(product?.productId?._id, product?.size)
//                                     }>
//                                         <RemoveIcon style={{ fontSize: '16px' }} />
//                                     </button>
//                                     <h4 className="place-order-form-input-field"
//                                         style={{
//                                             border: '1px solid #e8e8e1',
//                                             height: "38px",
//                                             width: "42px",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             justifyContent: "center"
//                                         }}>
//                                         {productIdAndSize !== 'Cart' ? productQuantity : product?.qty}
//                                     </h4>
//                                     <button style={{
//                                         border: '1px solid #e8e8e1',
//                                         padding: '10px',
//                                         cursor: 'pointer',
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center"
//                                     }} onClick={
//                                         productIdAndSize !== 'Cart' ?
//                                             () => setProductQuantity(productQuantity + 1)
//                                             : () => itemIncrementFnc(product?.productId?._id, product?.size)
//                                     }>
//                                         <AddIcon style={{ fontSize: '16px' }} />
//                                     </button>
//                                 </div>
//                                 <DeleteIcon style={{ fontSize: '20px' }} />
//                             </div>
//                             <div className="place-order-product-selling-actual-price-box">
//                                 <h2>&#8377; {product?.productId?.sellingPrice}</h2>
//                                 {
//                                     product?.productId?.actualPrice > 0 &&
//                                     <strike>&#8377; {product?.productId?.actualPrice}</strike>
//                                 }
//                                 <h4>({100 - parseInt((product?.productId?.sellingPrice / product?.productId?.actualPrice) * 100)}%)OFF</h4>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }

//     return (
//         <>
//             <div className="place-order-modal-position-relative-box">
//                 <Stepper alternativeLabel activeStep={controlActiveStep(activeStep)}>
//                     {
//                         steps.map((items, index) => {
//                             return (
//                                 <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
//                                     <StepLabel style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)" }} icon={items.icon}>
//                                         {items.label}
//                                     </StepLabel>
//                                 </Step>
//                             )
//                         })
//                     }
//                 </Stepper>
//                 {
//                     activeStep === 1 ?
//                         <div>
//                             {
//                                 address?.length > 0 ?
//                                     <div className="place-order-delivery-address-box">
//                                         <div className="place-order-delivery-tag">
//                                             <h1 style={{ textAlign: "center" }}>Delivery Address</h1>
//                                         </div>
//                                         {
//                                             newAddress
//                                                 ?
//                                                 <div className="place-order-modal-position-absolute-box">
//                                                     <AddressForm showAddress={newAddress} setShowAddress={() => setNewAddress()} userAddress={userAddressDetail} setUserAddress={setUserAddressDetail} />
//                                                 </div>
//                                                 :
//                                                 <div className="place-order-address-list-and-button">
//                                                     <h2>Address List</h2>
//                                                     <button className="place-order-add-address-form-buttton" style={{ marginLeft: "10px" }} onClick={() => setNewAddress(true)}>+ Add Address</button>
//                                                 </div>
//                                         }
//                                         <div className="place-order-delivery-addressess-box">
//                                             {
//                                                 address?.map((items, index) => {
//                                                     return (
//                                                         <div key={index} className="place-order-delivery-address-list">
//                                                             <h3 className="place-order-form-input-field">{items.name}</h3>
//                                                             <div className="place-order-delivery-address-detail-box">
//                                                                 <span>{items.address}</span>
//                                                                 <span>{items.state}-{items.pinCode}</span>
//                                                                 <span>{items.cityDistrictTown}</span>
//                                                                 {
//                                                                     items.landmark && <span> Landmark : {items.landmark}</span>
//                                                                 }
//                                                                 <span>Phone Number : {items.mobileNumber}</span>
//                                                                 <button className="place-order-add-address-buttton" onClick={() => DeliveryAddress(items)}>Deliver Here</button>
//                                                             </div>
//                                                         </div>
//                                                     )
//                                                 })
//                                             }
//                                         </div>
//                                     </div>
//                                     :
//                                     <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
//                                         {
//                                             newAddress
//                                                 ?
//                                                 <div className="place-order-modal-position-absolute-box">
//                                                     <AddressForm showAddress={newAddress} setShowAddress={() => setNewAddress()} userAddress={userAddressDetail} setUserAddress={setUserAddressDetail} />
//                                                 </div>
//                                                 :
//                                                 <>
//                                                     <FaRegAddressBook style={{ fontSize: "40px" }} />
//                                                     <p className="place-order-form-paragraph">You Haven't Added Any Addresses</p>

//                                                     <button className="place-order-add-address-form-buttton" style={{ marginLeft: "10px" }} onClick={() => setNewAddress(true)}>+ Add Address</button>
//                                                 </>
//                                         }
//                                     </div>
//                             }
//                         </div> : null
//                 }
//                 {
//                     activeStep === 2 ?
//                         <div className="place-order-personal-address-main-box">
//                             <div className="place-order-personal-address-box">
//                                 <div className="place-order-personal-address-tag">
//                                     <h2>Personal Address</h2>
//                                 </div>
//                                 <div className="place-order-personal-address-box-two">
//                                     <h3 className="place-order-form-input-field">{deliverAddress?.name}</h3>
//                                     <div className="place-order-delivery-address-detail-box">
//                                         <span>{deliverAddress.address}</span>
//                                         <span>{deliverAddress.state}-{deliverAddress.pinCode}</span>
//                                         <span>{deliverAddress.cityDistrictTown}</span>
//                                         {
//                                             deliverAddress.landmark && <span> Landmark : {deliverAddress.landmark}</span>
//                                         }
//                                         <span>Phone Number : {deliverAddress.mobileNumber}</span>
//                                     </div>
//                                 </div>
//                                 <div className="place-order-personal-address-tag">
//                                     <h2>Order Summery</h2>
//                                 </div>
//                                 <div style={{ border: "1px solid #e9e9e9", display: "flex", flexWrap: "wrap" }}>
//                                     {
//                                         productIdAndSize !== 'Cart'
//                                             ?
//                                             orderSummeryFunc(Data)
//                                             :
//                                             allCartItem?.length > 0 && allCartItem.map(value => orderSummeryFunc(value))
//                                     }
//                                 </div>
//                                 {/* <div className="place-order-confirmation-button-box">
//                                 <button onClick={()=>ConfirmOrder()}>Confirm Order</button>
//                             </div> */}
//                             </div>
//                             <div className="place-order-total-price-box">
//                                 <div className="place-order-personal-address-tag">
//                                     <h2>Total Price</h2>
//                                 </div>
//                                 <div className="place-order-total-price-items-name-box">
//                                     <div className="place-order-total-price">
//                                         <h5 className="place-order-items-name">Price Detail ({productIdAndSize !== 'Cart' ? <span>{1} item</span> : <span>{allCartItem.length} items</span>})</h5>
//                                     </div>
//                                     <div className="place-order-total-price" style={{ borderTop: "none", borderBottom: "none" }}>
//                                         <h5 className="place-order-items-name">Total MRP</h5>
//                                         <h5 className="place-order-items-name">Rs {productIdAndSize !== 'Cart' ? (productQuantity * Data?.productId?.actualPrice) : allCartItem.reduce((total, value) => total + (parseInt(value.productId.actualPrice) * (value.qty)), 0)}</h5>
//                                     </div>

//                                     <div className="place-order-total-price" style={{ borderTop: "none", borderBottom: "none" }}>
//                                         <h5 className="place-order-items-name">Discount on MRP</h5>
//                                         <h5 className="place-order-items-name">Rs {productIdAndSize !== 'Cart' ? ((productQuantity * Data?.productId?.actualPrice) - (productQuantity * Data?.productId?.sellingPrice)) : (allCartItem.reduce((total, value) => total + (parseInt(value.productId.actualPrice) * (value.qty)), 0) - allCartItem.reduce((total, value) => total + (parseInt(value.productId.sellingPrice) * (value.qty)), 0))}</h5>
//                                     </div>

//                                     <div className="place-order-total-price">
//                                         <h5 className="place-order-items-name">Total Price</h5>
//                                         <h5 className="place-order-items-name">Rs {totalPrizeFunc()}</h5>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                         : null
//                 }
//             </div>

//             {/* for show error and messages */}
//             {
//                 (addressMessage || addressError) && <ErrorHandle message={addressMessage} error={addressError} removeAction={removeAddressMessageAndError} />
//             }

//         </>
//     )
// }
// export default PlaceOrder