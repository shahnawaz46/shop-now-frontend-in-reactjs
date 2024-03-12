import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { fetchMenProducts } from '../redux/slices/ProductSlice';
import Loading from '../components/Loading';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';

const MenProducts = () => {
  const dispatch = useDispatch();
  const {
    menProducts: { products, subCategory, status },
  } = useSelector((state) => state.allProducts);

  const [filterProducts, setFilterProducts] = useState({
    status: 'loading',
    item: [],
  });

  const location = useLocation(); // useLocation will return object with multiple key and value like pathname, search query parameters and etc.
  const searchParam = new URLSearchParams(location.search); // searchParam is used for manipulation query parameters like get, append, set and etc.

  const fetchFilteredProducts = useCallback(
    debounce(async (filteredParam) => {
      try {
        const res = await axiosInstance.get(
          `/product/filtered?${filteredParam}&targetAudience=Men`
        );
        setFilterProducts({
          status: 'success',
          item: res.data.subCategoryProducts,
        });
      } catch (err) {
        setFilterProducts((prev) => ({ ...prev, status: 'failed' }));
        toast.error(err?.response?.data?.error || err?.message);
      }
    }, 500),
    []
  );

  // fetching men products after landing on Men Product Page
  useEffect(() => {
    if (status === 'idle') dispatch(fetchMenProducts());
  }, []);

  // fetching filtered products after user use filter(like price range and category)
  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) {
      setFilterProducts((prev) => ({ ...prev, status: 'loading' }));
      fetchFilteredProducts(filteredQuery);
    }
  }, [searchParam.toString()]);

  if (status === 'pending')
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Loading />;
      </div>
    );

  return (
    <RootLayout>
      <SidebarLayout subCategory={subCategory}>
        {location.search ? (
          filterProducts.status === 'loading' ? (
            <div
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <Loading />
            </div>
          ) : filterProducts.item.length > 0 ? (
            <div className='product-container'>
              {filterProducts.item.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NotFound>Currently No Products Available</NotFound>
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
      </SidebarLayout>
    </RootLayout>
  );
};

export default MenProducts;
