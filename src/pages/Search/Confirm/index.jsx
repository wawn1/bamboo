import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import classnames from "classnames";

import "./index.scss";

const useFirst = () => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
};

const Confirm = ({showFlag, text, cancelBtnText, confirmBtnText, toggleShowFlag, clear}) => {
  // if (!showFlag) return null;
  const isFirstMount = useFirst();
  const hidden = isFirstMount ? true : false;
  return (
    <CSSTransition in={showFlag} timeout={300} classNames="confirm-fade" appear={true}>
      <div className={classnames("confirm", {hidden})}>
        <div className="confirm-wrapper">
          <div className="confirm-content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate-btn left" onClick={toggleShowFlag}>
                {cancelBtnText}
              </div>
              <div
                className="operate-btn"
                onClick={() => {
                  clear();
                  toggleShowFlag();
                }}
              >
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
Confirm.defaultProps = {
  showFlag: false,
};
export default Confirm;
