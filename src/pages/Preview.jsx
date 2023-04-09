import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PreviewProduct from "../components/PreviewProduct";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReturnPolicy from "../components/ReturnPolicy";
import Loading from "../components/Loading";

const Preview = () => {
  const { productId } = useParams();
  const [previewProduct, setPreviewProduct] = useState({});
  console.log(productId);

  const getProductForPreview = async () => {
    const res = await axios.post(
      `http://localhost:9000/api/product/single/${productId}`
    );
    console.log(res.data.product);
    setPreviewProduct({ ...res.data.product });
  };

  useEffect(() => {
    getProductForPreview();
  }, []);

  return (
    <Layout>
      <div style={{ minHeight: "calc(100vh - 140px )" }}>
        {Object.keys(previewProduct).length === 0 ? (
          <Loading />
        ) : (
          <PreviewProduct previewProduct={previewProduct} />
        )}

        <ReturnPolicy />
      </div>
    </Layout>
  );
};

export default Preview;
