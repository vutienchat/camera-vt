import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Toast from "./Toast";

const useStyles = makeStyles(() => ({
  toastify: {
    zIndex: 9999,
    "-webkit-transform": "translateZ(9999)",
    position: "fixed",
    padding: "4px",
    width: 320,
    boxSizing: " border-box",
    color: "#fff",
    top: "1em",
    right: "1em",
  },
}));

const Toastify = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [toast, setToast] = useState([]);
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
    setToast((prev) => prev.filter((item) => item !== id));
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      const nodes = containerRef.current.querySelectorAll(
        ".toastify-toast-item"
      );
      const gap = 12;
      let usedHeight = 0;
      let prevS = 0;

      Array.from(nodes)
        // .reverse()
        .forEach((n, i) => {
          const node = n;
          node.classList.add("toastify__toast--stacked");

          prevS = (nodes.length - i) * 0.025;

          const y =
            usedHeight * (collapsed ? 0.2 : 1) + (collapsed ? 0 : gap * i);
          node.style.top = `${y}px`;
          node.style.scale = `${1 - (collapsed ? prevS : 0)}`;

          usedHeight += node.offsetHeight;
        });
    }
  }, [collapsed, toast]);

  return (
    <Fragment>
      <button
        onClick={() => setToast((prev) => [...prev, new Date().getTime()])}
      >
        notifi
      </button>
      <Box
        ref={containerRef}
        className={classes.toastify}
        onMouseEnter={() => {
          setIsCollapsed(false);
          pause();
        }}
        onMouseLeave={() => collapseAll()}
      >
        {toast.map((data) => (
          <Toast data={data} onCloseToast={handleCloseToast} key={data} />
        ))}
      </Box>
    </Fragment>
  );
};

export default Toastify;
