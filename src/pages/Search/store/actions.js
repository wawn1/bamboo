import {SET_QUERY, SET_SHOWFLAG, SET_RESULT, SET_SEARCHHISTORY, TYPE_SONG, TYPE_SINGER, SET_GOTOSINGER, SET_ISSEARCHING} from "./constants";
import {reqSuggestList, OK} from "api";
import {saveSearch, deleteSearch, clearSearch, getSearch} from "common/js/cache";
import {insertSongById} from "../../Player/store/actions";
import {setCurrentSinger} from "../../Singer/store/actions";

export function setQuery(query) {
  return {
    type: SET_QUERY,
    payload: query,
  };
}

export function toggleShowFlag() {
  return (dispatch, getState) => {
    const {
      search: {showFlag},
    } = getState();
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

export function setGoToSinger(goToSinger) {
  return {
    type: SET_GOTOSINGER,
    payload: goToSinger,
  };
}

export function setIsSearching(isSearching) {
  return {
    type: SET_ISSEARCHING,
    payload: isSearching,
  };
}

export function search(keyword) {
  return (dispatch) => {
    if (!keyword) return;

    reqSuggestList(keyword).then((res) => {
      if (res.code === OK) {
        let songs = [];
        if (res.result.songs) {
          songs = res.result.songs.map((song) => {
            const singer = song.artists.map((v) => v.name).join("/");
            return {type: TYPE_SONG, id: song.id, name: song.name, singer};
          });
        }
        let artists = [];
        if (res.result.artists) {
          artists = res.result.artists.map(({id, name, picUrl}) => ({type: TYPE_SINGER, id, name, picUrl}));
        }
        dispatch(setIsSearching(false));
        dispatch(setResult([...songs, ...artists]));
      }
    });
    dispatch(setIsSearching(true));
    dispatch(setResult([]));
  };
}

export function selectSuggest(suggest) {
  return async (dispatch, getState) => {
    const isSinger = suggest.type === "singer";

    if (!isSinger) {
      const song = suggest;
      dispatch(insertSongById(song.id));
    } else {
      const singer = suggest;
      const {search} = getState();
      const {gotoSinger} = search;

      gotoSinger(singer.id);
      dispatch(setCurrentSinger(singer));
    }

    let searches = saveSearch(suggest.name);
    dispatch(setSearchHistory(searches));
    dispatch(setQuery(""));
  };
}

export function deleteHistory(query) {
  return (dispatch) => {
    let searches = deleteSearch(query);
    dispatch(setSearchHistory(searches));
  };
}

export function clearHistory() {
  return (dispatch) => {
    let searches = clearSearch();
    dispatch(setSearchHistory(searches));
  };
}

export function loadHistory() {
  return (dispatch) => {
    let searches = getSearch();
    dispatch(setSearchHistory(searches));
  };
}
