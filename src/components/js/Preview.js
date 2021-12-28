import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import StarIcon from '@material-ui/icons/Star';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

// components
import '../css/Preview.css';
import Navbar from './Navbar';
import ReturnDeliveryPolicy from './ReturnDeliveryPolicy';
import Footer from './Footer';
import { giveMeImages } from '../../axios/UlrConfig';
import Review from './Review';

// action
import { getSingleProductById } from '../../actions/ProductAction';
import { addToCart } from '../../actions/CartAction';



const Preview = () => {
    const History = useHistory()
    const { productId } = useParams()
    const dispatch = useDispatch()
    const { singleProduct, loading } = useSelector((state) => state.product)
    const { allCartItem, message } = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user)


    const [condition, setCondition] = useState()
    const sizeDescription = {
        'XS': 'Your body measurements for Extra Small are Bust: 32 in, Waist: 24 in, Hip: 34 in',
        'S': 'Your body measurements for Small are Bust: 33-34 in, Waist: 25-26 in, Hip: 35-36 in',
        'M': 'Your body measurements for Medium are Bust: 35-36 in, Waist: 27-28 in, Hip: 37-38 in',
        'L': 'Your body measurements for Large are Bust: 37-38 in, Waist: 29-30 in, Hip: 39-40 in',
        'XL': 'Your body measurements for Extra Large are Bust: 40-41 in, Waist: 32-33 in, Hip: 42-43 in'
    }

    const addToCartFnc = (singleProduct) => {
        if (!condition) {
            return alert("Please select size")
        }
        const product = [{ productId: singleProduct._id, size: condition, qty: 1 }]
        dispatch(addToCart(product, singleProduct))
    }

    const totalRating = () => {
        let sumOfRating = singleProduct?.reviews.reduce((total, value) => value.rating + total, 0)
        sumOfRating = (sumOfRating * 5) / (singleProduct?.reviews.length * 5)
        return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0
    }

    const PlaceOrderPageFunc = (value) => {
        if (!condition) {
            return alert("Please select size")
        }
        if(user.authenticate){ 
            const Data = allCartItem?.length > 0 && allCartItem.find(value => value.productId._id === singleProduct._id && value.size === condition)
            if(Data){ 
                History.push(`/place-order/${value._id}-${condition}`)  
            }else{
                addToCartFnc(value)
                History.push(`/place-order/${value._id}-${condition}`)  
            }
        }else{
            History.push("/login")
        }
    }
    
    useEffect(() => {
        dispatch(getSingleProductById(productId))
    }, [productId])

    return (
        <>
            <Navbar />
            {
                loading ?
                    <div className="men-loader">
                        <CircularProgress />
                    </div>
                    :
                    <>
                        <div className="preview-main-box">
                            <div className="preview-pc-image-box">
                                {
                                    singleProduct && singleProduct.productPictures.map((item, index) =>
                                        <img key={index} src={giveMeImages(item.img)} loading="lazy" alt="not found" className="preview-image preview-image-space-box-one" />
                                    )
                                }
                            </div>
                            <div className="preview-mobile-image-box">
                                <Carousel
                                    autoPlay={false}
                                    indicatorContainerProps={{
                                        style: {
                                            marginTop: '-35px',
                                            marginBottom: '10px'
                                        }
                                    }}
                                >
                                    {
                                        singleProduct && singleProduct.productPictures.map((item, index) =>
                                            <img key={index} src={giveMeImages(item.img)} loading="lazy" alt="not found" className="preview-image preview-image-space-box-one" />
                                        )
                                    }
                                </Carousel>
                            </div >

                            <div className="preview-box-two">
                                <h3>{singleProduct?.productName}</h3>
                                <div className="preview-product-rating">
                                    <StarIcon style={{ fontSize: '22px', color: '#f8a41b', marginRight: '1px' }} />
                                    <span>{totalRating()}</span>
                                    <div className="product-review">
                                        <span>{singleProduct?.reviews.length} Reviews</span>
                                    </div>
                                </div>
                                <div className="preview-price-box">
                                    <h2>&#8377; {singleProduct?.sellingPrice}</h2>
                                    {
                                        singleProduct?.actualPrice > 0 &&
                                        <strike>&#8377; {singleProduct?.actualPrice}</strike>
                                    }
                                    <h4>Save &#8377;{singleProduct?.actualPrice - singleProduct?.sellingPrice} ({100 - parseInt((singleProduct?.sellingPrice / singleProduct?.actualPrice) * 100)}%)</h4>
                                </div>
                                <div className="preview-size-button-box">
                                    <button onClick={() => setCondition('XS')} className={condition === 'XS' ? "preview-size-button background-color-black" : "preview-size-button"}>XS</button>
                                    <button onClick={() => setCondition('S')} className={condition === 'S' ? "preview-size-button background-color-black" : "preview-size-button"}>S</button>
                                    <button onClick={() => setCondition('M')} className={condition === 'M' ? "preview-size-button background-color-black" : "preview-size-button"}>M</button>
                                    <button onClick={() => setCondition('L')} className={condition === 'L' ? "preview-size-button background-color-black" : "preview-size-button"}>L</button>
                                    <button onClick={() => setCondition('XL')} className={condition === 'XL' ? "preview-size-button background-color-black" : "preview-size-button"}>XL</button>
                                </div>

                                <div className="preview-size-detail-box">
                                    {sizeDescription[condition]}
                                </div>

                                <div className="preview-page-main-button-box">
                                    <button className="preview-page-main-button" onClick={() => addToCartFnc(singleProduct)} >ADD TO SHOP</button>
                                    <button className="preview-page-main-button" onClick={()=>PlaceOrderPageFunc(singleProduct)}>BUY NOW</button>
                                </div>
                                <div className="preview-shiping-page-box">
                                    <p>Free Shipping on orders above ₹1500. Will ship within 3-6 days.</p>
                                </div>
                                <div className="preview-product-description-box">
                                    <h4>Description</h4>
                                    <p>{singleProduct?.description}</p>
                                </div>
                                {/* <div className="preview-product-description-box">
                                    <h4>Detail</h4>
                                    <ul>
                                        <li>Kimono</li>
                                        <li>Print Combination</li>
                                        <li>3/4 Sleeve</li>
                                        <li>Floral print</li>
                                        <li>Poly Georgette</li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                        <Review reviewWidth={"review-main-box"} reviewShowBox={"review-show-box"} size={5} />
                        {
                            singleProduct?.reviews.length > 5 && <Link to={`/preview/${singleProduct?._id}/product-review`}><button className="review-all-review">See All Reviews</button></Link>
                        }
                        <ReturnDeliveryPolicy />
                        <Footer />
                    </>
            }
        </>
    )
}

export default Preview
