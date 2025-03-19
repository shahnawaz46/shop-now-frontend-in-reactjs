import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

// components
import RootLayout from '../components/Layout/RooLayout';
import PreviewProduct from '../components/Preview/PreviewProduct';
import ReturnPolicy from '../components/ReturnPolicy';
import axiosInstance from '../axios/AxiosInstance';
import { ScreenLoading } from '../components/Loaders';

const Preview = () => {
  const { productId } = useParams();

  const [previewProduct, setPreviewProduct] = useState({});

  const getProductForPreview = async () => {
    try {
      // using promise.all for calling multiple api paralleley
      // 1st API for getting single product based on productId
      // 2nd API for updating top-trending product count based on event
      const [previewRes] = await Promise.all([
        axiosInstance.get(`/product/single/${productId}`),
        axiosInstance.post('/product/top-trending', {
          productId,
          userId: localStorage.getItem('__f_id'),
          eventType: 'visit',
        }),
      ]);
      setPreviewProduct({ ...previewRes.data.product });
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getProductForPreview();
    }, 1000);
  }, []);

  if (Object.keys(previewProduct).length === 0) return <ScreenLoading />;

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
