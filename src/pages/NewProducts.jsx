import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { ScreenLoading, PaginationLoading } from '../components/Loaders';
import NotFound from '../components/NotFound';
import SidebarLayout from '../components/Layout/SidebarLayout';
import axiosInstance from '../axios/AxiosInstance';
import useFetch from '../components/common/useFetch';
import { filterProductsInitialState } from '../utils/Constants';

const NewProducts = () => {
  const {
    data: newestProducts,
    isLoading,
    updateData,
  } = useFetch('newestProducts', '/product/newest');

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
          ...(newestProducts?.products?.item || []),
          ...(res.data?.products?.item || []),
        ],
      };

      updateData('newestProducts', 'products', products); // updating state
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  const fetchFilteredProducts = debounce(async (url, fetchMore = false) => {
    try {
      const res = await axiosInstance.get(url);
      setFilterProducts((prev) => ({
        isLoading: false,
        next: res.data.products.next,
        item: fetchMore
          ? [...prev.item, ...res.data.products.item]
          : res.data.products.item,
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
      fetchFilteredProducts(`/product/newest?${filteredQuery}`);
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
        ) : newestProducts?.products?.item?.length > 0 ? (
          <div className="product-container">
            {newestProducts?.products?.item?.map((product) => (
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
          : newestProducts?.products?.next && (
              <div ref={ref}>
                <PaginationLoading />
              </div>
            )}
      </SidebarLayout>
    </RootLayout>
  );
};

export default NewProducts;
