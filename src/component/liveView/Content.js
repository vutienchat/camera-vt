import React, {
  memo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { Box } from "@material-ui/core";
import { ScreenTask } from ".";

const ContentLiveView = memo((props) => {
  const { taskLive, isFullScreen, isSideBar } = props;
  const refContentLiveView = useRef(null);
  const [heightScreen, setHeightScreen] = useState(220);
  const [screenRecording, setScreenRecording] = useState("");

  useEffect(() => setScreenRecording(""), [taskLive]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (isFullScreen) {
        setHeightScreen(
          (refContentLiveView.current.offsetHeight - (taskLive.size - 1) * 8) /
            taskLive.size
        );
      } else {
        setHeightScreen(
          ((refContentLiveView.current.offsetWidth / taskLive.size) * 22) / 38
        );
      }
    };

    window.addEventListener("resize", updateSize);
    taskLive.size !== 0 && updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [taskLive.size, isFullScreen, isSideBar]);

  return (
    <Box
      component={"main"}
      style={{
        display: "flex",
        height: isFullScreen ? "100vh" : "auto",
      }}
      ref={refContentLiveView}
    >
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${taskLive.size}, 1fr)`,
          gridAutoRows: `${heightScreen}px`,
          width: "100%",
          gap: "8px",
        }}
      >
        {taskLive.grid.map((gridItem) => {
          if (gridItem.merge.length) {
            return (
              <Box
                key={gridItem.key}
                style={{
                  gridColumnStart: gridItem.y,
                  gridColumnEnd: gridItem.y + gridItem.size,
                  gridRowStart: gridItem.x,
                  gridRowEnd: gridItem.x + gridItem.size,
                }}
              >
                <ScreenTask
                  screenDetail={gridItem}
                  isSideBar={isSideBar}
                  screenRecording={screenRecording}
                  setScreenRecording={setScreenRecording}
                />
              </Box>
            );
          }

          return (
            <Box key={gridItem.key} style={{ height: "100%" }}>
              <ScreenTask
                screenDetail={gridItem}
                isSideBar={isSideBar}
                screenRecording={screenRecording}
                setScreenRecording={setScreenRecording}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

const Content = (props) => {
  const { isFullScreen } = props;

  return (
    <React.Fragment>
      <Box
        style={{
          width: "-webkit-fill-available",
          background: "#f9fafc",
          position: isFullScreen ? "absolute" : "unset",
          inset: 0,
        }}
      >
        <ContentLiveView {...props} />
      </Box>
    </React.Fragment>
  );
};

export default React.memo(Content);
