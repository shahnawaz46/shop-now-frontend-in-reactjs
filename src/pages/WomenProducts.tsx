import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useInView } from "react-intersection-observer";
import debounce from "lodash/debounce";

// components
import RootLayout from "../components/Layout/RootLayout";
import axiosInstance from "../axios/AxiosInstance";
import SidebarLayout from "../components/Layout/SidebarLayout";
import { ScreenLoading } from "../components/Loaders";
import useFetch from "../hooks/useFetch";
import { filterProductsInitialState } from "../utils/Constants";
import ProductCardWrapper from "../components/Product/ProductCardWrapper";
import { IAllProducts } from "../types/interfaces/product.interface";
import { ICategory } from "../types/interfaces/category.interface";
import { handleAxiosError } from "../utils/HandleAxiosError";

const WomenProducts = () => {
  const {
    data: womenProducts,
    isLoading,
    updateData,
  } = useFetch<{ categories: ICategory[]; products: IAllProducts }>(
    "womenProducts",
    ["/category/all/Women's-Wardrobe", "/product/all/Women"]
  );

  const [filterProducts, setFilterProducts] = useState<IAllProducts>(
    filterProductsInitialState
  );
  const [isPending, setIsPending] = useState<boolean>(false); // using for handle filterProducts
  const searchParam = useSearchParams()[0]; // useSearchParams return two value first is searchState and second is searchState function
  const { ref, inView } = useInView({ threshold: 1 });

  const fetchMoreProducts = async (url: string) => {
    try {
      const res = await axiosInstance.get(url);
      const products = {
        next: res.data?.products?.next,
        items: [
          ...(womenProducts?.products?.items || []),
          ...(res.data?.products?.items || []),
        ],
      };

      updateData<IAllProducts>("womenProducts", "products", products); // updating state
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  // fetching filteredProducts based on price filter and sub-category
  const fetchFilteredProducts = async (
    url: string | null,
    fetchMore: boolean = false
  ) => {
    if (!url) return;

    try {
      const res = await axiosInstance.get(url);
      setFilterProducts((prev) => ({
        next: res.data.products.next,

        items: fetchMore
          ? [...prev.items, ...res.data.products.items]
          : res.data.products.items,
      }));
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  // useEffect for calling filteredProducts function based on query changed in url
  const debouncedFetch = useCallback(
    debounce(async (query) => {
      await fetchFilteredProducts(
        `/product/filtered?${query}&targetAudience=Women`
      );
      setIsPending(false);
    }, 600),
    []
  );

  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) {
      setIsPending(true);
      debouncedFetch(filteredQuery);
    }
  }, [searchParam.toString()]);

  // for pagination after reach to bottom i am fetching products if next url is available
  useEffect(() => {
    if (inView) {
      if (searchParam.toString()) {
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
              ? filterProducts.items
              : womenProducts?.products?.items
          }
          errorMsg={
            searchParam.toString()
              ? "No Filtered Products Available"
              : "Currently No Products Available"
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
