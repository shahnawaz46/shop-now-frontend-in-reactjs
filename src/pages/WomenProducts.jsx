import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
// import debounce from 'lodash/debounce';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import { ScreenLoading } from '../components/Loaders';
import useFetch from '../components/common/useFetch';
import { filterProductsInitialState } from '../utils/Constants';
import ProductCardWrapper from '../components/Product/ProductCardWrapper';

const WomenProducts = () => {
  const {
    data: womenProducts,
    isLoading,
    updateData,
  } = useFetch('womenProducts', [
    "/category/all/Women's-Wardrobe",
    '/product/all/Women',
  ]);

  const [filterProducts, setFilterProducts] = useState(
    filterProductsInitialState
  );
  const [isPending, startTransition] = useTransition(); // using for handle filterProducts
  const searchParam = useSearchParams()[0]; // useSearchParams return two value first is searchState and second is searchState function
  const { ref, inView } = useInView({ threshold: 1 });

  const fetchMoreProducts = async (url) => {
    try {
      const res = await axiosInstance.get(url);
      const products = {
        next: res.data?.products?.next,
        item: [
          ...(womenProducts?.products?.item || []),
          ...(res.data?.products?.item || []),
        ],
      };

      updateData('womenProducts', 'products', products); // updating state
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  // fetching filteredProducts based on price filter and sub-category
  const fetchFilteredProducts = async (url, fetchMore = false) => {
    try {
      const res = await axiosInstance.get(url);
      setFilterProducts((prev) => ({
        next: res.data.products.next,
        count: res.data.product?.count,
        item: fetchMore
          ? [...prev.item, ...res.data.products.subCategoryProducts]
          : res.data.products.subCategoryProducts,
      }));
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  // useEffect for calling filteredProducts function based on query changed in url
  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) {
      startTransition(() =>
        fetchFilteredProducts(
          `/product/filtered?${filteredQuery}&targetAudience=Women`
        )
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

  if (isLoading) return <ScreenLoading />;

  // first i am checking if query is present in url then showing filter products that i am getting based on query
  // if query is not present in url then i am showing women products
  return (
    <RootLayout>
      <SidebarLayout subCategory={womenProducts?.categories || []}>
        <ProductCardWrapper
          isLoading={searchParam.toString() ? isPending : false}
          products={
            searchParam.toString()
              ? filterProducts.item
              : womenProducts?.products?.item
          }
          errorMsg={
            searchParam.toString()
              ? 'No Filtered Products Available'
              : 'Currently No Products Available'
          }
          hasFetchNext={
            searchParam.toString()
              ? filterProducts.next
              : womenProducts?.products?.next
          }
          fetchNextRef={ref} // in react 19, now we can pass `ref` as a prop for function components, without using forwarRef in child component
        />
      </SidebarLayout>
    </RootLayout>
  );
};
export default WomenProducts;
