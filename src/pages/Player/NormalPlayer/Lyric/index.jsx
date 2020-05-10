import React, {useRef, useEffect, useState} from "react";
import classnames from "classnames";

import "./index.scss";
import {reqLyric, OK} from "api";
import Lyric from "api/parse/lyric-parse";
import Scroll from "components/Scroll";

const LyricComp = ({playing, currentTime, currentOffset, newTime, currentSong, currentLineNum, setCurrentLineNum, setPlayingLyric}) => {
  const lyricRef = useRef();
  const scrollRef = useRef();
  const [currentLyric, setCurrentLyric] = useState({});

  const setNewLyric = (lyric) => {
    if (lyricRef.current.lyric) {
      lyricRef.current.lyric.destory();
    }

    lyricRef.current.lyric = lyric;
    lyric.play();
    setCurrentLyric(lyric);
  };

  const handleScroll = (currentLineNum) => {
    if (!lyricRef.current || !scrollRef.current) return;
    const scroll = scrollRef.current.getBScroll();
    const lyricLines = Array.from(lyricRef.current.children);
    if (currentLineNum > 5) {
      let lineEl = lyricLines[currentLineNum - 5];
      scroll.scrollToElement(lineEl, 1000);
    } else {
      scroll.scrollTo(0, 0, 1000);
    }
  };

  const handle = ({playingLyric, currentLineNum}) => {
    handleScroll(currentLineNum);
    setPlayingLyric(playingLyric);
    setCurrentLineNum(currentLineNum);
  };

  useEffect(() => {
    reqLyric(currentSong.id).then((res) => {
      if (res.code === OK) {
        const lyric = new Lyric(res.lrc.lyric, handle);
        setNewLyric(lyric);
      }
    });
  }, [currentSong.id]);

  useEffect(() => {
    if (!lyricRef.current.lyric) return;

    if (currentOffset) {
      lyricRef.current.lyric.seek(currentOffset);
    }
  }, [currentOffset]);

  useEffect(() => {
    if (!lyricRef.current.lyric) return;

    if (newTime) {
      lyricRef.current.lyric.seek(newTime);
    }
  }, [newTime]);

  useEffect(() => {
    if (!lyricRef.current.lyric) return;
    playing ? lyricRef.current.lyric.seek(currentTime) : lyricRef.current.lyric.pause();
  }, [playing]);

  return (
    <Scroll ref={scrollRef}>
      <div className="lyric-wrapper">
        <div ref={lyricRef}>
          {currentLyric.lines &&
            currentLyric.lines.length > 0 &&
            currentLyric.lines.map((line, index) => {
              return (
                <p className={classnames("text", {current: currentLineNum === index})} key={line.time + index}>
                  {line.txt}
                </p>
              );
            })}
        </div>
      </div>
    </Scroll>
  );
};
export default LyricComp;
