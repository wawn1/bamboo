import {connect} from "react-redux";
import {setSingers, setCurrentSinger, setSelectSinger} from "./actions";
// connect(({})=>({}),{})

export const singerConnect = connect(({}) => ({}), {setSingers, setCurrentSinger, setSelectSinger});

export const singerListConnect = connect(({singer, player}) => {
  const {singers} = singer;
  const hasBottom = player.playList.length > 0;
  return {
    singerGroups: singers,
    hasBottom,
  };
}, {});

export const singerItemConnect = connect(({singer: {selectSinger}}) => ({select: selectSinger}), {});
