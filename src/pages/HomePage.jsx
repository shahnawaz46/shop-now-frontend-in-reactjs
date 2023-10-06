import React from 'react';
import Layout from '../components/Layout';
import Banner from '../components/HomePage/Banner';
import Card from '../components/HomePage/Card';
import TopTrending from '../components/HomePage/TopTrending';
import TopRated from '../components/HomePage/TopRated';

const HomePage = () => {
  return (
    <Layout>
      <Banner />
      <Card />
      <TopTrending />
      <TopRated />
    </Layout>
  );
};

export default HomePage;
