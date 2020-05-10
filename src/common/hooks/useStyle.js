import React, {useRef, useEffect} from "react";

const useStyle = (defaultStyle) => {
  const ref = useRef();

  useEffect(() => {
    setStyle(defaultStyle || {});
  }, []);

  const setStyle = (newStyle) => {
    const node = ref.current;
    if (!node) return;
    for (let key in newStyle) {
      node.style[key] = newStyle[key];
    }
  };

  return [ref, setStyle];
};

export default useStyle;
