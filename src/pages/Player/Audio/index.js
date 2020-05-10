import React, {useEffect, useRef} from "react";

import {playMode} from "../store/constants";

const Audio = ({currentSong, newTime, playing, mode, random, next, setCurrentTime, setSongReady, setNewTime}) => {
  const audioRef = useRef();
  const end = (mode) => {
    if (mode === playMode.loop) {
      setNewTime(0);
      audioRef.current.play();
    } else if (mode === playMode.random) {
      random();
    } else {
      next();
    }
  };

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    audioRef.current.currentTime = newTime / 1000;
  }, [newTime]);

  return (
    <audio
      src={currentSong ? currentSong.url : ""}
      ref={audioRef}
      autoPlay={true}
      onCanPlay={() => setSongReady(true)}
      onError={() => setSongReady(false)}
      onTimeUpdate={(e) => {
        setCurrentTime(e.target.currentTime * 1000);
      }}
      onEnded={() => end(mode)}
    />
  );
};

export default Audio;
