import {SET_SONGS,SET_TITLE,SET_RANK,SET_BGIMAGE,SET_APPEAR} from "./constants";

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

export function toggleAppear() {
      return (dispatch, getState) => {
        const {appear} = getState();
        dispatch({
          type: SET_APPEAR,
          payload: !appear,
        });
      };
    }

export function setAppear(appear) {
      return {
        type: SET_APPEAR,
        payload: appear,
      };
    }