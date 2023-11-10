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
  const {
    layoutActive,
    isFullScreen,
    isSideBar,
    setLayoutActive,
    setListAdd,
    listAdd,
    isResizeItem,
  } = props;
  const refContentLiveView = useRef(null);
  const [heightScreen, setHeightScreen] = useState(220);
  const [screenRecording, setScreenRecording] = useState("");
  const [lastColUse, setLastColUse] = useState(1);
  const [lastRowUse, setLastRowUse] = useState(1);
  const [widthItem, setWidthItem] = useState(1);
  const [newUpdateGrid, setNewUpdateGrid] = useState([]);

  useEffect(() => setScreenRecording(""), [layoutActive]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (isFullScreen) {
        setHeightScreen(
          ((refContentLiveView.current.offsetHeight -
            (layoutActive.x * layoutActive.y - 1) * 8) /
            layoutActive.x) *
            layoutActive.y
        );
      } else {
        const aspectRatio = 16 / 9;
        const itemWidth = refContentLiveView.current.offsetWidth / lastColUse; // Chiều rộng của mỗi item
        const maxHeightItem =
          refContentLiveView.current.offsetHeight / lastRowUse;
        console.log("maxHeightItem", maxHeightItem);
        const itemHeight = itemWidth / aspectRatio;
        console.log(itemHeight);
        setHeightScreen(maxHeightItem);
        setWidthItem(itemWidth);
      }
    };

    window.addEventListener("resize", updateSize);
    layoutActive.x * layoutActive.y !== 0 && updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [layoutActive, isFullScreen, isSideBar, lastColUse]);

  const onLayoutChange = (currentLayout, prevLayout) => {
    const emptyPosition = findEmptySlot(currentLayout);
    const lastItem = findLastElement(currentLayout);

    let newUpdateGrid = prevLayout.map((it1) => {
      const gridIdx = currentLayout.findIndex((it) => it.i === it1.i);
      if (gridIdx === -1) return { ...it1 };
      const tempNewGrid = { ...currentLayout[gridIdx] };

      // update when change size x or y will change both of them (w:h =  16:9)
      if (it1.w !== tempNewGrid.w) {
        tempNewGrid.h = tempNewGrid.w;
      } else if (it1.h !== tempNewGrid.h) {
        tempNewGrid.w = tempNewGrid.h;
      }

      // reset when resize over 100
      if (getTotal(currentLayout, gridIdx, tempNewGrid) > 100) {
        if (it1.w !== tempNewGrid.w || it1.h !== tempNewGrid.h) {
          return { ...it1 };
        }
      }
      //change when have empty item in the first row (y = 0)
      if (emptyPosition.x < 10 && tempNewGrid.x > emptyPosition.x) {
        tempNewGrid.x = emptyPosition.x;
      }

      return { ...it1, ...tempNewGrid };
    });

    // find last location y of item if it over 10 => plus x, update grid
    let lastX = getLastLocation("x", "w", newUpdateGrid);
    const lastY = getLastLocation("y", "h", newUpdateGrid);
    if (lastY >= 11 && lastX < 10) lastX = lastX + 1;
    if (lastX >= 11) lastX = cols;

    // find all item have y > 10
    const itemsAboveY10 = newUpdateGrid.filter((item) => item.y >= 10);
    const grid = Array.from({ length: cols }, () => Array(cols).fill(0));
    newUpdateGrid.forEach((item) => {
      for (let i = item.x; i < item.x + item.w; i++) {
        for (let j = item.y; j < item.y + item.h; j++) {
          grid[i][j] = 1;
        }
      }
    });
    const emptyPositions = [];
    //find list position don't have item
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 0) {
          emptyPositions.push({ x: i, y: j });
        }
      }
    }

    //auto fill into position empty when have y of item > 10
    if (
      itemsAboveY10.length > 0 &&
      emptyPositions.length > 0 &&
      emptyPositions.y !== 0
    ) {
      const newUpdateGridCopy = [...newUpdateGrid];
      itemsAboveY10.forEach((item) => {
        if (emptyPositions.length > 0) {
          //get a position
          const emptyPosition = emptyPositions.shift();
          const itemIndex = newUpdateGridCopy.findIndex((i) => i.i === item.i);
          //update new position
          if (itemIndex !== -1) {
            newUpdateGridCopy[itemIndex].x = emptyPosition.x;
            newUpdateGridCopy[itemIndex].y = emptyPosition.y;
          }
        }
      });
      handleUpdateGrid(lastX, lastY, [...newUpdateGridCopy]);
    }
    //auto change when the last item have x > emptyPosition item c(y = 0)

    if (
      lastItem &&
      lastItem.x > emptyPosition.x &&
      lastItem.x < 10 &&
      lastItem.y === 0
    ) {
      const itemIdx = currentLayout.findIndex((it) => it.i === lastItem.i);
      currentLayout[itemIdx] = {
        ...currentLayout[itemIdx],
        x: emptyPosition.x,
      };
    }

    handleUpdateGrid(lastX, lastY, [...newUpdateGrid]);
  };

  const handleUpdateGrid = (lastX, lastY, arrUpdate) => {
    setLastColUse(lastX);
    setLastRowUse(lastY);
    setNewUpdateGrid([...arrUpdate]);

    return;
  };

  useEffect(() => {
    setLayoutActive((prev) => ({ ...prev, grid: [...newUpdateGrid] }));
  }, [newUpdateGrid]);

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

  const getTotal = (arr, index, newDataIdx) => {
    if (!arr) return 1;
    let totalArea = 0;
    const tempArr = [...arr];
    if (index && newDataIdx) tempArr[index] = newDataIdx;
    for (let i = 0; i < tempArr.length; i++) {
      totalArea += tempArr[i].w * tempArr[i].h;
    }
    return totalArea;
  };

  const handleDelete = (id) => {
    if (!id) return;
    setLayoutActive((prev) => {
      return {
        ...prev,
        grid: [...prev.grid].filter((it) => it.i !== id),
      };
    });
  };

  const randomKey = Math.random() * 10;
  const onDrop = (value, pay) => {
    if (value.length > 100) return;
    if (listAdd && listAdd.length) {
      const newListAdd = [...listAdd].map((item) => ({
        x: pay.x,
        y: pay.y - 1,
        w: 1,
        h: 1,
        size: 3,
        merge: [],
        screenDetail: [],
        i: item.i ? item.i : item.label,
      }));
      setLayoutActive((prev) => ({
        ...prev,
        grid: [...prev.grid].concat(newListAdd),
      }));
      setListAdd([]);
      return;
    }
    // setLayoutActive((prev) => ({
    //   ...prev,
    //   grid: [
    //     ...prev.grid,
    //     {
    //       ...pay,
    //       merge: [],
    //       screenDetail: [],
    //       key: randomKey,
    //       i: String(randomKey),
    //       y: pay.y - 1,
    //     },
    //   ],
    // }));
  };

  function findEmptySlot(layout) {
    const usedX = layout.map((item) => item.x);

    // find value of x smallest not use on the fist row (y = 0)
    let emptyX = 0;
    while (usedX.includes(emptyX)) {
      emptyX++;
    }
    return { x: emptyX, y: 0 };
  }

  const findLastElement = (layout) => {
    let lastElement = null;
    layout.forEach((it) => {
      if (it.y === 0) {
        if (!lastElement || it.x > lastElement.x) {
          lastElement = it;
        }
      }
    });
    return lastElement;
  };

  return (
    <Box
      component={"main"}
      style={{
        display: "flex",
        height: isFullScreen ? "100vh" : "100%",
        width: "100%",
        overflowX: "scroll",
      }}
      ref={refContentLiveView}
    >
      <GridLayout
        className="layout"
        style={{
          minHeight:
            layoutActive.grid && layoutActive.grid.length > 0 ? "auto" : 220,
          minWidth: 1000,
          maxHeight: "100%",
        }}
        layout={layoutActive.grid}
        rowHeight={heightScreen}
        cols={cols}
        maxRows={cols}
        width={cols * widthItem}
        onLayoutChange={(layout) => {
          onLayoutChange(layout, layoutActive.grid || []);
        }}
        isResizable={isResizeItem && layoutActive.grid.length < 100}
        isDraggable={true}
        isDroppable={
          layoutActive.grid.length >= 100 || getTotal(layoutActive.grid) >= 100
            ? false
            : true
        }
        resizeHandles={["se"]}
        // onResizeStart={handleResize}
        // onDragStop={onDragStop}
        // droppingItem={{ h: 1, w: 1 }}
        onDrop={onDrop}
      >
        {layoutActive.grid.map((gridItem) => {
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
          height: "100vh",
          maxHeight: "100vh",
          inset: 0,
        }}
      >
        <ContentLiveView {...props} />
      </Box>
    </React.Fragment>
  );
};

export default React.memo(Content);
