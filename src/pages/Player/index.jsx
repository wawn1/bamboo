import React from "react";

import "./index.scss";
import _MiniPlayer from "./MiniPlayer";
import _Audio from "./Audio";
import _NormalPlayer from "./NormalPlayer";
import {miniPlayerConnect, audioConnect, normalPlayerConnect} from "./store/connects";

const MiniPlayer = miniPlayerConnect(_MiniPlayer);
const Audio = audioConnect(_Audio);
const NormalPlayer = normalPlayerConnect(_NormalPlayer);

const Player = ({}) => {
  return (
    <div>
      <Audio />
      <MiniPlayer />
      <NormalPlayer />
    </div>
  );
};
export default Player;
