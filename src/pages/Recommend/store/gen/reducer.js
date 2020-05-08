import {SET_BANNERLIST,SET_RECOMMENDLIST,SET_ENTERLOADING,SET_PULLDOWNLOADING} from "./constants";

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_BANNERLIST:
  return state.set("bannerList", payload);
    case SET_RECOMMENDLIST:
  return state.set("recommendList", payload);
    case SET_ENTERLOADING:
  return state.set("enterLoading", payload);
    case SET_PULLDOWNLOADING:
  return state.set("pullDownLoading", payload);
    default:
      return state;
  }
};