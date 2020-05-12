import React from "react";
import classnames from "classnames";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import "./index.scss";

const SearchList = ({searches, deleteItem, selectItem}) => {
  return (
    <div className={classnames("search-list", {hidden: !searches.length})}>
      <TransitionGroup>
        {searches.map((item) => {
          return (
            <CSSTransition timeout={400} classNames="list" key={item}>
              <li className="search-item">
                <span className="text" onClick={() => selectItem(item)}>
                  {item}
                </span>
                <span className="icon" onClick={() => deleteItem(item)}>
                  <i className="icon-delete"></i>
                </span>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};
SearchList.defaultProps = {
  searches: [],
};
export default SearchList;
