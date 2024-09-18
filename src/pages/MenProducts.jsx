import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { fetchMenProducts, updateProducts } from '../redux/slices/ProductSlice';
import { ScreenLoading, PaginationLoading } from '../components/Loaders';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';

const MenProducts = () => {
  const dispatch = useDispatch();
  const { products, subCategory, status } = useSelector(
    (state) => state.allProducts.menProducts
  );

  const [filterProducts, setFilterProducts] = useState({
    status: 'loading',
    next: null,
    item: [],
  });

  const searchParam = useSearchParams()[0]; // useSearchParams return two value first is searchState and second is searchState function

  const { ref, inView } = useInView({ threshold: 1 });

  const fetchMoreProducts = async (url) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch(updateProducts({ stateName: 'menProducts', data: res.data }));
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  // fetching filteredProducts based on price and sub-category
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
        `/product/filtered?${filteredQuery}&targetAudience=Men`
      );
    }
  }, [searchParam.toString()]);

  // for pagination after reach to bottom i am fetching products if next url is available
  useEffect(() => {
    if (inView) {
      if (searchParam.toString()) {
        fetchFilteredProducts(filterProducts.next, true);
      } else if (products.next) {
        fetchMoreProducts(products.next);
      }
    }
  }, [inView]);

  // fetching men products after landing on Men Product Page
  useEffect(() => {
    if (status === 'idle') dispatch(fetchMenProducts());
  }, []);

  if (status === 'pending') return <ScreenLoading />;

  // first i am checking if query is present in url then showing products that i am getting based on query
  // if query is not present in url then i am showing products that is present in redux
  return (
    <RootLayout>
      <SidebarLayout subCategory={subCategory}>
        {searchParam.toString() ? (
          filterProducts.status === 'loading' ? (
            <ScreenLoading />
          ) : filterProducts.item.length > 0 ? (
            <div className="product-container">
              {filterProducts.item.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NotFound>No Filtered Products Available</NotFound>
          )
        ) : products?.data?.length > 0 ? (
          <div className="product-container">
            {products?.data?.map((product) => (
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

export default MenProducts;
