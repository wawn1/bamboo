import React, {useState, useEffect} from "react";

import "./index.scss";
import Scroll from "components/Scroll";
import Loading from "components/Loading";
import {TYPE_SINGER} from "../store/constants";

const NoResult = ({title}) => {
  return (
    <div className="no-result">
      <div className="no-result-icon"> </div>
      <p className="no-result-text">{title}</p>
    </div>
  );
};
NoResult.defaultProps = {
  title: "",
};

const Suggest = ({isSearching, result, selectSuggest}) => {
  const [hasMore, setHasMore] = useState();

  const side = () => {
    if (!hasMore && !isSearching && !result.length) {
      return <NoResult title={"抱歉，暂无搜索结果"} />;
    }
    if (hasMore || isSearching) {
      return <Loading />;
    }
  };

  return (
    <Scroll className="suggest">
      <ul className="suggest-list">
        {result.map((item, idx) => {
          return (
            <li onClick={() => selectSuggest(item)} key={idx} className="suggest-item">
              <div className="icon">
                <i className={item.type === TYPE_SINGER ? "icon-mine" : "icon-music"}></i>
              </div>
              <div className="name">
                <p className="text">{item.type === TYPE_SINGER ? item.name : `${item.name}-${item.singer}`}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {side()}
    </Scroll>
  );
};
Suggest.defaultProps = {
  result: [],
};
export default Suggest;
