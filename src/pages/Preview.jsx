import React, { useEffect, useState } from 'react';
import RootLayout from '../components/Layout/RooLayout';
import PreviewProduct from '../components/Preview/PreviewProduct';
import { useParams } from 'react-router-dom';
import ReturnPolicy from '../components/ReturnPolicy';
import Loading from '../components/Loading';
import axiosInstance from '../axios/AxiosInstance';

const Preview = () => {
  const { productId } = useParams();

  const [previewProduct, setPreviewProduct] = useState({});

  const getProductForPreview = async () => {
    // using promise.all for calling multiple api paralleley
    // 1st API for getting single product based on productId
    // 2nd API for updating top-trending product count based on event
    const [previewRes, trendingRes] = await Promise.all([
      axiosInstance.get(`/product/single/${productId}`),
      axiosInstance.post('/product/top-trending', {
        productId,
        userId: localStorage.getItem('__f_id'),
        eventType: 'visit',
      }),
    ]);
    setPreviewProduct({ ...previewRes.data.product });
  };

  useEffect(() => {
    setTimeout(() => {
      getProductForPreview();
    }, 1000);
  }, []);

  if (Object.keys(previewProduct).length === 0) return <Loading />;

  return (
    <RootLayout>
      <PreviewProduct
        previewProduct={previewProduct}
        setPreviewProduct={setPreviewProduct}
      />
      <ReturnPolicy />
    </RootLayout>
  );
};

export default Preview;
