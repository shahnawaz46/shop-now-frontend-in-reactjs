import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'

// components
import "./style.css";
import { giveMeImages } from "../../../axios/UlrConfig";
import Sizes from "../Sizes";
import { addToCart } from "../../../redux/slices/CartSlice";
// import Review from './Review';

const responsive = {
  0: { items: 1 },
  500: { items: 2 },
};

const PreviewProduct = ({ product }) => {
  // const History = useHistory()
  // const { productId } = useParams()
  const dispatch = useDispatch()
  // const { singleProduct, loading } = useSelector((state) => state.product)
  // const { allCartItem, message } = useSelector((state) => state.cart)
  // const user = useSelector((state) => state.user)

  const [condition, setCondition] = useState();

  const addToCartFnc = () => {
      if (!condition) {
          return toast.error("Please Select The Size")
      }
      dispatch(addToCart(product))
      // const product = [{ productId: singleProduct._id, size: condition, qty: 1 }]
      // dispatch(addToCart(product, singleProduct))
  }

  const totalRating = () => {
    let sumOfRating = product?.reviews.reduce((total, value) => value.rating + total, 0);
    sumOfRating = (sumOfRating * 5) / (product?.reviews.length * 5);
    return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0;
  };

  // const PlaceOrderPageFunc = (value) => {
  //     if (!condition) {
  //         return alert("Please select size")
  //     }
  //     if(user.authenticate){
  //         const Data = allCartItem?.length > 0 && allCartItem.find(value => value.productId._id === singleProduct._id && value.size === condition)
  //         if(Data){
  //             History.push(`/place-order/${value._id}-${condition}`)
  //         }else{
  //             addToCartFnc(value)
  //             History.push(`/place-order/${value._id}-${condition}`)
  //         }
  //     }else{
  //         History.push("/login")
  //     }
  // }

  // useEffect(() => {
  //     dispatch(getSingleProductById(productId))
  // }, [productId])

  return (
    <>
      <div className="preview-main-box">
        <div className="preview-pc-image-box">
          {true &&
            product.productPictures.map((item, index) => (
              <img
                key={index}
                src={giveMeImages(item.img)}
                loading="lazy"
                alt="not found"
                className="preview-image preview-image-space-box-one"
              />
            ))}
        </div>
        <div className="preview-mobile-image-box">
          <AliceCarousel
            responsive={responsive}
            autoPlay={true}
            animationDuration={2000}
            infinite={true}
            // disableDotsControls={true}
            disableButtonsControls={true}
            mouseTracking
            items={product.productPictures.map((item) => (
              <img
                key={item._id}
                src={giveMeImages(item.img)}
                // onDragStart={handleDragStart}
                role="presentation"
                className="preview-mobile-image preview-image-space-box-one"
              />
            ))}
          />
        </div>

        <div className="preview-box-two">
          <h3>{product?.productName}</h3>
          <div className="preview-product-rating">
            <AiFillStar
              style={{
                fontSize: "22px",
                color: "#f8a41b",
                marginRight: "1px",
              }}
            />
            <span>{totalRating()}</span>
            <div className="product-review">
              <span>{product?.reviews.length} Reviews</span>
            </div>
          </div>
          <div className="preview-price-box">
            <h2>&#8377; {product?.sellingPrice}</h2>
            {product?.actualPrice > 0 && (
              <strike>&#8377; {product?.actualPrice}</strike>
            )}
            <h4>
              Save &#8377;
              {product?.actualPrice - product?.sellingPrice} (
              {100 -
                parseInt(
                  (product?.sellingPrice / product?.actualPrice) *
                    100
                )}
              %)
            </h4>
          </div>

          {/* products sizes */}
          <Sizes condition={condition} setCondition={setCondition} />

          <div className="preview-page-main-button-box">
            <button
              className="preview-page-main-button"
              onClick={addToCartFnc}
            >
              ADD TO SHOP
            </button>
            <button
              className="preview-page-main-button"
              //   onClick={() => PlaceOrderPageFunc(singleProduct)}
            >
              BUY NOW
            </button>
          </div>
          <div className="preview-shiping-page-box">
            <p>
              Free Shipping on orders above ₹1500. Will ship within 3-6 days.
            </p>
          </div>
          <div className="preview-product-description-box">
            <h4>Description</h4>
            <p>{product?.description}</p>
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
      {/* <Review
        reviewWidth={"review-main-box"}
        reviewShowBox={"review-show-box"}
        size={5}
      /> */}
      {product?.reviews.length > 5 && (
        <Link to={`/preview/${product?._id}/product-review`}>
          <button className="review-all-review">See All Reviews</button>
        </Link>
      )}
    </>
  );
};

export default PreviewProduct;
