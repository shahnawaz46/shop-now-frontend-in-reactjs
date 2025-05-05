import { useEffect, useState } from 'react';
import { Link } from 'react-router';

// carousel
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// components
import './style.css';
import HeadingAndParagraph from '../HeadingAndParagraph';
import useFetch from '../../../hooks/useFetch';
import {
  IAllTrendingProducts,
  ITrendingProduct,
} from '../../../types/interfaces/product.interface';

const responsive = {
  0: { items: 1 },
  385: { items: 2 },
  770: { items: 3 },
  1040: { items: 4 },
  1400: { items: 5 },
  1700: { items: 6 },
};

enum TargetAudience {
  MEN = 'Men',
  WOMEN = 'Women',
}

const TopTrending = () => {
  const [targetAudience, setTargetAudience] = useState<TargetAudience>(
    TargetAudience.MEN
  );
  const [currentProducts, setCurrentProducts] = useState<ITrendingProduct[]>(
    []
  );
  const { data: allTrendingProducts } = useFetch<{
    products: IAllTrendingProducts[];
  }>('allTrendingProducts', '/product/top-trending', 2 * 60 * 1000);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
    e.preventDefault();

  // assigning current products based on selected audience
  useEffect(() => {
    if (allTrendingProducts?.products?.length > 0) {
      const filtered = allTrendingProducts?.products.find(
        (item) => item.targetAudience === targetAudience
      );
      setCurrentProducts(filtered ? filtered.trendingProducts : []);
    }
  }, [allTrendingProducts, targetAudience]);

  return (
    <>
      {currentProducts.length > 0 ? (
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
              className={`trending-toggle-button ${
                targetAudience === TargetAudience.MEN ? 'active' : ''
              }`}
              onClick={() => setTargetAudience(TargetAudience.MEN)}
            >
              Men
            </button>
            <button
              className={`trending-toggle-button ${
                targetAudience === TargetAudience.WOMEN ? 'active' : ''
              }`}
              onClick={() => setTargetAudience(TargetAudience.WOMEN)}
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
                <Link
                  key={product?.productId}
                  to={`/preview/${product?.productId}`}
                  aria-label="View product picture"
                >
                  <img
                    src={product?.productPicture?.img}
                    onDragStart={handleDragStart}
                    role="presentation"
                    className="trending-product-images"
                    alt={
                      product?.productPicture?.public_id?.split('/')[0] ||
                      'product picture'
                    }
                    loading="lazy"
                  />
                </Link>
              ))}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TopTrending;
