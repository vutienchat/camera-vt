import React, {
  memo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { ScreenTask } from ".";
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
// import "./styles.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import HumanEventDetails from "./HumanEventDetails";
import Tracking from "./Tracking";
import FilterDetails from "./FilterDetails";
import InputNumber from "./InputNumber";

const useStyles = makeStyles((theme) => ({
  DialogContent: {
    padding: 0,
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
  },
  contentLeft: {
    boxSizing: "border-box",
    width: 245,
    position: "sticky",
    inset: 0,
    borderRight: "2px solid #E2E2E2",
    padding: "16px 16px 16px 24px ",
  },
  contentRight: {
    flex: "1 1 auto",
  },
  contentRightInfo: {
    borderLeft: "2px solid #E2E2E2",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    "&+&": {
      paddingTop: 10,
    },
  },
}));

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
    handleDoubleClickCam,
    handleMultiDrop,
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
        const maxWidth = refContentLiveView.current.offsetWidth;
        const maxHeight = refContentLiveView.current.offsetHeight;
        let wItem = 1;
        let hItem = 1;
        const padding = 22;

        if (lastColUse >= lastRowUse) {
          wItem = maxWidth / lastColUse;
          hItem = wItem / aspectRatio;
        } else {
          hItem = maxHeight / lastRowUse;
          wItem = hItem * aspectRatio;
        }
        setHeightScreen(hItem - padding);
        setWidthItem(wItem);
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

  const onDrop = (value, pay) => {
    if (value.length > 100 && listAdd.length === 0) return;
    if (listAdd.length === 1) {
      const newListAdd = [...listAdd].map((item) => ({
        x: pay.x,
        y: pay.y - 1 < 0 ? 0 : pay.y - 1,
        w: 1,
        h: 1,
        i: item.i ? item.i : item.label,
      }));
      setLayoutActive((prev) => ({
        ...prev,
        grid: [...prev.grid].concat(newListAdd),
      }));
    } else {
      const tempListAdd = [...listAdd];
      const numberOfRow = Math.floor(Math.sqrt(listAdd.length));

      const listData = [].concat(
        ...Array.from({ length: numberOfRow }, (_, x) => {
          return Array.from({ length: numberOfRow }, (_, y) => {
            return {
              x: x,
              y: y - 1 < 0 ? 0 : y - 1,
              w: 1,
              h: 1,
            };
          });
        })
      );

      setLayoutActive((prev) => {
        let lastX = getLastLocation("x", "w", [...listData, ...prev.grid]);
        const restOfListAdd = tempListAdd
          .slice(Math.pow(numberOfRow, 2), tempListAdd.length)
          .map((it, index) => ({
            ...it,
            x: lastX + index > 10 ? 10 : lastX + index,
            y: 0,
          }));
        console.log(lastX);
        return {
          ...prev,
          grid: [...listData, ...prev.grid]
            .concat(restOfListAdd)
            .map((it, indx) => ({
              ...it,
              i: listAdd[indx].i || listAdd[indx].label,
            })),
        };
      });
    }
    setListAdd([]);
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

  // Hàm tìm vị trí còn trống và ưu tiên vị trí để sắp xếp thành hình chữ nhậ
  return (
    <Box
      component={"main"}
      style={{
        display: "flex",
        height: isFullScreen ? "100vh" : "100%",
        width: "100%",
      }}
      ref={refContentLiveView}
    >
      <GridLayout
        className="layout"
        style={{
          // minHeight:
          //   layoutActive.grid && layoutActive.grid.length > 0 ? "auto" : 220,
          minWidth: 1000,
          // maxHeight: "100%",
          maxHeight: cols * heightScreen,
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
              <ScreenTask
                screenDetail={gridItem}
                isSideBar={isSideBar}
                screenRecording={screenRecording}
                setScreenRecording={setScreenRecording}
              />
              {/* {gridItem.i}
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
              </Typography> */}
            </Box>
          );
        })}
      </GridLayout>
    </Box>
  );
});

const Content = (props) => {
  const { isFullScreen } = props;

  const classes = useStyles();

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
        {/* <Dialog open={true} maxWidth={"xl"} scroll="paper">
          <Box
            sx={{
              width: 1464,
              height: 800,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  padding: "20px 0 10px 0",
                }}
                align="center"
              >
                Human Event Details
              </Typography>
              <Divider />
            </Box>
            <DialogContent className={classes.DialogContent}>
              <Box className={classes.contentLeft}>abc</Box>
              <Box className={classes.contentRight}>
                <FilterDetails />
                <Box sx={{ width: 96 }}>
                  <InputNumber
                    unit="s"
                    onChange={(value) => {
                      console.log(value);
                    }}
                  />
                </Box>
              </Box>
            </DialogContent>
          </Box>
        </Dialog> */}
      </Box>
    </React.Fragment>
  );
};

export default React.memo(Content);
