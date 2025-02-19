import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// components
import RootLayout from '../components/Layout/RooLayout';
import Banner from '../components/HomePage/Banner';
import Card from '../components/HomePage/Card';
import TopTrending from '../components/HomePage/TopTrending';
import TopRated from '../components/HomePage/TopRated';
import axiosInstance from '../axios/AxiosInstance';
import { API_STATUS } from '../utils/Constants';
import ScreenLoading from '../components/Loaders/ScreenLoading';

const HomePage = () => {
  const [bannerData, setBannerData] = useState({});
  const [loading, setLaoding] = useState(API_STATUS.LOADING);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get('/banner');
        setBannerData(res.data);
        setLaoding(API_STATUS.SUCCESS);
      } catch (err) {
        setLaoding(API_STATUS.FAILED);
        toast.error(err?.response?.data?.error || err?.message);
      }
    })();
  }, []);

  if (loading === API_STATUS.LOADING) {
    return <ScreenLoading />;
  }

  return (
    <RootLayout>
      <Banner bannerData={bannerData} />
      <Card />
      <TopTrending />
      <TopRated />
    </RootLayout>
  );
};

export default HomePage;
