import React from 'react';
import './style.css';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import HeadingAndParagraph from '../HeadingAndParagraph';
import { giveMeImages } from '../../../axios/UlrConfig';

const TopRated = () => {
  const {
    homePageProducts: { topRatingProducts },
  } = useSelector((state) => state.allProducts);

  return (
    <>
      {topRatingProducts.length > 0 ? (
        <div className="top-rated-container">
          <HeadingAndParagraph
            heading={'Top Rated Products'}
            para={
              'The highest-rated product with exceptional customer satisfaction.'
            }
          />
          <div className="top-rated-image-container">
            {topRatingProducts.map((product, index) => (
              <Link to={`/preview/${product?._id}`} key={product?._id}>
                <motion.img
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 1.03 }}
                  key={index}
                  src={giveMeImages(product?.productPicture?.img)}
                  alt="not-found"
                  className="top-rated-images"
                />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TopRated;
