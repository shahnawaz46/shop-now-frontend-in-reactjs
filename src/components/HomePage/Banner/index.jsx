import React, { useEffect, useRef, useState } from "react";
import "./style.css";
// import { useSelector } from 'react-redux'
// import { giveMeBannerImages } from '../../axios/UlrConfig';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Blank from '../../../asset/blankImage.png';
import Blank2 from '../../../asset/blankImage2.png';
import Banner1 from '../../../asset/Banner_1.jpg'
import Banne2 from '../../../asset/Banner_2.jpg'
import Banner3 from '../../../asset/Banner_3.jpg'
import BannerMobile1 from '../../../asset/BannerMobile_1.jpg'
import BannerMobile2 from '../../../asset/BannerMobile_2.jpg'
import BannerMobile3 from '../../../asset/BannerMobile_3.jpg'


const bannerDetail = [Banner1,Banne2,Banner3];
const bannerMobileDetail = [BannerMobile1,BannerMobile2,BannerMobile3];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const timeRef = useRef(null)
  // const { bannerDetail } = useSelector(state => state.banner);

  const length = bannerDetail?.length > 0 ? bannerDetail.length : 0;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(()=>{
    timeRef.current = setInterval(()=>{
        setCurrent(prev=> prev === length - 1 ? 0 : prev + 1)
    },3000)

    return ()=> clearInterval(timeRef.current)
  },[current])

  return (
    <>
      <div className="computer-banner-container">
        <img src={Blank} className="banner-blank-image" alt="" />
        <AiOutlineLeft
          className="banner-left-arrow banner-arrow-box"
          onClick={prevSlide}
        />
        <AiOutlineRight
          className="banner-right-arrow banner-arrow-box"
          onClick={nextSlide}
        />
        <div className="banner-main-box">
          {bannerDetail?.map((value, index) => (
            <div
              key={index}
              className={index === current ? "slide active" : "slide"}
            >
              {index === current && (
                <img
                  src={value}
                  className="banner-image"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* for mobile */}
      <div className="mobile-banner-main-position-box">
        <img src={Blank2} className="banner-blank-image" alt="" />
        <AiOutlineLeft
          className="banner-left-arrow banner-arrow-box"
          onClick={prevSlide}
        />
        <AiOutlineRight
          className="banner-right-arrow banner-arrow-box"
          onClick={nextSlide}
        />
        <div className="banner-main-box">
          {bannerMobileDetail?.map((value, index) => {
            return (
              <div
                key={index}
                className={index === current ? "slide active" : "slide"}
              >
                {index === current && (
                  <img
                    src={value}
                    className="banner-image"
                    alt=""
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Banner;
