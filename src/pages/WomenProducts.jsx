import { useEffect, useState } from 'react';
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
import { filterProductsInitialState } from '../utils/Constants';

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
  const fetchFilteredProducts = debounce(async (url, fetchMore = false) => {
    try {
      const res = await axiosInstance.get(url);
      setFilterProducts((prev) => ({
        isLoading: false,
        next: res.data.products.next,
        item: fetchMore
          ? [...prev.item, ...res.data.products.subCategoryProducts]
          : res.data.products.subCategoryProducts,
      }));
    } catch (err) {
      setFilterProducts((prev) => ({ ...prev, isLoading: false }));
      toast.error(err?.response?.data?.error || err?.message);
    }
  });

  // useEffect for calling filteredProducts function based on query changed in url
  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) {
      setFilterProducts(filterProductsInitialState);
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

  if (isLoading) return <ScreenLoading />;

  return (
    <RootLayout>
      <SidebarLayout subCategory={womenProducts?.categories || []}>
        {searchParam.toString() ? (
          filterProducts.isLoading ? (
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
        ) : womenProducts?.products?.item?.length > 0 ? (
          <div className="product-container">
            {womenProducts?.products?.item?.map((product) => (
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
