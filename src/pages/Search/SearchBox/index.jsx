import React, {useEffect} from "react";
import classnames from "classnames";

import "./index.scss";
import {debounce} from "common/js/util";

const SearchBox = ({placeholder, query, setQuery, search}) => {
  const searchSuggest = debounce((val) => {
    search(val);
  }, 200);

  useEffect(() => {
    searchSuggest(query);
  }, [query]);

  return (
    <div className="search-box">
      <i className="icon-search"></i>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="box"
        placeholder={placeholder}
      />
      <i className={classnames("icon-dismiss", {hidden: !query})} onClick={() => setQuery("")}></i>
    </div>
  );
};
SearchBox.defaultProps = {
  placeholder: "搜索歌曲、歌手",
};
export default SearchBox;
