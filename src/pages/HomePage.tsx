// components
import RootLayout from "../components/Layout/RootLayout";
import Banner from "../components/HomePage/Banner";
import Card from "../components/HomePage/Card";
import TopTrending from "../components/HomePage/TopTrending";
import TopRated from "../components/HomePage/TopRated";
import ScreenLoading from "../components/Loaders/ScreenLoading";
import useFetch from "../hooks/useFetch";
import { IProductBanner } from "../types/interfaces/product.interface";

const HomePage = () => {
  const { isLoading, data } = useFetch<IProductBanner>("banner", "/banner");

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
