import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AllProducts from "../components/AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchWomenProducts } from "../redux/slices/ProductSlice";
import Loading from "../components/Loading";
import ShowError from "../components/ShowError";
import axiosInstance from "../axios/AxiosInstance";
import { useParams } from "react-router-dom";

const WomenProducts = () => {
  const {
    womenProducts: { products, subCategory, status, error },
  } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const { subSlug } = useParams();

  const fetchSubCategoryProducts = async () => {
    const res = await axiosInstance.get(`/product/${subSlug}`);
    // console.log(res.data.products);
    setSubCategoryProducts([...res.data.products]);
  };

  useEffect(() => {
    if (status === "idle") dispatch(fetchWomenProducts());
  }, []);

  useEffect(() => {
    if (subSlug) fetchSubCategoryProducts();
  }, [subSlug]);

  if (status === "pending") return <Loading />;

  if (status == "error") return <ShowError message={error} />;

  return (
    <Layout>
     <div style={{ minHeight: "calc(100vh - 100px )" }}>
        {
          // if subSlug is present then it's mean i have to show All Products that belong to sub category
          subSlug ? (
            <AllProducts
              urlSlug={"Women's-Wardrobe"}
              products={subCategoryProducts}
              subCategory={subCategory}
            />
          ) : (
            <AllProducts
              urlSlug={"Women's-Wardrobe"}
              products={products}
              subCategory={subCategory}
            />
          )
        }
      </div>
    </Layout>
  );
};

export default WomenProducts;
