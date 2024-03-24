import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import AliceCarousel from 'react-alice-carousel';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import './style.css';
import { giveMeImages } from '../../../axios/UlrConfig';
import Sizes from '../Sizes';
import { addToCart } from '../../../redux/slices/CartSlice';
import AllReviews from '../../Review/allReviews';
import { totalRating } from '../../../common/TotalRating';
import { clearStateAndStorage } from '../../../utils/ClearStateAndStorage';

const responsive = {
  0: { items: 1 },
  500: { items: 2 },
};

const PreviewProduct = ({ previewProduct, setPreviewProduct }) => {
  const dispatch = useDispatch();
  const { status, personalDetails } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
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

    // status failed means user is not authenticated then removing id from localStorage and setting redux to initialState and redirecting to the login page
    if (status === 'failed') {
      clearStateAndStorage();
      navigate('/login', { state: { from: location.pathname } });
      return null;
    }

    navigate(`/place-order?step=1`, {
      state: {
        productId: previewProduct._id,
        size: productSize,
        qty: 1,
        price: previewProduct.sellingPrice,
      },
    });
  };

  return (
    <>
      <div className='preview-main-box'>
        <div className='preview-pc-image-box'>
          {true &&
            previewProduct.productPictures.map((item, index) => (
              <img
                key={index}
                src={giveMeImages(item.img)}
                loading='lazy'
                alt='not found'
                className='preview-image preview-image-space-box-one'
              />
            ))}
        </div>
        <div className='preview-mobile-image-box'>
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
                src={giveMeImages(item.img)}
                // onDragStart={handleDragStart}
                role='presentation'
                className='preview-mobile-image preview-image-space-box-one'
                alt='not-found'
              />
            ))}
          />
        </div>

        <div className='preview-box-two'>
          <h3>{previewProduct?.productName}</h3>
          <div className='preview-product-rating'>
            <AiFillStar
              style={{
                fontSize: '22px',
                color: '#f8a41b',
                marginRight: '1px',
              }}
            />
            <span>{totalRating(previewProduct?.reviews)}</span>
            <div className='product-review'>
              <span>{previewProduct?.reviews.length} Reviews</span>
            </div>
          </div>
          <div className='preview-price-box'>
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

          <div className='preview-page-main-button-box'>
            <button className='preview-page-main-button' onClick={addToCartFnc}>
              ADD TO SHOP
            </button>
            <button
              className='preview-page-main-button'
              onClick={PlaceOrderPageFunc}
            >
              BUY NOW
            </button>
          </div>
          <div className='preview-shiping-page-box'>
            <p>
              Free Shipping on orders above ₹1500. Will ship within 3-6 days.
            </p>
          </div>
          <div className='preview-product-description-box'>
            <h4>Description</h4>
            <p>{previewProduct?.description}</p>
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
          className='review-all-review'
          onClick={() => setReviewSize((prev) => prev + 5)}
        >
          See More
        </button>
      )}
    </>
  );
};

export default PreviewProduct;
