import {connect} from "react-redux";
import {setQuery, search, selectSuggest, deleteHistory, clearHistory, loadHistory, toggleShowFlag, setGoToSinger} from "./actions";
// connect(({})=>({}),{})
// connect(({})=>{
//   return {}
// },{})

export const suggestConnect = connect(
  ({search}) => {
    const {result, isSearching} = search;
    return {result, isSearching};
  },
  {selectSuggest}
);

export const searchBoxConnect = connect(
  ({search}) => {
    const {query} = search;
    return {query};
  },
  {setQuery, search}
);

export const confirmConnect = connect(
  ({search}) => {
    const {showFlag} = search;
    return {showFlag};
  },
  {toggleShowFlag, clear: clearHistory}
);

export const searchConnect = connect(
  ({search}) => {
    const {query, searchHistory} = search;
    return {query, searchHistory};
  },
  {setQuery, deleteHistory, loadHistory, toggleShowFlag, setGoToSinger}
);
