import React, {useState, useEffect, useMemo, useRef, forwardRef, useImperativeHandle} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import Loading from "components/Loading";
import {debounce} from "common/js/util";
import {useSize} from "react-use";

import "./index.scss";

const Scroll = forwardRef((props, ref) => {
  const {className, style, direction, click, pullUpLoading, pullDownLoading, bounceTop, bounceBottom} = props;
  const {pullUp, pullDown, onScroll, onHeightChange} = props;

  const [bScroll, setBScroll] = useState();
  const scrollContainerRef = useRef();

  const [children, {width, height}] = useSize(<div>{props.children}</div>);

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500);
  }, [pullDown]);
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", onScroll);
    return () => {
      bScroll.off("scroll", onScroll);
    };
  }, [onScroll, bScroll]);
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on("scrollEnd", handlePullUp);
    return () => {
      bScroll.off("scrollEnd", handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  useEffect(() => {
    console.log("Scroll view content size has changed");
    if (bScroll) {
      bScroll.refresh();
    }
  }, [width, height, bScroll]);

  useEffect(() => {
    onHeightChange();
  }, [height]);

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  const PullUpdisplayStyle = pullUpLoading ? {display: ""} : {display: "none"};
  const PullDowndisplayStyle = pullDownLoading ? {display: ""} : {display: "none"};

  return (
    <div className={className ? className : "scroll-container"} style={style} ref={scrollContainerRef}>
      {children}
      <div className="pullup-loading" style={PullUpdisplayStyle}>
        <Loading />
      </div>
      <div className="pulldown-loading" style={PullDowndisplayStyle}>
        <Loading />
      </div>
    </div>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
  onHeightChange: () => {},
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  onScroll: PropTypes.func,
  onHeightChange: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向下吸顶
};

export default Scroll;
