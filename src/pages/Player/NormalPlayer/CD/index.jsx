import React, {useRef} from "react";
import classnames from "classnames";
import {Transition} from "react-transition-group";
import animations from "create-keyframe-animation";

import "./index.scss";
import useStyle from "common/hooks/useStyle";

const CD = ({fullScreen, playingLyric, currentSong, playing}) => {
  const [cdWrapperRef, setCdWrapperStl] = useStyle();

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  const enter = () => {
    const {x, y, scale} = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    animations.unregisterAnimation("move");
    setCdWrapperStl({
      animation: "",
    });
  };
  const leave = () => {
    const {x, y, scale} = _getPosAndScale();
    setCdWrapperStl({transition: "all 4s", transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`});
  };
  const afterLeave = () => {
    setCdWrapperStl({
      transition: "",
      transform: "",
    });
  };
  return (
    <Transition in={fullScreen} timeout={400} appear={true} onEnter={enter} onEntered={afterEnter} onExit={leave} onExited={afterLeave}>
      <div>
        <div className="cd-wrapper" ref={cdWrapperRef}>
          <div className={classnames("cd", playing ? "play" : "play pause")}>
            <img src={currentSong.image} alt="" className="image" />
          </div>
        </div>
        <div className="playing-lyric-wrapper">
          <div className="playing-lyric"> {playingLyric}</div>
        </div>
      </div>
    </Transition>
  );
};
export default CD;
