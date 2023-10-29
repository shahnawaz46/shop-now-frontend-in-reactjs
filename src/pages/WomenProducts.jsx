import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { fetchWomenProducts } from '../redux/slices/ProductSlice';
import Loading from '../components/Loading';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';

const WomenProducts = () => {
  const dispatch = useDispatch();
  const {
    womenProducts: { products, subCategory, status },
  } = useSelector((state) => state.allProducts);

  const [filterProducts, setFilterProducts] = useState({
    status: 'idle',
    item: [],
  });

  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);

  const fetchFilteredProducts = async (filteredParam) => {
    setFilterProducts((prev) => ({ ...prev, status: 'loading' }));
    try {
      const res = await axiosInstance.get(
        `/product/filtered?${filteredParam}&targetAudience=Women`
      );
      setFilterProducts({
        status: 'success',
        item: res.data.subCategoryProducts,
      });
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  useEffect(() => {
    if (status === 'idle') dispatch(fetchWomenProducts());
  }, []);

  useEffect(() => {
    const filteredQuery = searchParam.toString();
    if (filteredQuery) fetchFilteredProducts(filteredQuery);
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
            <div className="product-container">
              {filterProducts.item.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NotFound>Currently No Products Available</NotFound>
          )
        ) : products.length > 0 ? (
          <div className="product-container">
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
export default WomenProducts;
