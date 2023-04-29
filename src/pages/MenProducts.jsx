import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AllProducts from "../components/AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenProducts } from "../redux/slices/ProductSlice";
import Loading from "../components/Loading";
import ShowError from "../components/ShowError";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/AxiosInstance";

const MenProducts = () => {
  const { menProducts: { products, subCategory, status, error }} = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const { subSlug } = useParams();

  const fetchSubCategoryProducts = async () => {
    const res = await axiosInstance.get(`/product/${subSlug}`);
    // console.log(res.data.products);
    setSubCategoryProducts([...res.data.products]);
  };

  useEffect(() => {
    if (status === "idle") dispatch(fetchMenProducts());
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
              urlSlug={"Men's-Wardrobe"}
              products={subCategoryProducts}
              subCategory={subCategory}
            />
          ) : (
            <AllProducts
              urlSlug={"Men's-Wardrobe"}
              products={products}
              subCategory={subCategory}
            />
          )
        }
      </div>
    </Layout>
  );
};

export default MenProducts;
