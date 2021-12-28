import React, { useState } from 'react';
import '../css/Banner.css';
import { useSelector } from 'react-redux'
import { giveMeBannerImages } from '../../axios/UlrConfig';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Blank from '../images/blankImage.png';
import Blank2 from '../images/blankImage2.png';



const Banner = () => {
    const [current, setCurrent] = useState(0);
    const { bannerDetail } = useSelector(state => state.banner);

    const length = bannerDetail?.length > 0 ? bannerDetail.length : 0

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return (
        <>
            <div className="banner-main-position-box">
                <img src={Blank} className="banner-blank-image" alt="" />
                <AiOutlineLeft className="banner-left-arrow banner-arrow-box" onClick={prevSlide} />
                <AiOutlineRight className="banner-right-arrow banner-arrow-box" onClick={nextSlide} />
                <div className="banner-main-box">
                    {
                        bannerDetail?.map((value, index) =>
                            <div key={index} className={index === current ? 'slide active' : 'slide'}>
                                {
                                    index === current && (
                                        <img src={giveMeBannerImages(value.computerBannerImage)} className="banner-image" alt="" />
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>


            {/* for mobile */}
            <div className="mobile-banner-main-position-box">
                <img src={Blank2} className="banner-blank-image" alt="" />
                <AiOutlineLeft className="banner-left-arrow banner-arrow-box" onClick={prevSlide} />
                <AiOutlineRight className="banner-right-arrow banner-arrow-box" onClick={nextSlide} />
                <div className="banner-main-box">
                    {
                        bannerDetail?.map((value, index) => {
                            return (
                                <div key={index} className={index === current ? 'slide active' : 'slide'}>
                                    {
                                        index === current && (
                                            <img src={giveMeBannerImages(value.mobileBannerImage)} className="banner-image" alt="" />
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Banner