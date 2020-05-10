import React, {useState} from "react";

import "./index.scss";

const ProgressCircle = ({radius, percent, children}) => {
  const dashArray = Math.PI * 100;
  const dashoffset = (1 - percent) * dashArray;
  return (
    <div className="progress-circle">
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashoffset ? dashoffset : 0}
        />
      </svg>
      {children}
    </div>
  );
};
ProgressCircle.defaultProps = {
  radius: 60,
  percent: 0,
};
export default ProgressCircle;
