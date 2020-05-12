import {SET_QUERY,SET_SHOWFLAG,SET_RESULT,SET_SEARCHHISTORY} from "./constants";

export function setQuery(query) {
    return {
      type: SET_QUERY,
      payload: query,
    };
  }

export function toggleShowFlag() {
      return (dispatch, getState) => {
        const {showFlag} = getState();
        dispatch({
          type: SET_SHOWFLAG,
          payload: !showFlag,
        });
      };
    }

export function setShowFlag(showFlag) {
      return {
        type: SET_SHOWFLAG,
        payload: showFlag,
      };
    }

export function setResult(result) {
    return {
      type: SET_RESULT,
      payload: result,
    };
  }

export function setSearchHistory(searchHistory) {
    return {
      type: SET_SEARCHHISTORY,
      payload: searchHistory,
    };
  }