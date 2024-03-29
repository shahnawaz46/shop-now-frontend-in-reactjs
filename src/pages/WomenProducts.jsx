import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import {
  fetchWomenProducts,
  updateProducts,
} from '../redux/slices/ProductSlice';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';
import { ScreenLoading, PaginationLoading } from '../components/Loaders';

const WomenProducts = () => {
  const dispatch = useDispatch();
  const {
    womenProducts: { products, subCategory, status },
  } = useSelector((state) => state.allProducts);

  const [filterProducts, setFilterProducts] = useState({
    status: 'loading',
    item: [],
  });

  const searchParam = useSearchParams()[0]; // useSearchParams return two value first is searchState and second is searchState function

  const { ref, inView } = useInView({ threshold: 1 });

  const fetchMoreProducts = async (url) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch(updateProducts({ stateName: 'womenProducts', data: res.data }));
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  // fetching filteredProducts based on price filter and sub-category
  const fetchFilteredProducts = useCallback(
    debounce(async (url, fetchMore = false) => {
      try {
        const res = await axiosInstance.get(url);
        setFilterProducts((prev) => ({
          ...prev,
          status: 'success',
          next: res.data.next,
          item: fetchMore
            ? [...prev.item, ...res.data.subCategoryProducts]
            : res.data.subCategoryProducts,
        }));
      } catch (err) {
        setFilterProducts((prev) => ({ ...prev, status: 'failed' }));
        toast.error(err?.response?.data?.error || err?.message);
      }
    }, 500),
    []
  );

  // useEffect for calling filteredProducts function based on query changed in url
  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) {
      setFilterProducts({ status: 'loading', next: null, item: [] });
      fetchFilteredProducts(
        `/product/filtered?${filteredQuery}&targetAudience=Women`
      );
    }
  }, [searchParam.toString()]);

  // for pagination after reach to bottom i am fetching products if next url is available
  useEffect(() => {
    if (inView) {
      if (searchParam.toString()) {
        filterProducts?.next &&
          fetchFilteredProducts(filterProducts.next, true);
      } else if (products.next) {
        fetchMoreProducts(products.next);
      }
    }
  }, [inView]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchWomenProducts());
  }, []);

  if (status === 'pending') return <ScreenLoading />;

  return (
    <RootLayout>
      <SidebarLayout subCategory={subCategory}>
        {searchParam.toString() ? (
          filterProducts.status === 'loading' ? (
            <ScreenLoading />
          ) : filterProducts.item.length > 0 ? (
            <div className='product-container'>
              {filterProducts.item.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NotFound>No Filtered Products Available</NotFound>
          )
        ) : products.data.length > 0 ? (
          <div className='product-container'>
            {products.data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <NotFound>Currently No Products Available</NotFound>
        )}

        {/* loading gif for pagination(show before fetching more product) */}
        {searchParam.toString()
          ? filterProducts.next && (
              <div ref={ref}>
                <PaginationLoading />
              </div>
            )
          : products.next && (
              <div ref={ref}>
                <PaginationLoading />
              </div>
            )}
      </SidebarLayout>
    </RootLayout>
  );
};
export default WomenProducts;
