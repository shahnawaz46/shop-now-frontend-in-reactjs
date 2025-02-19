// components
import './style.css';
import Banner1 from '../../../asset/Banner_1.png';
import Banner2 from '../../../asset/Banner_2.png';
import Banner3 from '../../../asset/Banner_3.png';
import BannerMobile1 from '../../../asset/BannerMobile_1.png';
import BannerMobile2 from '../../../asset/BannerMobile_2.png';
import BannerMobile3 from '../../../asset/BannerMobile_3.png';
import CustomCarousel from '../../common/CustomCarousel';

const bannerDetail = [Banner1, Banner2, Banner3];
const bannerMobileDetail = [BannerMobile1, BannerMobile2, BannerMobile3];

const Banner = () => {
  return (
    <div>
      {/* for large devices(because images are differents) */}
      <div className="computer-banner-container">
        <CustomCarousel items={bannerDetail} />
      </div>

      {/* for small devices(because images are differents) */}
      <div className="mobile-banner-main-position-box">
        <CustomCarousel items={bannerMobileDetail} />
      </div>
    </div>
  );
};

export default Banner;
