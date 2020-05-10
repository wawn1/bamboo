import React, {useState, useRef, useEffect} from "react";
import classnames from "classnames";
import LazyLoad, {forceCheck} from "react-lazyload";

import "./index.scss";
import Scroll from "components/Scroll";
import {singerItemConnect, singerListConnect} from "../store/connects";
import loadingImg from "common/image/loading.gif";

const _GroupItem = ({picUrl, name, id, select}) => {
  return (
    <li className="list-group__item" onClick={() => select({id, picUrl, name})}>
      <LazyLoad placeholder={<img className="avatar" src={loadingImg} alt="avatar" />}>
        <img className="avatar" src={picUrl + "?param=300x300"} alt="avatar" />
      </LazyLoad>
      <span className="name">{name}</span>
    </li>
  );
};

const GroupItem = singerItemConnect(_GroupItem);

const ListGroup = ({title, items}) => {
  return (
    <li className="list-group listGroupRef">
      <h2 className="list-group__title">{title}</h2>
      <ul>
        {items.map((singer) => {
          return <GroupItem {...singer} key={singer.name} />;
        })}
      </ul>
    </li>
  );
};

const ShortCut = ({titles, scrollTo, currentIdx, setCurrentIdx}) => {
  const ANCHOR_HEIGHT = 18;
  const self = useRef({}).current;

  const handleTouchStart = (e, index) => {
    setCurrentIdx(index);
    scrollTo(index);
    self.y1 = e.touches[0].pageY;
    self.startIndex = index;
  };
  const handleTouchMove = (e) => {
    e.stopPropagation();
    let y2 = e.touches[0].pageY;
    let delta = ~~((y2 - self.y1) / ANCHOR_HEIGHT);
    let index = self.startIndex + delta;
    setCurrentIdx(index);
    scrollTo(index);
  };

  return (
    <div className="list__shortcut">
      <ul onTouchMove={(e) => handleTouchMove(e)}>
        {titles.map((title, index) => {
          return (
            <li
              key={title + index}
              className={classnames("list__shortcut__item", {"list__shortcut__item--current": index === currentIdx})}
              onTouchStart={(e) => handleTouchStart(e, index)}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const SingerList = ({hasBottom, singerGroups}) => {
  const scrollRef = useRef();
  const [listGroups, setListGroups] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const fixedRef = useRef();
  const [heightChange, setHeightChange] = useState(false);
  const [heights, setHeights] = useState([0]);

  const BAR_HEIGHT = 30;
  const titles = singerGroups.map((item) => item.title.substring(0, 1));

  const scrollTo = (index) => {
    if (!scrollRef.current || !listGroups) return;
    const scroll = scrollRef.current.getBScroll();
    scroll.scrollToElement(listGroups[index], 0);
  };

  useEffect(() => {
    const groups = document.getElementsByClassName("listGroupRef");
    setListGroups(groups);
  }, []);

  useEffect(() => {
    let heights = [0];
    let height = 0;
    for (let i = 0; i < listGroups.length; i++) {
      height += listGroups[i].clientHeight;
      heights.push(height);
    }
    setHeights(heights);
  }, [heightChange]);

  const handleScroll = (y) => {
    if (y < 0) {
      setShowBar(false);
      setCurrentIdx(0);
      return;
    }
    setShowBar(true);
    for (let i = 0; i < heights.length; i++) {
      let l = heights[i],
        r = heights[i + 1];
      if (y >= l && y < r) {
        moveBar(y, r);
        setCurrentIdx(i);
        return;
      } else if (y >= l && !r) {
        setCurrentIdx(i - 1);
        return;
      }
    }
  };
  const moveBar = (y, r) => {
    if (!fixedRef.current) return;
    let diff = r - y;
    let fixedTop = diff > 0 && diff < BAR_HEIGHT ? diff - BAR_HEIGHT : 0;
    fixedRef.current.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
  };

  const bottomstl = hasBottom ? {bottom: "60px"} : {};

  return (
    <div className="singer" style={bottomstl}>
      <Scroll
        ref={scrollRef}
        probeType={3}
        onScroll={(pos) => {
          handleScroll(-pos.y);
          forceCheck();
        }}
        onHeightChange={() => {
          setHeightChange((x) => !x);
        }}
      >
        <ul>
          {singerGroups.map((group) => {
            return <ListGroup {...group} key={group.title} />;
          })}
        </ul>
      </Scroll>

      <ShortCut titles={titles} scrollTo={scrollTo} currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} />

      {showBar && (
        <div className="list-fixed" ref={fixedRef}>
          <div className="fixed-title">{titles[currentIdx]}</div>
        </div>
      )}
    </div>
  );
};
export default singerListConnect(SingerList);
