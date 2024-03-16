import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { fetchTopSellingProducts } from '../redux/slices/AnotherProductSlice';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';

const TopSelling = () => {
  const dispatch = useDispatch();
  const { status, products } = useSelector(
    (state) => state.anotherProduct.topSellingProducts
  );
  console.log(status, products);
  // fetching top selling products after landing on Men Product Page
  useEffect(() => {
    if (status === 'idle') dispatch(fetchTopSellingProducts());
  }, []);

  if (status === 'pending')
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Loading />;
      </div>
    );

  return (
    <RootLayout>
      <div style={{ minHeight: 'calc(100vh - 462px)', position: 'relative' }}>
        {products.length > 0 ? (
          products.item.map((product) => (
            <div className='product-container'>
              <ProductCard key={product._id} product={product} />
            </div>
          ))
        ) : (
          <NotFound>Currently No Products Available</NotFound>
        )}
      </div>
    </RootLayout>
  );
};

export default TopSelling;
