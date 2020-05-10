import React, {useEffect} from "react";
import {Route} from "react-router-dom";

import "./index.scss";
import SingerList from "./SingerList";
import MusicList from "../MusicList";
import {reqHotSinger, OK} from "api";
import {aggregate} from "common/js/aggregate";
import {singerConnect} from "./store/connects";

const Singer = ({history, match, setSingers, setCurrentSinger, setSelectSinger}) => {
  useEffect(() => {
    reqHotSinger().then((res) => {
      if (res.code === OK) {
        let hotSingers = res["artists"].slice(0, 10);
        let singers = aggregate(res["artists"]);
        singers.unshift({title: "热门", items: hotSingers});
        setSingers(singers);
      }
    });
  }, []);
  useEffect(() => {
    const selectSinger = (singer) => {
      history.push(`/singer/${singer.id}`);
      setCurrentSinger(singer);
    };
    setSelectSinger(selectSinger);
  }, []);

  return (
    <div>
      <SingerList />
      <Route path={`${match.url}/:id`} component={MusicList} />
    </div>
  );
};
export default singerConnect(Singer);
