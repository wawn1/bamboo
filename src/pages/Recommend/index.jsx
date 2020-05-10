import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import LazyLoad, {forceCheck} from "react-lazyload";

import {reqBanner, reqRecommendList, OK} from "../../api";
import Loading from "../../components/Loading";
import _Slider from "../../components/Slider";
import Scroll from "../../components/Scroll";
import {sliderConnect, recommendConnect, recommendListConnect} from "./store/connects";
import "./index.scss";
import loadingImg from "common/image/loading.gif";

const Slider = sliderConnect(_Slider);

const _RecommendList = ({recommendList}) => {
  return (
    <div className="recommend-list">
      <h1 className="list-title">热门歌单推荐</h1>
      <div className="list-container">
        {recommendList.map(({name, picUrl, playCount}) => {
          return (
            <div className="list-item" key={name}>
              <div className="imgWrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={loadingImg} alt="music" />}>
                  <img src={picUrl + "?param=300x300"} width="100%" height="100%" alt="" />
                </LazyLoad>
                <div className="imgWrapper__playCount">
                  <i className="icon-play-mini"></i>
                  <span>{` ${~~(playCount / 10000)}万`}</span>
                </div>
              </div>
              <div className="desc">{name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
_RecommendList.defaultProps = {
  recommendList: [],
};
_RecommendList.propTypes = {
  recommendList: PropTypes.array,
};

const RecommendList = recommendListConnect(_RecommendList);

const Recommend = ({hasBottom, enterLoading, pullDownLoading, setBannerList, setRecommendList}) => {
  useEffect(() => {
    reqBanner().then((res) => {
      if (res.code === OK) {
        setBannerList(res["banners"]);
      }
    });
  }, []);
  useEffect(() => {
    reqRecommendList().then((res) => {
      if (res.code === OK) {
        setRecommendList(res["result"]);
      }
    });
  }, []);
  const bottomstl = hasBottom ? {bottom: "60px"} : {};
  return (
    <div className="recommend" style={bottomstl}>
      <Scroll probeType={3} onScroll={forceCheck}>
        <Slider />
        <RecommendList />
        {enterLoading ? <Loading /> : null}
      </Scroll>
    </div>
  );
};
export default recommendConnect(Recommend);
