import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import AliceCarousel from 'react-alice-carousel';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// components
import './style.css';
import Sizes from '../Sizes';
import { addToCart } from '../../../redux/slices/CartSlice';
import AllReviews from '../../Review/allReviews';
import { totalRating } from '../../../utils/TotalRating';

const responsive = {
  0: { items: 1 },
  500: { items: 2 },
};

const PreviewProduct = ({ previewProduct, setPreviewProduct }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [productSize, setProductSize] = useState();
  const [reviewSize, setReviewSize] = useState(5);

  const addToCartFnc = () => {
    if (!productSize) {
      return toast.error('Please Select The Size');
    }
    dispatch(
      addToCart({
        _id: previewProduct._id,
        productName: previewProduct.productName,
        productImage: previewProduct.productPictures[0]?.img,
        sellingPrice: previewProduct.sellingPrice,
        size: productSize,
        qty: 1,
      })
    );
  };

  const PlaceOrderPageFunc = () => {
    if (!productSize) {
      return toast.error('Please Select The Size');
    }

    const productDetails = {
      productId: previewProduct._id,
      size: productSize,
      qty: 1,
      price: previewProduct.sellingPrice,
    };

    navigate(`/place-order?step=1`, {
      state: productDetails,
    });
  };

  return (
    <>
      <div className="preview-main-box">
        {/* only for large device */}
        <div className="preview-pc-image-box">
          {previewProduct.productPictures.map((item, index) => (
            <img
              key={index}
              src={item.img}
              loading="lazy"
              alt="not found"
              className="preview-image preview-image-space-box-one"
            />
          ))}
        </div>

        {/* only for mobile device */}
        <div className="preview-mobile-image-box">
          <AliceCarousel
            responsive={responsive}
            autoPlay={true}
            animationDuration={2000}
            infinite={true}
            // disableDotsControls={true}
            disableButtonsControls={true}
            mouseTracking
            items={previewProduct.productPictures.map((item) => (
              <img
                key={item._id}
                src={item.img}
                // onDragStart={handleDragStart}
                role="presentation"
                className="preview-mobile-image preview-image-space-box-one"
                alt="not-found"
              />
            ))}
          />
        </div>

        <div className="preview-box-two">
          <h3>{previewProduct?.productName}</h3>
          <div className="preview-product-rating">
            <AiFillStar
              style={{
                fontSize: '22px',
                color: '#f8a41b',
                marginRight: '1px',
              }}
            />
            <span>{totalRating(previewProduct?.reviews)}</span>
            <div className="product-review">
              <span>{previewProduct?.reviews.length} Reviews</span>
            </div>
          </div>
          <div className="preview-price-box">
            <h2>&#8377; {previewProduct?.sellingPrice}</h2>
            {previewProduct?.actualPrice > 0 && (
              <strike>&#8377; {previewProduct?.actualPrice}</strike>
            )}
            <h4>
              Save &#8377;
              {previewProduct?.actualPrice - previewProduct?.sellingPrice} (
              {100 -
                parseInt(
                  (previewProduct?.sellingPrice / previewProduct?.actualPrice) *
                    100
                )}
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
              onClick={PlaceOrderPageFunc}
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
            <pre>{previewProduct?.description}</pre>
          </div>
        </div>
      </div>

      <AllReviews
        allReviews={previewProduct?.reviews}
        productId={previewProduct?._id}
        size={reviewSize}
        setPreviewProduct={setPreviewProduct}
      />

      {reviewSize < previewProduct?.reviews?.length && (
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
