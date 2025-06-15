// components
import "./style.css";
// import CustomCarousel from "../../common/CustomCarousel";
import { IProductBanner } from "../../../types/interfaces/product.interface";
import CustomCarousel from "../../common/CustomCarousel";

const Banner = ({ bannerData }: { bannerData: IProductBanner }) => {
  return (
    <div>
      {/* for large devices(because images are differents) */}
      <div className="computer-banner-container">
        <CustomCarousel
          items={bannerData?.computerBanner || []}
          width={1920}
          height={520}
        />
      </div>

      {/* for small devices(because images are differents) */}
      <div className="mobile-banner-main-position-box">
        <CustomCarousel
          items={bannerData?.mobileBanner || []}
          width={800}
          height={760}
        />
      </div>
    </div>
  );
};

export default Banner;
