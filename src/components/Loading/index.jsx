import React from "react";
import PropTypes from "prop-types";

import loadingImg from "./loading.gif";
import "./index.scss";

const Loading = ({title}) => {
  return (
    <div className="loading">
      <img className="loading__img" src={loadingImg} alt="loading" />
      <p className="loading__desc">{title}</p>
    </div>
  );
};
Loading.defaultProps = {
  title: "正在载入...",
};
Loading.propTypes = {
  title: PropTypes.string,
};

export default Loading;
