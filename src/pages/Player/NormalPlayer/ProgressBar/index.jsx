import React, {useRef, useEffect} from "react";

import "./index.scss";

const ProgressBar = ({fullScreen, percent, finalPercentChange, offsetChange}) => {
  const touch = useRef({}).current;
  const progressBtnWidth = 16;

  const progressBarRef = useRef();
  const progressRef = useRef();
  const progressBtnRef = useRef();

  const getBarWith = () => progressBarRef.current.clientWidth - progressBtnWidth;
  const getPercent = () => progressRef.current.clientWidth / getBarWith();

  useEffect(() => {
    if (fullScreen && percent >= 0 && percent <= 1 && !touch.isTouching) {
      const barWidth = getBarWith();
      const offsetWidth = percent * barWidth;
      _offset(offsetWidth);
    }
  }, [percent, fullScreen]);

  const _offset = (offsetWidth) => {
    progressRef.current.style.width = `${offsetWidth}px`;
    progressBtnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const _changeOffset = () => {
    offsetChange(getPercent());
  };

  const _changePercent = () => {
    finalPercentChange(getPercent());
  };

  const progressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
    _changeOffset();
  };
  const progressTouchStart = (e) => {
    touch.isTouching = true;
    touch.startX = e.touches[0].pageX;
    touch.left = progressRef.current.clientWidth;
  };
  const progressTouchMove = (e) => {
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = getBarWith();
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
    _changeOffset();
  };

  const progressTouchEnd = (e) => {
    touch.isTouching = false;
    _changePercent();
  };

  return (
    <div className="progress-bar" ref={progressBarRef} onClick={progressClick}>
      <div className="bar-inner">
        <div className="progress" ref={progressRef}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
