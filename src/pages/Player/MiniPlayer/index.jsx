import React from "react";
import classNames from "classnames";
import {CSSTransition} from "react-transition-group";
import ProgressCircle from "./ProgressCircle";

import "./index.scss";

const MiniPlayer = ({fullScreen, currentSong, open, currentTime, playing, togglePlaying, toggleShowPlayList}) => {
  if (!currentSong.name) return null;

  return (
    <CSSTransition in={fullScreen} timeout={400} classNames="mini" appear={true}>
      <div className="mini-player" onClick={open}>
        <div className="icon">
          <div className="imgWrapper">
            <img alt="avatar" src={currentSong.image} className={classNames(playing ? "play" : "play pause")} width="40" height="40" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{currentSong.name}</h2>
          <p className="desc">{currentSong.singer}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={currentTime / currentSong.duration}>
            <i
              className={classNames("icon-mini", playing ? "icon-pause-mini" : "icon-play-mini")}
              onClick={(e) => {
                e.stopPropagation();
                togglePlaying();
              }}
            />
          </ProgressCircle>
        </div>
        <div className="control">
          <i
            className="icon-playlist"
            onClick={(e) => {
              e.stopPropagation();
              toggleShowPlayList();
            }}
          />
        </div>
      </div>
    </CSSTransition>
  );
};
export default MiniPlayer;
