import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// components
import './style.css';
import HeadingAndParagraph from '../HeadingAndParagraph';
import useFetch from '../../../common/useFetch';

const TopRated = () => {
  const { data: topRatingProducts } = useFetch(
    'topRatingProducts',
    '/product/top-rated',
    2 * 60 * 1000
  );

  return (
    <>
      {topRatingProducts?.products?.length > 0 ? (
        <div className="top-rated-container">
          <HeadingAndParagraph
            heading={'Top Rated Products'}
            para={
              'The highest-rated product with exceptional customer satisfaction.'
            }
          />
          <div className="top-rated-image-container">
            {topRatingProducts?.products?.map((product, index) => (
              <Link to={`/preview/${product?._id}`} key={product?._id}>
                <motion.img
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 1.03 }}
                  key={index}
                  src={product?.productPicture?.img}
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
