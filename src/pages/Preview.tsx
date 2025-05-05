import { useEffect, useState, useTransition } from 'react';
import { useParams } from 'react-router';

// components
import RootLayout from '../components/Layout/RootLayout';
import PreviewProduct from '../components/Preview/PreviewProduct';
import ReturnPolicy from '../components/ReturnPolicy';
import axiosInstance from '../axios/AxiosInstance';
import { ScreenLoading } from '../components/Loaders';
import { IPreviewProduct } from '../types/interfaces/product.interface';
import { handleAxiosError } from '../utils/HandleAxiosError';

const Preview = () => {
  const { productId } = useParams();

  const [previewProduct, setPreviewProduct] = useState<IPreviewProduct>();
  const [isPending, startTransition] = useTransition();

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
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  useEffect(() => {
    startTransition(getProductForPreview);
  }, []);

  if (isPending) return <ScreenLoading />;

  if (!previewProduct) return;

  return (
    <RootLayout>
      {/* title and meta tags for preview page */}
      <title>{previewProduct.productName}</title>
      <meta name="description" content={previewProduct.description} />
      <meta
        name="keywords"
        content={previewProduct.slug.split('-').join(', ')}
      />

      {/* i know previewProduct and setPreviewProduct will not undefined while calling child component */}
      {/* that's why i am doing type-assertion for setPreviewProduct(mean setPreviewProduct will never undefined) */}
      <PreviewProduct
        previewProduct={previewProduct}
        setPreviewProduct={
          setPreviewProduct as React.Dispatch<
            React.SetStateAction<IPreviewProduct>
          >
        }
      />
      <ReturnPolicy />
    </RootLayout>
  );
};

export default Preview;
