import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'react-router';
// import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import { ScreenLoading } from '../components/Loaders';
import SidebarLayout from '../components/Layout/SidebarLayout';
import axiosInstance from '../axios/AxiosInstance';
import useFetch from '../components/common/useFetch';
import { filterProductsInitialState } from '../utils/Constants';
import ProductCardWrapper from '../components/Product/ProductCardWrapper';

const NewProducts = () => {
  const {
    data: newestProducts,
    isLoading,
    updateData,
  } = useFetch('newestProducts', '/product/newest');

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
          ...(newestProducts?.products?.item || []),
          ...(res.data?.products?.item || []),
        ],
      };

      updateData('newestProducts', 'products', products); // updating state
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  const fetchFilteredProducts = async (url, fetchMore = false) => {
    try {
      const res = await axiosInstance.get(url);
      setFilterProducts((prev) => ({
        next: res.data.products.next,
        item: fetchMore
          ? [...prev.item, ...res.data.products.item]
          : res.data.products.item,
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
        fetchFilteredProducts(`/product/newest?${filteredQuery}`)
      );
    }
  }, [searchParam.toString()]);

  // for pagination after reach to bottom i am fetching products if next url is available
  useEffect(() => {
    if (inView) {
      if (searchParam.toString()) {
        fetchFilteredProducts(filterProducts.next, true);
      } else if (newestProducts?.products.next) {
        fetchMoreProducts(newestProducts?.products.next);
      }
    }
  }, [inView]);

  if (isLoading) return <ScreenLoading />;

  // first i am checking if query is present in url then showing filter products that i am getting based on query
  // if query is not present in url then i am showing newest products
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
        <ProductCardWrapper
          isLoading={searchParam.toString() ? isPending : false}
          products={
            searchParam.toString()
              ? filterProducts.item
              : newestProducts?.products?.item
          }
          errorMsg={
            searchParam.toString()
              ? 'No Filtered Products Available'
              : 'Currently No Products Available'
          }
          hasFetchNext={
            searchParam.toString()
              ? filterProducts.next
              : newestProducts?.products?.next
          }
          fetchNextRef={ref} // in react 19, now we can pass `ref` as a prop for function components, without using forwarRef in child component
        />
      </SidebarLayout>
    </RootLayout>
  );
};

export default NewProducts;
