import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';
import { ScreenLoading, PaginationLoading } from '../components/Loaders';
import useFetch from '../components/common/useFetch';
import { API_STATUS } from '../utils/Constants';

const WomenProducts = () => {
  const {
    data: womenProducts,
    status,
    updateData,
  } = useFetch('womenProducts', [
    "/category/Women's-Wardrobe",
    '/product/all/Women',
  ]);

  const [filterProducts, setFilterProducts] = useState({
    status: 'loading',
    item: [],
  });

  const searchParam = useSearchParams()[0]; // useSearchParams return two value first is searchState and second is searchState function

  const { ref, inView } = useInView({ threshold: 1 });

  const fetchMoreProducts = async (url) => {
    try {
      const res = await axiosInstance.get(url);
      let products = {
        ...womenProducts?.products,
        next: res.data?.products?.next,
      };
      products?.data?.push(...res.data?.products?.data);
      updateData('womenProducts', 'products', products); // updating state
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
      } else if (womenProducts?.products.next) {
        fetchMoreProducts(womenProducts?.products.next);
      }
    }
  }, [inView]);

  if (status === API_STATUS.LOADING) return <ScreenLoading />;

  return (
    <RootLayout>
      <SidebarLayout subCategory={womenProducts?.categories || []}>
        {searchParam.toString() ? (
          filterProducts.status === 'loading' ? (
            <ScreenLoading position="absolute" />
          ) : filterProducts.item.length > 0 ? (
            <div className="product-container">
              {filterProducts.item.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NotFound>No Filtered Products Available</NotFound>
          )
        ) : womenProducts?.products?.data?.length > 0 ? (
          <div className="product-container">
            {womenProducts?.products?.data?.map((product) => (
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
          : womenProducts?.products?.next && (
              <div ref={ref}>
                <PaginationLoading />
              </div>
            )}
      </SidebarLayout>
    </RootLayout>
  );
};
export default WomenProducts;
