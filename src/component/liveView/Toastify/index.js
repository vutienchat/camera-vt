import React, { Fragment, useEffect, useRef, useState } from "react";
import Box from "@material-ui/core/Box";

import Toast from "./Toast";
import "./toastify.css";

const Toastify = () => {
  const containerRef = useRef(null);
  const [toasts, setToasts] = useState([]);
  const queueRef = useRef([]);
  const [collapsed, setIsCollapsed] = useState(true);

  const pause = () => {
    if (containerRef.current) {
      containerRef.current
        .querySelectorAll(".toastify-progress-bar")
        .forEach((node) => {
          node.style.animationPlayState = "paused";
        });
    }
  };

  const collapseAll = () => {
    if (containerRef.current) {
      setIsCollapsed(true);
      containerRef.current
        .querySelectorAll(".toastify-progress-bar")
        .forEach((node) => {
          node.style.animationPlayState = "running";
        });
    }
  };

  const handleCloseToast = (id) => {
    setToasts((prevToasts) => {
      const newToasts = prevToasts.filter((item) => item !== id);

      if (queueRef.current.length > 0) {
        const nextToast = queueRef.current.shift();
        newToasts.push(nextToast);
      }
      return newToasts;
    });
  };

  const handleAddToast = () => {
    if (toasts.length < 5) {
      setToasts((prevToasts) => [...prevToasts, new Date().getTime()]);
    } else {
      queueRef.current.push(new Date().getTime());
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const nodes = containerRef.current.querySelectorAll(
        ".toastify-toast-item"
      );
      const gap = 12;
      let usedHeight = 0;
      let prevS = 0;

      Array.from(nodes).forEach((n, i) => {
        const node = n;
        node.classList.add("toastify__toast--stacked");

        prevS = (nodes.length - i) * 0.025;

        const y =
          usedHeight * (collapsed ? 0.2 : 1) + (collapsed ? 0 : gap * i);
        node.style.top = `${y}px`;
        node.style.scale = `${1 - (collapsed ? prevS : 0)}`;
        node.style.zIndex = `${collapsed ? 1 : -y}`;
        usedHeight += node.offsetHeight;
      });
    }
  }, [collapsed, toasts]);

  return (
    <Fragment>
      <button onClick={() => handleAddToast()}>notifi</button>
      <Box
        ref={containerRef}
        className="toastify"
        onMouseEnter={() => {
          setIsCollapsed(false);
          pause();
        }}
        onMouseLeave={() => collapseAll()}
      >
        {toasts.map((data) => (
          <Toast data={data} onCloseToast={handleCloseToast} key={data} />
        ))}
      </Box>
    </Fragment>
  );
};

export default Toastify;
