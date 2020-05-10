import {SET_SONGS, SET_TITLE, SET_RANK, SET_BGIMAGE, SET_APPEAR} from "./constants";
import {setRandomPlayList, setListAndPlay} from "pages/Player/store/actions";

export function setSongs(songs) {
  return {
    type: SET_SONGS,
    payload: songs,
  };
}

export function setTitle(title) {
  return {
    type: SET_TITLE,
    payload: title,
  };
}

export function toggleRank() {
  return (dispatch, getState) => {
    const {rank} = getState();
    dispatch({
      type: SET_RANK,
      payload: !rank,
    });
  };
}

export function setRank(rank) {
  return {
    type: SET_RANK,
    payload: rank,
  };
}

export function setBgImage(bgImage) {
  return {
    type: SET_BGIMAGE,
    payload: bgImage,
  };
}

export function setMusicListData({title, bgImage, rank, songs}) {
  return (dispatch) => {
    dispatch(setTitle(title));
    dispatch(setBgImage(bgImage));
    dispatch(setRank(rank));
    dispatch(setSongs(songs));
  };
}

export function randomPlay() {
  return (dispatch, getState) => {
    const {
      musicList: {songs},
    } = getState();
    dispatch(setRandomPlayList(songs));
  };
}

export function selectSong(index) {
  return (dispatch, getState) => {
    const {
      musicList: {songs},
    } = getState();
    dispatch(setListAndPlay(songs, index));
  };
}
