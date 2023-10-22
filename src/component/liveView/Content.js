import React, {
  memo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { Box, Typography } from "@material-ui/core";
import { ScreenTask } from ".";
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
// import "./styles.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const cols = 10;
const aspectRatio = 16 / 9;
const ContentLiveView = memo((props) => {
  const { taskLive, isFullScreen, isSideBar, setTaskLive } = props;
  const refContentLiveView = useRef(null);
  const [heightScreen, setHeightScreen] = useState(220);
  const [screenRecording, setScreenRecording] = useState("");
  const [lastColUse, setLastColUse] = useState(1);
  const [widthItem, setWidthItem] = useState(1);
  const [disableResize, setDisabledResize] = useState(true);

  useEffect(() => setScreenRecording(""), [taskLive]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (isFullScreen) {
        setHeightScreen(
          (refContentLiveView.current.offsetHeight - (taskLive.size - 1) * 8) /
            taskLive.size
        );
      } else {
        const itemWidth = refContentLiveView.current.offsetWidth / lastColUse; // Chiều rộng của mỗi item
        const itemHeight = itemWidth / aspectRatio;
        setHeightScreen(itemHeight);
        setWidthItem(itemWidth);
      }
    };

    window.addEventListener("resize", updateSize);
    taskLive.size !== 0 && updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [taskLive.size, isFullScreen, isSideBar, lastColUse]);

  const onLayoutChange = (currentLayout, prevLayout) => {
    //update auto change w or h when one of two changes
    let newUpdateGrid = prevLayout.map((it1) => {
      const gridIdx = currentLayout.find((it) => it.i === it1.i);
      if (!gridIdx) return { ...it1 };
      const tempNewGrid = { ...gridIdx };
      if (
        (currentLayout.map((it) => it.w).reduce((prev, cur) => prev + cur, 0) >
          100 &&
          currentLayout.some((item) => item.w !== 1)) ||
        currentLayout.reduce((prev, cur) => prev + cur.h, 0) > 100
      ) {
        return { ...tempNewGrid, ...it1, w: 1, h: 1 };
      }
      // update when change size x or y will change both of them
      if (it1.w !== tempNewGrid.w) {
        tempNewGrid.h = tempNewGrid.w;
      } else if (it1.h !== tempNewGrid.h) {
        tempNewGrid.w = tempNewGrid.h;
      }
      return { ...it1, ...tempNewGrid };
    });

    if (
      currentLayout.reduce((prev, cur) => prev + cur.w, 0) > 100 ||
      currentLayout.reduce((prev, cur) => prev + cur.h, 0) > 100
    ) {
      setTaskLive((prev) => ({ ...prev, grid: [...newUpdateGrid] }));
      return;
    }

    // find last location of item if it over 10 => plus x, update grid
    let lastX = getLastLocation("x", "w", newUpdateGrid);
    const lastY = getLastLocation("y", "h", newUpdateGrid);

    if (lastY >= 11) lastX = lastX + 1;
    if (lastX >= 11) lastX = cols;
    const overItemYIdx = newUpdateGrid.findIndex((it) => it.y >= cols);

    if (overItemYIdx !== -1) {
      newUpdateGrid[overItemYIdx].y = 9;
      newUpdateGrid[overItemYIdx].x = newUpdateGrid[overItemYIdx].x + 1;
    }

    //find item have location over 10 update to empty location
    const overItemXIdx = newUpdateGrid.findIndex((it) => it.x >= cols);
    if (overItemXIdx !== -1) {
      const count = {};

      // count number time loop of x
      newUpdateGrid.forEach(function (obj) {
        count[obj.x] = (count[obj.x] || 0) + 1;
      });

      const indexGrid = newUpdateGrid.find((it) => count[it.x] < 10);
      newUpdateGrid[overItemXIdx] = {
        ...newUpdateGrid[overItemXIdx],
        x: indexGrid.x,
      };
    }

    setLastColUse(lastX);
    console.log("newUpdateGrid", newUpdateGrid);
    setTaskLive((prev) => ({ ...prev, grid: [...newUpdateGrid] }));
  };

  console.log("tera", taskLive.grid);
  const getLastLocation = (type, size, arr) => {
    if (!type || !size || !arr || !arr.length) return 1;
    // find max of x or y
    const max = Math.max(...arr.map((item) => item[type] + item[size]));
    let lastUsedPosition = 0;
    for (let i = max; i >= 0; i--) {
      if (arr.some((item) => item[type] <= i && item[type] + item[size] > i)) {
        lastUsedPosition = i;
        break;
      }
    }
    return lastUsedPosition + 1;
  };

  const handleDelete = (id) => {
    if (!id) return;
    setTaskLive((prev) => {
      return {
        ...prev,
        grid: [...prev.grid].filter((it) => it.i !== id),
      };
    });
  };

  const onDrop = (value, pay) => {
    if (value.length > 100) return;
    const randomKey = Math.random() * 10;
    setTaskLive((prev) => ({
      ...prev,
      grid: [
        ...prev.grid,
        {
          ...pay,
          merge: [],
          screenDetail: [],
          key: randomKey,
          i: String(randomKey),
          // resizeHandles: ["se"],
          y: pay.y - 1 >= 0 ? pay.y - 1 : 0,
        },
      ],
    }));
  };

  // const handleResize = (payload, oldItem, newItem) => {
  //   const totalWidth = [...payload].reduce((total, item) => total + item.w, 0);
  //   if (totalWidth > 100 && payload.some((item) => item.w !== 1)) {
  //     const updatedLayout = payload.map((item) => ({
  //       ...item,
  //       w: item.w > 1 ? 1 : item.w,
  //     }));
  //     console.log("updatedLayout", updatedLayout);
  //     setTaskLive((prev) => ({
  //       ...prev,
  //       grid: [...updatedLayout],
  //     }));
  //   }
  // };

  return (
    <Box
      component={"main"}
      style={{
        display: "flex",
        height: isFullScreen ? "100vh" : "auto",
        width: "100%",
        overflowX: "scroll",
      }}
      ref={refContentLiveView}
    >
      <GridLayout
        className="layout"
        layout={taskLive.grid}
        rowHeight={heightScreen}
        cols={cols}
        maxRows={cols}
        width={cols * widthItem}
        onLayoutChange={(layout) => {
          console.log("layout", layout);
          if (
            (layout.reduce((prev, cur) => prev + cur.w, 0) > 100 &&
              layout.some((item) => item.w !== 1)) ||
            layout.reduce((prev, cur) => prev + cur.h, 0) > 100
          ) {
            console.log("Ooooo");
            const newLayOut = layout.map((it) => ({ ...it, w: 1, h: 1 }));
            setTaskLive((prev) => ({ ...prev, grid: newLayOut }));
            // return;
          } else {
            onLayoutChange(layout, taskLive.grid || []);
          }
        }}
        isResizable={disableResize}
        isDraggable={true}
        isDroppable={true}
        // onResizeStop={handleResize}
        resizeHandles={["se"]}
        // onResizeStart={handleResize}
        // droppingItem={{ h: 1, w: 1 }}
        onDrop={onDrop}
      >
        {taskLive.grid.map((gridItem) => {
          // if (gridItem.merge.length) {
          //   return (
          //     <Box
          //       key={gridItem.key}
          //       // style={{
          //       //   gridColumnStart: gridItem.y,
          //       //   gridColumnEnd: gridItem.y + gridItem.size,
          //       //   gridRowStart: gridItem.x,
          //       //   gridRowEnd: gridItem.x + gridItem.size,
          //       // }}
          //     >
          //       <ScreenTask
          //         screenDetail={gridItem}
          //         isSideBar={isSideBar}
          //         screenRecording={screenRecording}
          //         setScreenRecording={setScreenRecording}
          //       />
          //     </Box>
          //   );
          // }

          return (
            <Box
              key={gridItem.i}
              style={{ width: `${widthItem}px !important`, background: "gray" }}
              // dataGrid={{ ...gridItem }}
            >
              {/* <ScreenTask
                screenDetail={gridItem}
                isSideBar={isSideBar}
                screenRecording={screenRecording}
                setScreenRecording={setScreenRecording}
              /> */}
              {gridItem.i}
              <Typography
                style={{
                  width: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDelete(gridItem.i);
                }}
              >
                X
              </Typography>
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
