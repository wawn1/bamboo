import {SET_QUERY,SET_SHOWFLAG,SET_RESULT,SET_SEARCHHISTORY} from "./constants";

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_QUERY:
  return state.set("query", payload);
    case SET_SHOWFLAG:
  return state.set("showFlag", payload);
    case SET_RESULT:
  return state.set("result", payload);
    case SET_SEARCHHISTORY:
  return state.set("searchHistory", payload);
    default:
      return state;
  }
};