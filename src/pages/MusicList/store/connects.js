import {connect} from "react-redux";
import {randomPlay, selectSong} from "./actions";
// connect(({})=>({}),{})

export const musicListConnect = connect(
  ({musicList, player}) => {
    const {title, bgImage} = musicList;
    const hasBottom = player.playList.length > 0;
    return {title, bgImage, hasBottom};
  },
  {
    random: randomPlay,
  }
);

export const songListConnect = connect(({musicList: {songs, rank}}) => ({songs, rank}), {onSelect: selectSong});
