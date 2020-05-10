import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";

import "./index.scss";
import _SongList from "./SongList";
import Scroll from "components/Scroll";
import useStyle from "common/hooks/useStyle";
import {musicListConnect, songListConnect} from "./store/connects";

const SongList = songListConnect(_SongList);

const MusicList = ({hasBottom, history, title, bgImage, random}) => {
  const scrollRef = useRef();
  const [bgImgRef, setBgImgStl] = useStyle();
  const [bgLayerRef, setBgLayerStl] = useStyle();
  const [playBtnRef, setPlayBtnStl] = useStyle();
  const bgImgHeight = useRef();

  const [appear, setAppear] = useState(true);

  const RESERVED_HEIGHT = 40;

  useEffect(() => {
    bgImgHeight.current = bgImgRef.current.clientHeight;
  }, []);

  const _bgLayerMove = (y, maxMove) => {
    let move = Math.min(y, maxMove);
    setBgLayerStl({transform: `translate3d(0,${-move}px, 0)`});
  };
  const _bgImgRest = (y, maxMove) => {
    if (y > maxMove) {
      setBgImgStl({paddingTop: 0, height: `${RESERVED_HEIGHT}px`});
      setPlayBtnStl({display: "none"});
    } else {
      setBgImgStl({paddingTop: "70%", height: 0});
      setPlayBtnStl({display: ""});
    }
  };
  const _bgImgScale = (y) => {
    const percent = Math.abs(y / bgImgHeight.current);
    let scale = 1;
    if (y < 0) {
      scale = 1 + percent;
    }
    setBgImgStl({transform: `scale(${scale})`});
  };

  const handleScroll = (y) => {
    const maxMove = bgImgHeight.current - RESERVED_HEIGHT;
    _bgLayerMove(y, maxMove);
    _bgImgRest(y, maxMove);
    _bgImgScale(y, maxMove);
    let zIndex = 0;
    if (y < 0 || y > maxMove) {
      zIndex = 10;
    }
    setBgImgStl({zIndex});
  };

  const bottomstl = hasBottom ? {bottom: "60px"} : {};
  return (
    <CSSTransition in={appear} timeout={300} classNames="fade" appear={true} onExited={() => history.goBack()}>
      <div className="music-list">
        <div className="back" onClick={() => setAppear((x) => !x)}>
          <i className="icon-back"></i>
        </div>
        <h1 className="title">{title}</h1>
        <div className="bg-image" ref={bgImgRef} style={bgImage ? {backgroundImage: `url("${bgImage}?param=300x300")`} : {}}>
          <div className="play" ref={playBtnRef} onClick={random}>
            <i className="icon-play"></i>
            <span className="text">随机播放全部</span>
          </div>
        </div>
        <div className="bg-layer" ref={bgLayerRef}></div>
        <Scroll
          ref={scrollRef}
          className="list"
          style={bottomstl}
          probeType={3}
          listenScroll={true}
          onScroll={(pos) => {
            handleScroll(-pos.y);
          }}
        >
          <div className="song-list-wrapper">
            <SongList />
          </div>
        </Scroll>
      </div>
    </CSSTransition>
  );
};

export default musicListConnect(MusicList);
