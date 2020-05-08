import {SET_BANNERLIST,SET_RECOMMENDLIST,SET_ENTERLOADING,SET_PULLDOWNLOADING} from "./constants";

export function setBannerList(bannerList) {
    return {
      type: SET_BANNERLIST,
      payload: bannerList,
    };
  }

export function setRecommendList(recommendList) {
    return {
      type: SET_RECOMMENDLIST,
      payload: recommendList,
    };
  }

export function toggleEnterLoading() {
      return (dispatch, getState) => {
        const {enterLoading} = getState();
        dispatch({
          type: SET_ENTERLOADING,
          payload: !enterLoading,
        });
      };
    }

export function setEnterLoading(enterLoading) {
      return {
        type: SET_ENTERLOADING,
        payload: enterLoading,
      };
    }

export function togglePullDownLoading() {
      return (dispatch, getState) => {
        const {pullDownLoading} = getState();
        dispatch({
          type: SET_PULLDOWNLOADING,
          payload: !pullDownLoading,
        });
      };
    }

export function setPullDownLoading(pullDownLoading) {
      return {
        type: SET_PULLDOWNLOADING,
        payload: pullDownLoading,
      };
    }