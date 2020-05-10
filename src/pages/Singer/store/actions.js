import {OK, reqTop50Songs, getSongUrl} from "api";
import {setMusicListData} from "pages/MusicList/store/actions";
import {SET_SINGERS, SET_CURRENTSINGER, SET_SELECTSINGER} from "./constants";

export function setSingers(singers) {
  return {
    type: SET_SINGERS,
    payload: singers,
  };
}

export function setSelectSinger(selectSinger) {
  return {
    type: SET_SELECTSINGER,
    payload: selectSinger,
  };
}

export function setCurrentSinger(singer) {
  return (dispatch) => {
    reqTop50Songs(singer.id).then((res) => {
      if (res.code === OK) {
        let title = singer.name;
        let bgImage = singer.picUrl;
        let rank = false;
        let songs = res.songs.map((song) => {
          return {
            id: song.id,
            name: song.name,
            singer: song.ar.map((v) => v.name).join("/"),
            album: song.al.name,
            image: song.al.picUrl,
            url: getSongUrl(song.id),
            duration: song.dt,
          };
        });
        const musicListData = {title, bgImage, rank, songs};
        dispatch(setMusicListData(musicListData));
      }
    });
    dispatch(setMusicListData({}));
    dispatch({
      type: SET_CURRENTSINGER,
      payload: singer,
    });
  };
}
