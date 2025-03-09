import { lazy } from 'react';

// components
import RootLayout from '../components/Layout/RooLayout';
import Banner from '../components/HomePage/Banner';
import Card from '../components/HomePage/Card';
import ScreenLoading from '../components/Loaders/ScreenLoading';
import useFetch from '../components/common/useFetch';

// lazy loading TopTrending and TopRated
const TopTrending = lazy(() => import('../components/HomePage/TopTrending'));
const TopRated = lazy(() => import('../components/HomePage/TopRated'));

const HomePage = () => {
  const { isLoading, data } = useFetch('banner', '/banner');

  if (isLoading) {
    return <ScreenLoading />;
  }

  return (
    <RootLayout>
      <Banner bannerData={data} />
      <Card />
      <TopTrending />
      <TopRated />
    </RootLayout>
  );
};

export default HomePage;
