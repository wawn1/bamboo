import {SET_SINGERS,SET_CURRENTSINGER,SET_SELECTSINGER} from "./constants";

export function setSingers(singers) {
    return {
      type: SET_SINGERS,
      payload: singers,
    };
  }

export function setCurrentSinger(currentSinger) {
    return {
      type: SET_CURRENTSINGER,
      payload: currentSinger,
    };
  }

export function setSelectSinger(selectSinger) {
    return {
      type: SET_SELECTSINGER,
      payload: selectSinger,
    };
  }