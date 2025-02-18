import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { ScreenLoading, PaginationLoading } from '../components/Loaders';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';
import useFetch from '../components/common/useFetch';
import { API_STATUS } from '../utils/Constants';

const MenProducts = () => {
  const {
    data: menProducts,
    status,
    updateData,
  } = useFetch('menProducts', ["/category/Men's-Wardrobe", '/product/all/Men']);

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
      const products = {
        next: res.data?.products?.next,
        item: [
          ...(menProducts?.products?.item || []),
          ...(res.data?.products?.item || []),
        ],
      };

      updateData('menProducts', 'products', products); // updating state
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  // fetching filteredProducts based on price and sub-category
  const fetchFilteredProducts = debounce(async (url, fetchMore = false) => {
    try {
      const res = await axiosInstance.get(url);
      setFilterProducts((prev) => ({
        ...prev,
        status: 'success',
        next: res.data.products.next,
        item: fetchMore
          ? [...prev.item, ...res.data.products.subCategoryProducts]
          : res.data.products.subCategoryProducts,
      }));
    } catch (err) {
      setFilterProducts((prev) => ({ ...prev, status: 'failed' }));
      toast.error(err?.response?.data?.error || err?.message);
    }
  });

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
      } else if (menProducts?.products.next) {
        fetchMoreProducts(menProducts?.products.next);
      }
    }
  }, [inView]);

  if (status === API_STATUS.LOADING) return <ScreenLoading />;

  // first i am checking if query is present in url then showing products that i am getting based on query
  // if query is not present in url then i am showing products that is present in redux
  return (
    <RootLayout>
      <SidebarLayout subCategory={menProducts?.categories || []}>
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
        ) : menProducts?.products?.item?.length > 0 ? (
          <div className="product-container">
            {menProducts?.products?.item?.map((product) => (
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
          : menProducts?.products?.next && (
              <div ref={ref}>
                <PaginationLoading />
              </div>
            )}
      </SidebarLayout>
    </RootLayout>
  );
};

export default MenProducts;
