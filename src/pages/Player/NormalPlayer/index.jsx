import React, {useState, useRef} from "react";
import classnames from "classnames";
import {CSSTransition} from "react-transition-group";

import "./index.scss";
import _CD from "./CD";
import _Lyric from "./Lyric";
import _ProgressBar from "./ProgressBar";
import {playMode} from "../store/constants";
import {bottomConnect, cdConnect, lyricConnect, progressConnect} from "../store/connects";
import {formatPlayTime} from "common/js/util";
import useStyle from "common/hooks/useStyle";

const CD = cdConnect(_CD);
const Lyric = lyricConnect(_Lyric);
const ProgressBar = progressConnect(_ProgressBar);

const _Bottom = ({currentShow, mode, currentTime, songReady, playing, currentSong, prev, next, togglePlaying, changeMode}) => {
  const iconMode = mode === playMode.sequence ? "icon-sequence" : mode === playMode.loop ? "icon-loop" : "icon-random";

  return (
    <div className="bottom">
      <div className="dot-wrapper">
        <span className={classnames("dot", {active: currentShow === "cd"})} />
        <span className={classnames("dot", {active: currentShow === "lyric"})} />
      </div>
      <div className="progress-wrapper">
        <span className="time time-l">{formatPlayTime(currentTime)}</span>
        <div className="progress-bar-wrapper">
          <ProgressBar />
        </div>
        <div className="time time-r">{formatPlayTime(currentSong.duration)}</div>
      </div>
      <div className="operators">
        <div className={classnames(`icon i-left`)} onClick={changeMode}>
          <i className={iconMode} />
        </div>
        <div className={classnames(`icon i-left`)}>
          <i className="icon-prev" onClick={prev} />
        </div>
        <div className={classnames(`icon i-center`, songReady ? "" : "disable")}>
          <i className={playing ? "icon-pause" : "icon-play"} onClick={togglePlaying} />
        </div>
        <div className={classnames(`icon i-right`)}>
          <i className="icon-next" onClick={next} />
        </div>
        <div className={classnames(`icon i-right`)}>
          <i className="icon icon-not-favorite" />
        </div>
      </div>
    </div>
  );
};

const Bottom = bottomConnect(_Bottom);

const NormalPlayer = ({fullScreen, currentSong, close}) => {
  const [currentShow, setCurrentShow] = useState("cd");

  const normalPlayerRef = useRef();

  const [middleR, setMiddleRstl] = useStyle();
  const [middleL, setMiddleLstl] = useStyle();
  const touch = useRef({}).current;

  if (!currentSong.name) return null;

  const middleTouchStart = (e) => {
    touch.initiated = true;
    touch.startX = e.touches[0].pageX;
    touch.startY = e.touches[0].pageY;
  };

  const middleTouchMove = (e) => {
    if (!touch.initiated) return;
    const deltaX = e.touches[0].pageX - touch.startX;
    const deltaY = e.touches[0].pageY - touch.startY;
    // 纵向滚动大于横向时不切换
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;

    const left = currentShow === "cd" ? 0 : -window.innerWidth;
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, deltaX + left));
    touch.percent = Math.abs(offsetWidth / window.innerWidth);

    setMiddleRstl({transform: `translate3d(${offsetWidth}px, 0, 0)`, transitionDuration: 0});
    setMiddleLstl({opacity: 1 - touch.percent, transitionDuration: 0});
  };

  const middleTouchEnd = (e) => {
    let offsetWidth;
    let opacity;
    if (currentShow === "cd") {
      if (touch.percent > 0.1) {
        offsetWidth = -window.innerWidth;
        setCurrentShow("lyric");
        opacity = 0;
      } else {
        offsetWidth = 0;
        opacity = 1;
      }
    } else {
      if (touch.percent < 0.9) {
        offsetWidth = 0;
        setCurrentShow("cd");
        opacity = 1;
      } else {
        offsetWidth = -window.innerWidth;
        opacity = 0;
      }
    }
    const time = 300;
    setMiddleRstl({transform: `translate3d(${offsetWidth}px, 0, 0)`, transitionDuration: `${time}ms`});
    setMiddleLstl({opacity, transitionDuration: `${time}ms`});
  };
  return (
    <CSSTransition in={fullScreen} timeout={400} classNames="normal" appear={true}>
      <div className="normal-player" ref={normalPlayerRef}>
        <div className="background">
          <img width="100%" height="100%" src={currentSong.image} alt="song" />
        </div>
        <div className="top">
          <div className="back" onClick={close}>
            <i className="icon-back"></i>
          </div>
          <h1 className="title">{currentSong.name}</h1>
          <h2 className="subtitle">{currentSong.singer}</h2>
        </div>

        <div className="middle" onTouchStart={middleTouchStart} onTouchMove={middleTouchMove} onTouchEnd={middleTouchEnd}>
          <div className="middle-l" ref={middleL}>
            <CD />
          </div>
          <div className="middle-r" ref={middleR}>
            <Lyric />
          </div>
        </div>
        <Bottom currentShow={currentShow} />
      </div>
    </CSSTransition>
  );
};
export default NormalPlayer;
