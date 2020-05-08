import {SET_BANNERLIST, SET_RECOMMENDLIST, SET_ENTERLOADING, SET_PULLDOWNLOADING} from "./constants";

export function setBannerList(bannerList) {
  return {
    type: SET_BANNERLIST,
    payload: bannerList,
  };
}

export function setRecommendList(recommendList) {
  return (dispatch) => {
    dispatch({
      type: SET_RECOMMENDLIST,
      payload: recommendList,
    });
    dispatch(setEnterLoading(false));
  };
}

export function setEnterLoading(enterLoading) {
  return {
    type: SET_ENTERLOADING,
    payload: enterLoading,
  };
}

export function setPullDownLoading(pullDownLoading) {
  return {
    type: SET_PULLDOWNLOADING,
    payload: pullDownLoading,
  };
}
