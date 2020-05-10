import {SET_SINGERS,SET_CURRENTSINGER,SET_SELECTSINGER} from "./constants";

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SINGERS:
  return state.set("singers", payload);
    case SET_CURRENTSINGER:
  return state.set("currentSinger", payload);
    case SET_SELECTSINGER:
  return state.set("selectSinger", payload);
    default:
      return state;
  }
};