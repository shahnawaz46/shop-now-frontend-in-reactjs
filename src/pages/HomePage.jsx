import React from "react";
import Layout from "../components/Layout";
import Banner from "../components/HomePage/Banner";
import Card from '../components/HomePage/Card'
import Products from '../components/HomePage/Products';
import TopSelling from "../components/HomePage/TopSelling";
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <Layout>
      <Banner />
      <Card />
      <Products />
      <TopSelling />
    </Layout>
  );
};

export default HomePage;
