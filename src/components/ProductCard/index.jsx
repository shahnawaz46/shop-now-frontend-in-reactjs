import { memo } from 'react';
import { Link } from 'react-router-dom';

// components
import './style.css';

const ProductCard = ({ product }) => {
  // console.log('ProductCard: ', product);
  return (
    <div className="product-card-container">
      <Link to={`/preview/${product._id}`}>
        <img
          src={product.productPictures[0].img}
          loading="lazy"
          alt={product.productName}
          className="product-card-image"
        />
        <div className="product-card-details">
          <h4 className="product-card-name">{product.productName}</h4>
          <div>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>
              &#8377;{product?.sellingPrice}
            </span>
            {product?.actualPrice > 0 && (
              <strike
                style={{
                  fontSize: '14px',
                  margin: '0px 8px',
                  color: 'var(--tertiary-color)',
                }}
              >
                &#8377; {product?.actualPrice}
              </strike>
            )}
            <span
              style={{
                fontSize: '14px',
                color: 'rgb(4, 126, 11)',
                fontWeight: '600',
              }}
            >
              {100 -
                parseInt((product?.sellingPrice / product?.actualPrice) * 100)}
              % <span>off</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);
