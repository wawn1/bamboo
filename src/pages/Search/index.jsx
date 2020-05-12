import React, {useEffect, useState} from "react";
import classnames from "classnames";

import "./index.scss";
import _SearchBox from "./SearchBox";
import _Suggest from "./Suggest";
import SearchList from "./SearchList";
import Scroll from "components/Scroll";
import _Confirm from "./Confirm";
import {reqHotKeyWords, OK} from "api";
import {suggestConnect, searchBoxConnect, searchConnect, confirmConnect} from "./store/connects";

const Suggest = suggestConnect(_Suggest);
const SearchBox = searchBoxConnect(_SearchBox);
const Confirm = confirmConnect(_Confirm);

const Search = ({history, query, setQuery, searchHistory, loadHistory, deleteHistory, toggleShowFlag, setGoToSinger}) => {
  const [hotKey, setHotKey] = useState([]);

  useEffect(() => {
    reqHotKeyWords().then((res) => {
      if (res.code === OK) {
        const hotkeys = res.result.hots.map((val) => val.first);
        setHotKey(hotkeys);
      }
    });
  }, []);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    const gotoSinger = (id) => {
      history.push(`/singer/${id}`);
    };
    setGoToSinger(gotoSinger);
  }, []);

  return (
    <div className="search">
      <div className="search-box-wrapper">
        <SearchBox />
      </div>
      <div className={classnames("shortcut-wrapper", {hidden: query})}>
        <Scroll className="shortcut">
          <div>
            <div className="hot-key">
              <h1 className="title">热门搜索</h1>
              <ul>
                {hotKey.map((item) => {
                  return (
                    <li key={item} className="item" onClick={() => setQuery(item)}>
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={classnames("search-history", {hidden: !searchHistory.length})}>
              <h1 className="title">
                <span className="text">搜索历史</span>
                <span className="clear" onClick={toggleShowFlag}>
                  <i className="icon-clear"></i>
                </span>
              </h1>
              <SearchList searches={searchHistory} deleteItem={deleteHistory} selectItem={(item) => setQuery(item)} />
            </div>
          </div>
        </Scroll>
      </div>
      <div className={classnames("search-result", {hidden: !query})}>
        <Suggest />
      </div>
      <Confirm text={"是否清空所有搜索历史"} confirmBtnText={"清空"} cancelBtnText={"取消"} />
    </div>
  );
};
Search.defaultProps = {
  query: "",
  searchHistory: [],
};
export default searchConnect(Search);
