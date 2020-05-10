import {connect} from "react-redux";
import {setBannerList, setRecommendList} from "./actions";
// connect(({})=>({}),{})

export const recommendConnect = connect(
  ({recommend, player}) => {
    const {enterLoading, pullDownLoading} = recommend;
    const hasBottom = player.playList.length > 0;
    return {hasBottom, enterLoading, pullDownLoading};
  },
  {
    setBannerList,
    setRecommendList,
  }
);
export const sliderConnect = connect(({recommend: {bannerList}}) => ({bannerList}), {});
export const recommendListConnect = connect(({recommend: {recommendList}}) => ({recommendList}), {});
