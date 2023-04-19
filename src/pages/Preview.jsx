import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PreviewProduct from "../components/Preview/PreviewProduct";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReturnPolicy from "../components/ReturnPolicy";
import Loading from "../components/Loading";
import axiosInstance from "../axios/AxiosInstance";

const Preview = () => {
  const { productId } = useParams();
  const [previewProduct, setPreviewProduct] = useState({});
  // console.log(productId);

  const getProductForPreview = async () => {
    const res = await axiosInstance.get(`/product/single/${productId}`);
    // console.log(res.data.product);
    setPreviewProduct({ ...res.data.product });
  };

  useEffect(() => {
    setTimeout(()=>{
      getProductForPreview();
    },1000)
  }, []);

  return (
    <Layout>
      <div style={{ minHeight: "calc(100vh - 130px )" }}>
        {Object.keys(previewProduct).length === 0 ? (
          <Loading />
        ) : (
          <PreviewProduct product={previewProduct} />
        )}

      </div>
        <ReturnPolicy />
    </Layout>
  );
};

export default Preview;
