import {SET_BANNERLIST, SET_RECOMMENDLIST, SET_ENTERLOADING, SET_PULLDOWNLOADING} from "./constants";
import {setMusicListData} from "pages/MusicList/store/actions";
import {reqDiscDetail, getSongUrl, OK} from "api";

export function setBannerList(bannerList) {
  return {
    type: SET_BANNERLIST,
    payload: bannerList,
  };
}

export function setRecommendList(recommendList) {
  return (dispatch) => {
    dispatch({
      type: SET_RECOMMENDLIST,
      payload: recommendList,
    });
    dispatch(setEnterLoading(false));
  };
}

export function setEnterLoading(enterLoading) {
  return {
    type: SET_ENTERLOADING,
    payload: enterLoading,
  };
}

export function setPullDownLoading(pullDownLoading) {
  return {
    type: SET_PULLDOWNLOADING,
    payload: pullDownLoading,
  };
}

export function setCurrentDisc({id, name, picUrl}) {
  return (dispatch) => {
    reqDiscDetail(id).then((res) => {
      if (res.code === OK) {
        let title = name;
        let bgImage = picUrl;
        let rank = false;
        let songs = res.playlist.tracks.map((song) => {
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
  };
}
