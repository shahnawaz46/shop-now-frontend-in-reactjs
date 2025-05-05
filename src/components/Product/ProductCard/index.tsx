import { memo } from 'react';
import { Link } from 'react-router';

// components
import './style.css';
import { IProduct } from '../../../types/interfaces/product.interface';

const ProductCard = ({ product }: { product: IProduct }) => {
  // console.log('ProductCard: ', product);

  const totalOff = (
    100 -
    (product.sellingPrice / product.actualPrice) * 100
  ).toFixed(0);

  return (
    <div className="product-card-container">
      <Link to={`/preview/${product?._id}`}>
        <img
          src={product.productPictures[0].img}
          loading="lazy"
          alt={product.productName}
          className="product-card-image"
        />
        <div className="product-card-details">
          <h4 className="product-card-name">{product.productName}</h4>
          <div>
            <span className="product-selling-price">
              &#8377;{product.sellingPrice}
            </span>
            {product?.actualPrice > 0 && (
              <s className="product-actual-price">
                &#8377; {product.actualPrice}
              </s>
            )}
            <span
              style={{
                fontSize: '14px',
                color: 'rgb(4, 126, 11)',
                fontWeight: '600',
              }}
            >
              {totalOff}% <span>off</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);
