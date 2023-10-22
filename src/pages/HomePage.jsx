import React from 'react';
import RootLayout from '../components/Layout/RooLayout';
import Banner from '../components/HomePage/Banner';
import Card from '../components/HomePage/Card';
import TopTrending from '../components/HomePage/TopTrending';
import TopRated from '../components/HomePage/TopRated';

const HomePage = () => {
  return (
    <RootLayout>
      <Banner />
      <Card />
      <TopTrending />
      <TopRated />
    </RootLayout>
  );
};

export default HomePage;
