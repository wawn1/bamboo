import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "swiper/css/swiper.css";
import Swiper from "swiper";

import "./index.scss";

const Slider = ({bannerList}) => {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  useEffect(() => {
    if (bannerList.length) {
      let sliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el: ".swiper-pagination"},
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length]);

  return (
    <div className="slider-container">
      <div className="swiper-wrapper">
        {bannerList.map(({imageUrl, encodeId}, idx) => {
          return (
            <div className="swiper-slide" key={encodeId + idx}>
              <div className="slider-nav">
                <img src={imageUrl} width="100%" alt="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

Slider.defaultProps = {
  bannerList: [],
};
Slider.propTypes = {
  bannerList: PropTypes.array,
};
export default Slider;
