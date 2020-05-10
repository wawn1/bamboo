import {SET_SINGER,SET_PLAYING,SET_FULLSCREEN,SET_PLAYLIST,SET_SEQUENCELIST,SET_MODE,SET_CURRENTINDEX,SET_CURRENTSONG,SET_PLAYINGLYRIC,SET_CURRENTLINENUM,SET_CURRENTLYRIC,SET_CURRENTTIME,SET_SHOWPLAYLIST} from "./constants";

export function setSinger(singer) {
    return {
      type: SET_SINGER,
      payload: singer,
    };
  }

export function togglePlaying() {
      return (dispatch, getState) => {
        const {playing} = getState();
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
        const {fullScreen} = getState();
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

export function setCurrentLyric(currentLyric) {
    return {
      type: SET_CURRENTLYRIC,
      payload: currentLyric,
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
        const {showPlayList} = getState();
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