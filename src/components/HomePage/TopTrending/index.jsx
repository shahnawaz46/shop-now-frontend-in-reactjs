import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// carousel
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// components
import './style.css';
import HeadingAndParagraph from '../HeadingAndParagraph';
import axiosInstance from '../../../axios/AxiosInstance';

const responsive = {
  0: { items: 1 },
  385: { items: 2 },
  770: { items: 3 },
  1040: { items: 4 },
  1400: { items: 5 },
  1700: { items: 6 },
};

const TopTrending = () => {
  const [allTrendingProducts, setAllTrendingProducts] = useState([]);
  const [targetAudience, settargetAudience] = useState('Men');
  const [currentProducts, setCurrentProducts] = useState([]);

  const handleDragStart = (e) => e.preventDefault();

  // assigning current products based on selected audience
  useEffect(() => {
    if (allTrendingProducts.length > 0) {
      const filtered = allTrendingProducts.find(
        (item) => item.targetAudience === targetAudience
      );
      setCurrentProducts(filtered ? filtered.trendingProducts : []);
    }
  }, [allTrendingProducts, targetAudience]);

  // fetching top trending products after the components mount
  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get('/product/top-trending');
        setAllTrendingProducts(res.data.products);
      } catch (err) {
        toast.error(err?.response?.data?.error || err?.message);
      }
    })();
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '200px',
        margin: '20px 10px 30px 10px',
      }}
    >
      <HeadingAndParagraph
        heading={'Top Trending Products'}
        para={'Pick up for outfit inspiration and must have looks'}
      />

      <div className="trending-button-container">
        <button
          className="trending-toggle-button"
          style={{
            backgroundColor: targetAudience === 'Men' && '#030342',
            color: targetAudience === 'Men' && 'white',
          }}
          onClick={() => settargetAudience('Men')}
        >
          Men
        </button>
        <button
          className="trending-toggle-button"
          style={{
            backgroundColor: targetAudience === 'Women' && '#030342',
            color: targetAudience === 'Women' && 'white',
          }}
          onClick={() => settargetAudience('Women')}
        >
          Women
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <AliceCarousel
          responsive={responsive}
          autoPlay={true}
          animationDuration={1500}
          infinite={true}
          disableDotsControls={true}
          disableButtonsControls={true}
          mouseTracking
          items={currentProducts.map((product) => (
            <Link to={`/preview/${product?.productId}`} key={product?._id}>
              <img
                src={product?.productPicture?.img}
                onDragStart={handleDragStart}
                role="presentation"
                className="trending-product-images"
                alt="product-not-found"
              />
            </Link>
          ))}
        />
      </div>
    </div>
  );
};

export default TopTrending;
