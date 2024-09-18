import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// components
import './style.css';
import HeadingAndParagraph from '../HeadingAndParagraph';
import axiosInstance from '../../../axios/AxiosInstance';

const TopRated = () => {
  const [topRatingProducts, setTopRatingProducts] = useState([]);

  // fetching top trending products after the components mount
  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get('/product/top-rated');
        setTopRatingProducts(res.data.products);
      } catch (err) {
        toast.error(err?.response?.data?.error || err?.message);
      }
    })();
  }, []);

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
