// components
import RootLayout from '../components/Layout/RooLayout';
import Banner from '../components/HomePage/Banner';
import Card from '../components/HomePage/Card';
import TopTrending from '../components/HomePage/TopTrending';
import TopRated from '../components/HomePage/TopRated';
import ScreenLoading from '../components/Loaders/ScreenLoading';
import useFetch from '../components/common/useFetch';

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
