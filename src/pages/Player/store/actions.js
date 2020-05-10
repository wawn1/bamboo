import {
  SET_SINGER,
  SET_PLAYING,
  SET_FULLSCREEN,
  SET_PLAYLIST,
  SET_SEQUENCELIST,
  SET_MODE,
  SET_CURRENTINDEX,
  SET_CURRENTSONG,
  SET_PLAYINGLYRIC,
  SET_CURRENTLINENUM,
  SET_CURRENTLYRIC,
  SET_CURRENTTIME,
  SET_SHOWPLAYLIST,
  SET_SONGREADY,
  playMode,
  SET_NEWTIME,
  SET_CURRENTOFFSET,
} from "./constants";
import {shuffle} from "common/js/util";

export function setSinger(singer) {
  return {
    type: SET_SINGER,
    payload: singer,
  };
}

export function togglePlaying() {
  return (dispatch, getState) => {
    const {
      player: {playing},
    } = getState();
    dispatch({
      type: SET_PLAYING,
      payload: !playing,
    });
  };
}

export function setPlaying(playing) {
  return {
    type: SET_PLAYING,
    payload: playing,
  };
}

export function toggleFullScreen() {
  return (dispatch, getState) => {
    const {
      player: {fullScreen},
    } = getState();
    dispatch({
      type: SET_FULLSCREEN,
      payload: !fullScreen,
    });
  };
}

export function setFullScreen(fullScreen) {
  return {
    type: SET_FULLSCREEN,
    payload: fullScreen,
  };
}

export function setPlayList(playList) {
  return {
    type: SET_PLAYLIST,
    payload: playList,
  };
}

export function setSequenceList(sequenceList) {
  return {
    type: SET_SEQUENCELIST,
    payload: sequenceList,
  };
}

export function setMode(mode) {
  return {
    type: SET_MODE,
    payload: mode,
  };
}

export function setCurrentIndex(currentIndex) {
  return {
    type: SET_CURRENTINDEX,
    payload: currentIndex,
  };
}

export function setCurrentSong(currentSong) {
  return {
    type: SET_CURRENTSONG,
    payload: currentSong,
  };
}

export function setPlayingLyric(playingLyric) {
  return {
    type: SET_PLAYINGLYRIC,
    payload: playingLyric,
  };
}

export function setCurrentLineNum(currentLineNum) {
  return {
    type: SET_CURRENTLINENUM,
    payload: currentLineNum,
  };
}

export function setCurrentTime(currentTime) {
  return {
    type: SET_CURRENTTIME,
    payload: currentTime,
  };
}

export function toggleShowPlayList() {
  return (dispatch, getState) => {
    const {
      player: {showPlayList},
    } = getState();
    dispatch({
      type: SET_SHOWPLAYLIST,
      payload: !showPlayList,
    });
  };
}

export function setShowPlayList(showPlayList) {
  return {
    type: SET_SHOWPLAYLIST,
    payload: showPlayList,
  };
}

export function setSongReady(songReady) {
  return {
    type: SET_SONGREADY,
    payload: songReady,
  };
}

export function setNewTime(newTime) {
  return {
    type: SET_NEWTIME,
    payload: newTime,
  };
}

export function setCurrentOffset(currentOffset) {
  return {
    type: SET_CURRENTOFFSET,
    payload: currentOffset,
  };
}

export function setRandomPlayList(songs) {
  return (dispatch) => {
    const index = ~~(songs.length * Math.random());
    dispatch(setPlaying(true));
    dispatch(setFullScreen(true));
    dispatch(setSequenceList(songs));
    dispatch(setPlayList(songs));
    dispatch(setMode(playMode.random));
    dispatch(setCurrentIndex(index));
  };
}

export function setListAndPlay(songs, index) {
  return (dispatch) => {
    dispatch(setPlaying(true));
    dispatch(setFullScreen(true));
    dispatch(setSequenceList(songs));
    dispatch(setPlayList(songs));
    dispatch(setCurrentIndex(index));
  };
}

export function random() {
  return (dispatch, getState) => {
    const {
      player: {playList, playing},
    } = getState();
    let index = ~~(Math.random() * playList.length);
    dispatch(setCurrentIndex(index));
    if (!playing) {
      dispatch(setPlaying(true));
    }
  };
}

export function next() {
  return (dispatch, getState) => {
    const {
      player: {currentIndex, playList, playing},
    } = getState();
    let index = (currentIndex + 1) % playList.length;
    dispatch(setCurrentIndex(index));
    if (!playing) {
      dispatch(setPlaying(true));
    }
  };
}

export function prev() {
  return (dispatch, getState) => {
    const {
      player: {currentIndex, playList, playing},
    } = getState();
    let index = (currentIndex - 1 + playList.length) % playList.length;
    dispatch(setCurrentIndex(index));
    if (!playing) {
      dispatch(setPlaying(true));
    }
  };
}

export function changeMode() {
  return (dispatch, getState) => {
    const {
      player: {mode},
    } = getState();
    const newMode = (mode + 1) % 3;
    dispatch(setMode(newMode));
  };
}

export function close() {
  return (dispatch) => {
    dispatch(setFullScreen(false));
  };
}

export function finalPercentChange(precent) {
  return (dispatch, getState) => {
    const {player} = getState();
    const {playing} = player;
    const currentSong = player.get("currentSong");
    const newTime = ~~(precent * currentSong.duration);
    dispatch(setCurrentTime(newTime));
    if (!playing) {
      dispatch(setPlaying(true));
    }
    dispatch(setNewTime(newTime));
  };
}

export function offsetChange(precent) {
  return (dispatch, getState) => {
    const {player} = getState();
    const currentSong = player.get("currentSong");
    const currentOffset = ~~(precent * currentSong.duration);
    dispatch(setCurrentOffset(currentOffset));
  };
}
