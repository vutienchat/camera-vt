import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { OptionGridTask } from "../liveView";

const checkIsMerge = (gridList) => {
  const countGridList = gridList.length;
  const xStart = gridList[0].x;
  const yStart = gridList[0].y;
  const xEnd = gridList[countGridList - 1].x;
  const yEnd = gridList[countGridList - 1].y;
  const countX = gridList.filter((grid) => grid.x === xStart).length;
  const countXEnd = gridList.filter((grid) => grid.x === xEnd).length;

  let tmp = [];

  for (let i = yStart; i < yEnd; i++) {
    tmp.push(gridList.filter((grid) => grid.y === i).length);
  }

  return (
    xEnd - xStart === yEnd - yStart &&
    countX === countXEnd &&
    new Set(tmp).size === 1
  );
};

const ModalCustomGrid = ({ handleClose, dataGrid, sizeGrid }) => {
  const [gridTMP, setGridTMP] = useState([]);
  const [sizeTMP, setSizeTMP] = useState(3);
  const [heightScreen, setHeightScreen] = useState(0);
  const refScreen = useRef(null);
  const [listMerge, setListMerge] = useState([]);

  useEffect(() => setGridTMP(dataGrid), [dataGrid]);
  useEffect(() => setSizeTMP(sizeGrid), [sizeGrid]);

  useEffect(() => {
    function updateSize() {
      if (refScreen.current) {
        setHeightScreen(refScreen.current.clientHeight / sizeTMP);
      }
    }
    updateSize();
  }, [sizeTMP, refScreen.current]);

  const isMergeGrid = useMemo(() => {
    const countMergeGrid = listMerge.length;
    if (![4, 9, 16, 25, 36].includes(countMergeGrid)) return false;

    return checkIsMerge(listMerge);
  }, [listMerge]);

  const handleToggleSelectGrid = (grid) => {
    setListMerge((statePrev) =>
      statePrev.some((gridState) => gridState.key === grid.key)
        ? [...statePrev].filter((gridState) => gridState.key !== grid.key)
        : [...statePrev, grid].sort((a, b) => {
            const keyA = a.key;
            const keyB = b.key;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          })
    );
  };

  const handleMergeGrid = () => {
    const keyMergeList = listMerge.map((itemMerge) => itemMerge.key);
    const countSize = listMerge.filter((grid) => grid.x === listMerge[0].x)
      .length;

    setGridTMP((gridTMPPrev) => {
      return gridTMPPrev.reduce((dataTMP, gridItem) => {
        if (!keyMergeList.includes(gridItem.key)) {
          return [...dataTMP, gridItem];
        }

        if (gridItem.key === keyMergeList[0]) {
          return [
            ...dataTMP,
            {
              ...gridItem,
              size: countSize,
              merge: keyMergeList,
            },
          ];
        }

        return [...dataTMP];
      }, []);
    });
    setListMerge([]);
  };

  const handleSplitGrid = () => {
    console.log(gridTMP);
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <Box style={{ width: 550, padding: "24px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography style={{ fontWeight: 600 }}>
            Customize Grid View
          </Typography>
          <Typography
            style={{ fontWeight: 600, cursor: "pointer" }}
            onClick={handleClose}
          >
            X
          </Typography>
        </Box>
        <DialogContent style={{ padding: 0, marginBottom: "20px" }}>
          <Box
            style={{
              width: "100%",
              height: "320px",
              border: "2px solid black",
              boxSizing: "border-box",
            }}
            ref={refScreen}
          >
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${sizeTMP}, 1fr)`,
                gridAutoRows: `${heightScreen}px`,
                backgroundColor: "#e2e2e2",
              }}
            >
              {gridTMP.map((gridItem) => {
                const isSelectMerge = listMerge.some(
                  (gridState) => gridState.key === gridItem.key
                );

                if (gridItem.merge.length) {
                  return (
                    <Box
                      key={gridItem.key}
                      style={{
                        gridColumnStart: gridItem.y,
                        gridColumnEnd: gridItem.y + gridItem.size,
                        gridRowStart: gridItem.x,
                        gridRowEnd: gridItem.x + gridItem.size,
                        border: `1px solid`,
                        borderBlockColor: "#fff",
                        boxSizing: "border-box",
                        color: "white",
                      }}
                    />
                  );
                }

                return (
                  <Box
                    key={gridItem.key}
                    style={{
                      cursor: "pointer",
                      height: "100%",
                      border: `1px solid`,
                      borderBlockColor: isSelectMerge ? "red" : "white",
                      color: isSelectMerge ? "red" : "white",
                      boxSizing: "border-box",
                    }}
                    onClick={() => handleToggleSelectGrid(gridItem)}
                  />
                );
              })}
            </Box>
          </Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <OptionGridTask
              onClickCustomSize={(sizeGrid) => {
                setSizeTMP(sizeGrid);
                setGridTMP(
                  []
                    .concat(
                      ...Array.from({ length: sizeGrid }, (_, x) => {
                        return Array.from({ length: sizeGrid }, (_, y) => {
                          return {
                            x: x + 1,
                            y: y + 1,
                            size: 1,
                            merge: [],
                          };
                        });
                      })
                    )
                    .map((wall, index) => ({ ...wall, key: index + 1 }))
                );
              }}
              typeOption={"model"}
            />
            <Box>
              <Button disabled={!isMergeGrid} onClick={handleMergeGrid}>
                Merge
              </Button>
              <Button onClick={handleSplitGrid}>Split</Button>
              <Button>Clean</Button>
            </Box>
          </Box>
        </DialogContent>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            style={{
              width: "120px",
              height: "35px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            OK
          </Button>
          <Button
            onClick={handleClose}
            style={{
              width: "120px",
              height: "35px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalCustomGrid);
