import React from "react";

import "./index.scss";

const SongList = ({songs, rank, onSelect}) => {
  const getRank = (index) => {
    if (index > 2) {
      return <span className="item__rank__text">{index + 1}</span>;
    }
    return <span className={`item__rank__icon item__rank__icon--${index}`}></span>;
  };
  const getDesc = (song) => {
    return `${song.singer}·${song.album}`;
  };
  return (
    <div className="song-list">
      <ul>
        {songs.map((song, index) => {
          return (
            <li className="item" key={song.name + index} onClick={() => onSelect(index)}>
              {rank && <div className="item__rank">{getRank(index)}</div>}
              <div className="item__content">
                <h2 className="item__content__name">{song.name}</h2>
                <p className="item__content__desc">{getDesc(song)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
SongList.defaultProps = {
  songs: [],
  onSelect: () => {},
  rank: false,
};

export default SongList;
