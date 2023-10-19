import React, {
  memo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { Box } from "@material-ui/core";
import { ScreenTask } from ".";
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
// import "./styles.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ContentLiveView = memo((props) => {
  const { taskLive, isFullScreen, isSideBar, setTaskLive } = props;
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

  const widthSize = React.useMemo(() => {
    if (!taskLive || !taskLive.grid || !taskLive.grid.length) return 1;
    // return Math.ceil(Math.sqrt(taskLive.grid.length));
    const maxX = Math.max(...taskLive.grid.map((item) => item.x + item.w));

    // Tìm vị trí cuối cùng có item
    let lastUsedPosition = 0;
    for (let i = maxX; i >= 0; i--) {
      if (taskLive.grid.some((item) => item.x <= i && item.x + item.w > i)) {
        lastUsedPosition = i;
        break;
      }
    }

    // Cập nhật số cột dựa trên vị trí cuối cùng có item
    return lastUsedPosition + 1;
  }, [taskLive, taskLive.grid]);

  console.log(widthSize);
  const onResize = (layout, oldItem, newItem, placeholder, e, element) => {
    // Xử lý logic khi kích thước của item thay đổi
    const tempNewItem = { ...newItem };
    if (oldItem.w !== tempNewItem.w) {
      // Nếu chiều rộng (w) của obj2 thay đổi, cập nhật chiều cao (h) của obj2
      tempNewItem.h = tempNewItem.w;
    } else if (oldItem.h !== tempNewItem.h) {
      // Nếu chiều cao (h) của obj2 thay đổi, cập nhật chiều rộng (w) của obj2
      tempNewItem.w = tempNewItem.h;
    }

    const tempGrid = [...taskLive.grid];
    const gridIndx = tempGrid.findIndex((it) => it.i === tempNewItem.i);
    if (gridIndx === -1) return;
    tempGrid[gridIndx] = { ...tempGrid[gridIndx], ...tempNewItem };
    setTaskLive((prev) => ({
      ...prev,
      grid: tempGrid,
    }));
  };

  const onDrop = (elemParams) => {};

  const onLayoutChange = (currentLayout, prevLayout) => {
    const newUpdateGrid = currentLayout.map((it1) => {
      const gridIdx = prevLayout.find((it) => it.i === it1.i);
      if (!gridIdx) return { ...it1 };
      const tempNewGrid = { ...gridIdx };
      if (it1.w !== tempNewGrid.w) {
        tempNewGrid.h = tempNewGrid.w;
      } else if (it1.h !== tempNewGrid.h) {
        tempNewGrid.w = tempNewGrid.h;
      }
      return { ...it1, ...tempNewGrid };
    });
    setTaskLive((prev) => ({ ...prev, grid: newUpdateGrid }));
  };

  return (
    <Box
      component={"main"}
      style={{
        display: "flex",
        height: isFullScreen ? "100vh" : "auto",
      }}
      ref={refContentLiveView}
    >
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        test
      </div>
      <GridLayout
        className="layout"
        layout={taskLive.grid}
        rowHeight={heightScreen}
        cols={widthSize}
        width={
          (refContentLiveView.current &&
            refContentLiveView.current.offsetWidth) ||
          1800
        }
        onLayoutChange={(layout) => {
          onLayoutChange(layout, taskLive.grid || []);
        }}
        isResizable={true}
        isDraggable={true}
        isDroppable={true}
        // onResize={}
        onResize={onResize}
        droppingItem={{ i: "xx", h: 1, w: 1 }}
        // resizeHandles={"se"}
      >
        {taskLive.grid.map((gridItem) => {
          if (gridItem.merge.length) {
            return (
              <Box
                key={gridItem.key}
                // style={{
                //   gridColumnStart: gridItem.y,
                //   gridColumnEnd: gridItem.y + gridItem.size,
                //   gridRowStart: gridItem.x,
                //   gridRowEnd: gridItem.x + gridItem.size,
                // }}
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
            <Box
              key={gridItem.key}
              style={{ height: "100%" }}
              // dataGrid={{ ...gridItem }}
            >
              <ScreenTask
                screenDetail={gridItem}
                isSideBar={isSideBar}
                screenRecording={screenRecording}
                setScreenRecording={setScreenRecording}
              />
            </Box>
          );
        })}
      </GridLayout>
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
