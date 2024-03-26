import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

// components
import { giveMeImages } from '../../axios/UlrConfig';

const ProductCard = ({ product }) => {
  // console.log('ProductCard: ', product);
  return (
    <div className='product-card-container'>
      <Link to={`/preview/${product._id}`}>
        <img
          src={giveMeImages(product.productPictures[0].img)}
          loading='lazy'
          alt='not found'
          className='product-card-image'
        />
        <div className='product-card-details'>
          <h4 className='product-card-name'>{product.productName}</h4>
          <div>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>
              &#8377;{product?.sellingPrice}
            </span>
            {product?.actualPrice > 0 && (
              <strike
                style={{
                  fontSize: '14px',
                  margin: '0px 5px',
                  color: '#878787',
                }}
              >
                &#8377; {product?.actualPrice}
              </strike>
            )}
            <span
              style={{ fontSize: '14px', color: '#388e3c', fontWeight: '600' }}
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

export default React.memo(ProductCard);
