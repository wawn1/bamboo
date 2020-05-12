import {combineReducers} from "redux";
import {reducer as recommendReducer} from "../pages/Recommend/store";
import {reducer as singerReducer} from "../pages/Singer/store";
import {reducer as musicListReducer} from "../pages/MusicList/store";
import {reducer as playerReducer} from "../pages/Player/store";
import {reducer as searchReducer} from "../pages/Search/store";

export default combineReducers({
  recommend: recommendReducer,
  singer: singerReducer,
  musicList: musicListReducer,
  player: playerReducer,
  search: searchReducer,
});
