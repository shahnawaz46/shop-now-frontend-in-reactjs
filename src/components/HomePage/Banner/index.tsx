// components
import './style.css';
import CustomCarousel from '../../common/CustomCarousel';
import { IProductBanner } from '../../../types/interfaces/product.interface';

const Banner = ({ bannerData }: { bannerData: IProductBanner }) => {
  return (
    <div>
      {/* for large devices(because images are differents) */}
      <div className="computer-banner-container">
        <CustomCarousel items={bannerData?.computerBanner || []} />
      </div>

      {/* for small devices(because images are differents) */}
      <div className="mobile-banner-main-position-box">
        <CustomCarousel items={bannerData?.mobileBanner || []} />
      </div>
    </div>
  );
};

export default Banner;
