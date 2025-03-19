// m is used in the exact same way as motion, but unlike motion,
// the m component doesn't come preloaded with features like animations, layout animations,
// or the drag gesture. Instead, we load these in manually via the LazyMotion component
import * as m from 'motion/react-m';
import { LazyMotion, domAnimation } from 'motion/react';
import { Link } from 'react-router';

// components
import './style.css';
import HeadingAndParagraph from '../HeadingAndParagraph';
import useFetch from '../../common/useFetch';

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

          {/* optimizing motion/framer motion with the help of LazyMotion, domAnimation */}
          <LazyMotion features={domAnimation}>
            <div className="top-rated-image-container">
              {topRatingProducts?.products?.map((product, index) => (
                <Link
                  key={product?._id}
                  to={`/preview/${product?._id}`}
                  aria-label="View product picture"
                >
                  <m.img
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 1.03 }}
                    key={index}
                    src={product?.productPicture?.img}
                    alt={
                      product?.productPicture?.public_id?.split('/')[0] ||
                      'product picture'
                    }
                    className="top-rated-images"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </LazyMotion>
        </div>
      ) : null}
    </>
  );
};

export default TopRated;
