import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const Tab = ({navList}) => {
  return (
    <div className="nav">
      {navList.map(({url, text}) => {
        return (
          <div className="nav__item" key={url}>
            <NavLink className="nav__item__text" activeClassName="selected" to={url}>
              {text}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
const navList = [
  {
    url: "/recommend",
    text: "推荐",
  },
  {
    url: "/singer",
    text: "歌手",
  },
  {
    url: "/rank",
    text: "排行",
  },
  {
    url: "/search",
    text: "搜索",
  },
];
Tab.defaultProps = {
  navList,
};
Tab.propTypes = {
  navList: PropTypes.array,
};

export default Tab;
