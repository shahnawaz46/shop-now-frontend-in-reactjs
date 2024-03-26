import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { fetchTopSellingProducts } from '../redux/slices/AnotherProductSlice';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import SidebarLayout from '../components/Layout/SidebarLayout';
import axiosInstance from '../axios/AxiosInstance';

const TopSelling = () => {
  const dispatch = useDispatch();
  const { status, products } = useSelector(
    (state) => state.anotherProduct.topSellingProducts
  );

  const [searchParam, setSearchParam] = useSearchParams();
  const [filterProducts, setFilterProducts] = useState({
    status: 'idle',
    item: [],
  });

  const fetchFilteredProducts = useCallback(
    debounce(async (filteredParam) => {
      try {
        const res = await axiosInstance.get(
          `/product/top-selling?${filteredParam}`
        );
        setFilterProducts({
          status: 'success',
          item: res.data.topSellingProducts,
        });
      } catch (err) {
        setFilterProducts((prev) => ({ ...prev, status: 'failed' }));
        toast.error(err?.response?.data?.error || err?.message);
      }
    }, 500),
    []
  );

  // fetching filtered products after user use filter(like price range and category)
  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) {
      setFilterProducts((prev) => ({ ...prev, status: 'loading' }));
      fetchFilteredProducts(filteredQuery);
    }
  }, [searchParam.toString()]);

  // fetching top selling products
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
      <SidebarLayout
        subCategory={[
          {
            children: [
              { categoryName: 'Men Products', slug: 'Men' },
              { categoryName: 'Women Products', slug: 'Women' },
            ],
          },
        ]}
      >
        <div
          style={{
            minHeight: 'calc(100vh - 462px)',
            height: '100%',
            position: 'relative',
          }}
        >
          {searchParam.toString() ? (
            filterProducts.status === 'loading' ? (
              <Loading />
            ) : filterProducts.item.length > 0 ? (
              <div className='product-container'>
                {filterProducts.item.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <NotFound>No Filtered Products Available</NotFound>
            )
          ) : products.length > 0 ? (
            <div className='product-container'>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NotFound>Currently No Products Available</NotFound>
          )}
        </div>
      </SidebarLayout>
    </RootLayout>
  );
};

export default TopSelling;
