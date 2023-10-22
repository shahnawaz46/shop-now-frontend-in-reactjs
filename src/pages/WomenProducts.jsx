import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// components
import RootLayout from '../components/Layout/RooLayout';
import ProductCard from '../components/ProductCard';
import { fetchWomenProducts } from '../redux/slices/ProductSlice';
import Loading from '../components/Loading';
import axiosInstance from '../axios/AxiosInstance';
import SidebarLayout from '../components/Layout/SidebarLayout';
import NotFound from '../components/NotFound';

const WomenProducts = () => {
  const {
    womenProducts: { products, subCategory, status },
  } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  const [subProducts, setSubProducts] = useState({
    status: 'loading',
    item: [],
  });
  const { subSlug } = useParams();

  const fetchSubCategoryProducts = async () => {
    setSubProducts((prev) => ({ ...prev, status: 'loading' }));
    const res = await axiosInstance.get(`/product/all/${subSlug}`);
    setSubProducts({ status: 'success', item: res.data.products });
  };

  useEffect(() => {
    if (status === 'idle') dispatch(fetchWomenProducts());
  }, []);

  useEffect(() => {
    if (subSlug) fetchSubCategoryProducts();
  }, [subSlug]);

  if (status === 'pending')
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Loading />;
      </div>
    );

  return (
    <RootLayout>
      <SidebarLayout subCategory={subCategory} subSlug={"Women's-Wardrobe"}>
        {subSlug ? (
          subProducts.status === 'loading' ? (
            <div
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <Loading />
            </div>
          ) : subProducts.item.length > 0 ? (
            <div className="product-container">
              {subProducts.item.map((product) => (
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
