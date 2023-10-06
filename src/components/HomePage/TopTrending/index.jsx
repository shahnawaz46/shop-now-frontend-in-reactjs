import React, { useEffect, useState } from 'react';
import './style.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import HeadingAndParagraph from '../HeadingAndParagraph';
import { giveMeImages } from '../../../axios/UlrConfig';

const responsive = {
  0: { items: 1 },
  385: { items: 2 },
  770: { items: 3 },
  1040: { items: 4 },
};

const TopTrending = () => {
  const {
    homePageProducts: { topTrendingProducs },
  } = useSelector((state) => state.allProducts);

  const [targetAudience, settargetAudience] = useState('Men');
  const [products, setProducts] = useState([]);

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    if (topTrendingProducs.length > 0) {
      const filtered = topTrendingProducs.find(
        (item) => item.targetAudience === targetAudience
      );
      setProducts(filtered.trendingProducts);
    }
  }, [topTrendingProducs, targetAudience]);

  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '200px',
        margin: '20px 10px 30px 10px',
      }}
    >
      <HeadingAndParagraph
        heading={'Our Best Collections'}
        para={'Pick up for outfit inspiration and must have looks'}
      />
      <div className="product-button-container">
        <button
          className="product-button"
          style={{
            backgroundColor: targetAudience === 'Men' && '#030342',
            color: targetAudience === 'Men' && 'white',
          }}
          onClick={() => settargetAudience('Men')}
        >
          Men
        </button>
        <button
          className="product-button"
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
          items={products.map((product) => (
            <Link to={`/preview/${product?._id}`} key={product?._id}>
              <img
                src={giveMeImages(product?.productPicture?.img)}
                onDragStart={handleDragStart}
                role="presentation"
                className="product-images"
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
