import {SET_SONGS, SET_TITLE, SET_RANK, SET_BGIMAGE, SET_APPEAR} from "./constants";

const defaultState = {
  songs: [],
  title: "",
  rank: false,
  bgImage: "",
  set(key, value) {
    return {...this, [key]: value};
  },
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SONGS:
      return state.set("songs", payload);
    case SET_TITLE:
      return state.set("title", payload);
    case SET_RANK:
      return state.set("rank", payload);
    case SET_BGIMAGE:
      return state.set("bgImage", payload);
    default:
      return state;
  }
};
