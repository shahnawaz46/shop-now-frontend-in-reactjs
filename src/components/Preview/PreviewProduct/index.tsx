import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import AliceCarousel from "react-alice-carousel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// components
import "./style.css";
import Sizes from "../Sizes";
import { addToCart, incrementCartItem } from "../../../redux/slices/CartSlice";
import AllReviews from "../../Review/allReviews";
import { totalRating } from "../../../utils/Product";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IPreviewProduct,
  IProductSizes,
} from "../../../types/interfaces/product.interface";

const responsive = {
  0: { items: 1 },
  500: { items: 2 },
};

interface IPreviewProductProps {
  previewProduct: IPreviewProduct;
  setPreviewProduct: React.Dispatch<React.SetStateAction<IPreviewProduct>>;
}

const PreviewProduct = ({
  previewProduct,
  setPreviewProduct,
}: IPreviewProductProps) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  // console.log('PreviewProduct:', previewProduct);

  const navigate = useNavigate();
  const [productSize, setProductSize] = useState<
    keyof IProductSizes | undefined
  >();
  const [showTotalReviews, setShowTotalReviews] = useState<number>(5);

  const addToCartFnc = () => {
    if (!productSize) {
      return toast.error("Please Select The Size");
    }

    // if item already added to cart then incrementing the quantity
    const isAlreadyAdded = cartItems.find(
      (item) =>
        item.productId === previewProduct._id && item.size === productSize
    );
    if (isAlreadyAdded) {
      dispatch(
        incrementCartItem({
          productId: previewProduct._id,
          size: productSize,
          qty: 1,
        })
      );

      return;
    }

    dispatch(
      addToCart({
        productId: previewProduct._id,
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
      return toast.error("Please Select The Size");
    }

    const productDetails = {
      productId: previewProduct._id,
      size: productSize,
    };

    navigate(`/place-order?step=1`, {
      state: productDetails,
    });
  };

  const totalOff = (
    100 -
    (previewProduct.sellingPrice / previewProduct.actualPrice) * 100
  ).toFixed(0);

  return (
    <>
      <div className="preview-container">
        {/* only for large device */}
        <div className="preview-image-container-large">
          {previewProduct.productPictures.map((product) => (
            <img
              key={product._id}
              src={product.img}
              className="preview-image-large"
              alt={product?.public_id?.split("/")[0] || "product picture"}
              loading="lazy"
            />
          ))}
        </div>

        {/* only for mobile device */}
        <div className="preview-image-container-small">
          <AliceCarousel
            responsive={responsive}
            autoPlay={true}
            animationDuration={2000}
            infinite={true}
            // disableDotsControls={true}
            disableButtonsControls={true}
            mouseTracking
            items={previewProduct.productPictures.map((product) => (
              <img
                key={product._id}
                src={product.img}
                role="presentation"
                className="preview-image-small"
                alt={product?.public_id?.split("/")[0] || "product picture"}
              />
            ))}
          />
        </div>

        <div className="preview-right-container">
          <h2 className="preview-product-name">
            {previewProduct?.productName}
          </h2>
          <div className="preview-product-rating-container">
            <AiFillStar
              style={{
                fontSize: "22px",
                color: "#f8a41b",
                marginRight: "1px",
              }}
            />
            <span className="preview-product-rating">
              {totalRating(previewProduct?.reviews)}
            </span>

            <div className="preview-product-review">
              <span>{previewProduct?.reviews.length} Reviews</span>
            </div>
          </div>

          <div className="preview-product-price-container">
            <span className="preview-product-selling-price">
              &#8377; {previewProduct?.sellingPrice}
            </span>
            {previewProduct?.actualPrice > 0 && (
              <s className="preview-product-actual-price">
                &#8377; {previewProduct?.actualPrice}
              </s>
            )}

            <span className="preview-product-saving">
              Save &#8377;
              {previewProduct?.actualPrice - previewProduct?.sellingPrice} (
              {totalOff} %)
            </span>
          </div>

          {/* products sizes */}
          <Sizes
            allSize={previewProduct?.size}
            productSize={productSize}
            setProductSize={setProductSize}
          />

          <div className="preview-product-button-container">
            <button className="preview-product-btn" onClick={addToCartFnc}>
              ADD TO SHOP
            </button>
            <button
              className="preview-product-btn"
              onClick={PlaceOrderPageFunc}
            >
              BUY NOW
            </button>
          </div>

          <p className="preview-product-shipping-note">
            Free Shipping on orders above ₹1500. Will ship within 3-6 days.
          </p>

          <div className="preview-product-description-container">
            <h3 className="preview-product-description-heading">Description</h3>
            <p className="preview-product-description">
              {previewProduct?.description}
            </p>
          </div>
        </div>
      </div>

      <AllReviews
        allReviews={previewProduct?.reviews}
        productId={previewProduct?._id}
        showTotalReviews={showTotalReviews}
        setPreviewProduct={setPreviewProduct}
      />

      {showTotalReviews < previewProduct?.reviews?.length && (
        <button
          className="review-all-review"
          onClick={() => setShowTotalReviews((prev) => prev + 5)}
        >
          See More
        </button>
      )}
    </>
  );
};

export default PreviewProduct;
