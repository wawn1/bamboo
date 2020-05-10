import {connect} from "react-redux";
import {
  toggleFullScreen,
  togglePlaying,
  toggleShowPlayList,
  random,
  prev,
  next,
  setCurrentTime,
  setSongReady,
  setNewTime,
  changeMode,
  close,
  finalPercentChange,
  offsetChange,
  setCurrentLineNum,
  setPlayingLyric,
} from "./actions";
// connect(({})=>({}),{})
// connect(({})=>{
//   return {}
// },{})
export const miniPlayerConnect = connect(
  ({player}) => {
    const {fullScreen, playing, currentTime} = player;
    return {fullScreen, currentSong: player.get("currentSong"), playing, currentTime};
  },
  {open: toggleFullScreen, togglePlaying, toggleShowPlayList}
);

export const audioConnect = connect(
  ({player}) => {
    const {playing, mode, newTime} = player;
    return {playing, mode, newTime, currentSong: player.get("currentSong")};
  },
  {random, next, setCurrentTime, setSongReady, setNewTime}
);
export const bottomConnect = connect(
  ({player}) => {
    const {playing, mode, songReady, currentTime} = player;
    return {
      playing,
      mode,
      songReady,
      currentTime,
      currentSong: player.get("currentSong"),
    };
  },
  {prev, next, togglePlaying, changeMode}
);

export const normalPlayerConnect = connect(
  ({player}) => {
    const {fullScreen} = player;
    return {currentSong: player.get("currentSong"), fullScreen};
  },
  {close}
);

export const cdConnect = connect(({player}) => {
  const {fullScreen, playingLyric, playing} = player;
  const currentSong = player.get("currentSong");
  return {fullScreen, playingLyric, playing, currentSong};
}, {});

export const lyricConnect = connect(
  ({player}) => {
    const {playing, currentTime, currentOffset, currentLineNum, newTime} = player;
    const currentSong = player.get("currentSong");
    return {playing, currentTime, currentOffset, currentSong, currentLineNum, newTime};
  },
  {setCurrentLineNum, setPlayingLyric}
);

export const progressConnect = connect(
  ({player}) => {
    return {
      percent: player.get("percent"),
      fullScreen: player.fullScreen,
    };
  },
  {finalPercentChange, offsetChange}
);
