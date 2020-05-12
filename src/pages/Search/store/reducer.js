import {SET_QUERY, SET_SHOWFLAG, SET_RESULT, SET_SEARCHHISTORY, SET_GOTOSINGER, SET_ISSEARCHING} from "./constants";

const defaultState = {
  query: "",
  showFlag: false,
  result: [],
  searchHistory: [],
  gotoSinger: () => {},
  isSearching: false,
  set(key, value) {
    return {...this, [key]: value};
  },
};

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
    case SET_GOTOSINGER:
      return state.set("gotoSinger", payload);
    case SET_ISSEARCHING:
      return state.set("isSearching", payload);
    default:
      return state;
  }
};
