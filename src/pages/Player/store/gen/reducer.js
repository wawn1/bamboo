import {SET_SINGER,SET_PLAYING,SET_FULLSCREEN,SET_PLAYLIST,SET_SEQUENCELIST,SET_MODE,SET_CURRENTINDEX,SET_CURRENTSONG,SET_PLAYINGLYRIC,SET_CURRENTLINENUM,SET_CURRENTLYRIC,SET_CURRENTTIME,SET_SHOWPLAYLIST} from "./constants";

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SINGER:
  return state.set("singer", payload);
    case SET_PLAYING:
  return state.set("playing", payload);
    case SET_FULLSCREEN:
  return state.set("fullScreen", payload);
    case SET_PLAYLIST:
  return state.set("playList", payload);
    case SET_SEQUENCELIST:
  return state.set("sequenceList", payload);
    case SET_MODE:
  return state.set("mode", payload);
    case SET_CURRENTINDEX:
  return state.set("currentIndex", payload);
    case SET_CURRENTSONG:
  return state.set("currentSong", payload);
    case SET_PLAYINGLYRIC:
  return state.set("playingLyric", payload);
    case SET_CURRENTLINENUM:
  return state.set("currentLineNum", payload);
    case SET_CURRENTLYRIC:
  return state.set("currentLyric", payload);
    case SET_CURRENTTIME:
  return state.set("currentTime", payload);
    case SET_SHOWPLAYLIST:
  return state.set("showPlayList", payload);
    default:
      return state;
  }
};