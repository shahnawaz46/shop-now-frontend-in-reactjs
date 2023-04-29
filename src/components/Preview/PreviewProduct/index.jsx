import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import AliceCarousel from "react-alice-carousel";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// components
import "./style.css";
import { giveMeImages } from "../../../axios/UlrConfig";
import Sizes from "../Sizes";
import { addToCart } from "../../../redux/slices/CartSlice";
import Reviews from "../../Review/Reviews";
import { totalRating } from "../../../common/TotalRating";

const responsive = {
  0: { items: 1 },
  500: { items: 2 },
};

const PreviewProduct = ({ product }) => {
  const dispatch = useDispatch();

  const [productSize, setProductSize] = useState();
  const [reviewSize, setReviewSize] = useState(5);

  const addToCartFnc = () => {
    if (!productSize) {
      return toast.error("Please Select The Size");
    }
    dispatch(
      addToCart({
        _id: product._id,
        productName: product.productName,
        productImage: product.productPictures[0]?.img,
        sellingPrice: product.sellingPrice,
        size: productSize,
        qty: 1,
      })
    );
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
            <span>{totalRating(product?.reviews)}</span>
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
                parseInt((product?.sellingPrice / product?.actualPrice) * 100)}
              %)
            </h4>
          </div>

          {/* products sizes */}
          <Sizes productSize={productSize} setProductSize={setProductSize} />

          <div className="preview-page-main-button-box">
            <button className="preview-page-main-button" onClick={addToCartFnc}>
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
        </div>
      </div>

      <Reviews productReview={product?.reviews} size={reviewSize} />

      {reviewSize < product?.reviews?.length && (
        <button
          className="review-all-review"
          onClick={() => setReviewSize((prev) => prev + 5)}
        >
          See More
        </button>
      )}
    </>
  );
};

export default PreviewProduct;
