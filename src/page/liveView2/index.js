import { Box } from "@material-ui/core";
import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Content,
  HeaderLiveView,
  NavBar,
  SideBar,
} from "../../component/liveView";
import { dataInit, dataInitTask } from "../../component/liveView/dataSideBar";
import { defaultData } from "../../component/liveView/@type";
import {
  convertListToTree,
  flattenTreeNode,
} from "../../component/liveView2/utils";
import { nodeListWithoutDevices } from "../../component/liveView2/utils/data";
import useListLayout from "../../component/liveView2/hook/useListLayout";
import { dataHeader } from "../../component/liveView/HeaderLiveView";

export const LiveView2Context = createContext();

const LiveView = memo(() => {
  const [layoutActive, setLayoutActive] = useState(dataHeader[0]);
  const [isSideBar, setIsSideBar] = useState(false);
  const [typeDisplaySide, setTypeDisplaySide] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataSideGroup, setDataSideGroup] = useState([...dataInit]);
  const [groupDeviceList, setGroupDeviceList] = useState();
  const [listPlan, setListPlan] = useState([]);
  const [listAdd, setListAdd] = useState([]);
  const [listLayout, setListLayout] = useState([...dataInitTask]);
  const [listLayoutActive, setListLayoutActive] = useState([...dataHeader]);
  const [isErrors, setIsErrors] = useState({
    renameEmpty: false,
    renameExist: false,
    shareUsernameEmpty: false,
  });
  const [shareUserName, setShareUserName] = useState("fff");
  const [startIdx, setStartIdx] = useState(null);
  const [isDragItem, setIsDragItem] = useState(true);
  const [isResizeItem, setIsResizeItem] = useState(true);

  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    },
    [isFullScreen]
  );

  useEffect(() => {
    const groupDeviceFind = convertListToTree(
      flattenTreeNode(nodeListWithoutDevices, "332"),
      {
        parentKey: "parentId",
        mappingKey: "label",
        displayKey: "text",
      }
    ).reduce((nodeList, node) => {
      if (nodeList.some((nodeTmp) => nodeTmp.id === node.id)) {
        return [...nodeList];
      }
      return [...nodeList, node];
    }, []);

    setGroupDeviceList(groupDeviceFind);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => document.removeEventListener("keydown", escFunction, false);
  }, [escFunction]);

  const handleOpenSideBar = (type) => {
    setIsSideBar((prev) => {
      if (typeDisplaySide === type) {
        setTypeDisplaySide("");
        return !prev;
      } else {
        setTypeDisplaySide(type);
        return true;
      }
    });
  };

  const handleCleanTask = () => {
    setLayoutActive((taskLivePrev) => {
      return {
        ...taskLivePrev,
        grid: taskLivePrev.grid.map((gridScreenItem) => {
          return { ...gridScreenItem, screenDetail: [] };
        }),
      };
    });
  };

  const handleItemClick = (item, event, indx, listData) => {
    const tempData = [...listLayout];
    if (event.ctrlKey) {
      const itemIdx = tempData.findIndex((it) => it.id === item.id);
      if (itemIdx !== -1) {
        tempData[itemIdx] = {
          ...tempData[itemIdx],
          selected: !tempData[itemIdx].selected,
        };
      }
      handleChangeListAdd(tempData);
    } else if (event.shiftKey) {
      const tempData = [...listData];

      let newSelectedItems;

      if (event.shiftKey && lastSelectedItem !== null) {
        const startIndex = Math.min(lastSelectedItem, indx);
        const endIndex = Math.max(lastSelectedItem, indx);
        console.log("lastSelectedItem", lastSelectedItem);
        newSelectedItems = tempData
          .filter((item, index) => index >= startIndex && index <= endIndex)
          .map((item) => item);
      } else {
        setLastSelectedItem(indx);
        newSelectedItems = [tempData[indx]];
      }

      setListAdd(newSelectedItems);
    } else {
      const newData = tempData.map((it) => ({
        ...it,
        selected: it.id === item.id,
      }));
      handleChangeListAdd(newData);
    }
  };

  const handleChangeListAdd = (listData) => {
    setListAdd(listData.filter((it) => it.selected));
    setListLayout(listData);
    return;
  };

  const [lastSelectedItem, setLastSelectedItem] = useState(null);

  const handleMouseDown = (itemId, event, listData) => {
    if (!listData) return;
    const tempData = [...listData];
    if (event.ctrlKey) return;
    // if (event.shiftKey) {
    //   // if (startIdx === null) {
    //   //   // If Shift is held and this is the first mouse click, set the first item selected

    //   //   if (index === -1) return;
    //   //   tempData[index] = { ...tempData[index], selected: true };
    //   //   setListAdd(tempData.filter((it) => it.selected));
    //   //   setStartIdx(index);
    //   // } else {
    //   //   // If there is already a first item selected, selects all items from the first to the last item

    //   //   const listSelect = tempData
    //   //     .slice(startIdx, index + 1)
    //   //     .map((it) => ({ ...it, selected: true }));

    //   //   setListAdd(listSelect);
    //   //   setStartIdx(null); // Resets the first selected item after selection is complete
    //   // }
    //   let newSelectedItems;
    //   if (lastSelectedItem !== null) {
    //     const startIndex = Math.min(lastSelectedItem, itemId);
    //     const endIndex = Math.max(lastSelectedItem, itemId);

    //     newSelectedItems = tempData
    //       .filter((item) => item.id >= startIndex && item.id <= endIndex)
    //       .map((item) => item.id);
    //   } else {
    //     newSelectedItems = [itemId];
    //   }

    //   setSelectedItems(newSelectedItems);
    //   setLastSelectedItem(itemId);
    // }
  };

  const handleDoubleClickCam = (id) => {
    if (layoutActive.grid.length >= 100 || getTotal(layoutActive.grid) >= 100)
      return;
    const emptyXPositions = findEmptyPositionWithRectangularPriority(
      layoutActive.grid
    );
    let newItem = { w: 1, h: 1, i: id };
    if (emptyXPositions) {
      newItem = { id: id + 1, ...emptyXPositions, w: 1, h: 1, i: id };
      // Thêm item mới vào grid currentLayout
    } else {
      const lastX = getLastLocation("x", "w", layoutActive.grid);
      const lastY = getLastLocation("y", "h", layoutActive.grid);

      if (lastX < 10 && lastX <= lastY) {
        newItem = { ...newItem, x: lastX, y: 0 };
      } else {
        newItem = { ...newItem, x: 0, y: lastY };
      }
    }

    setLayoutActive((prev) => ({
      ...prev,
      grid: [
        ...prev.grid,
        {
          ...newItem,
        },
      ],
    }));
  };

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

  const findEmptyPositionWithRectangularPriority = (currentLayout) => {
    const totalCols = getLastLocation("x", "w", currentLayout); // Số cột trong grid currentLayout
    const totalRows = getLastLocation("y", "h", currentLayout); // Số hàng trong grid layout

    const usedPositions = new Set();

    currentLayout.forEach((item) => {
      for (let i = item.x; i < item.x + item.w; i++) {
        for (let j = item.y; j < item.y + item.h; j++) {
          usedPositions.add(`${i}-${j}`);
        }
      }
    });

    // Tìm vị trí còn trống theo từng hàng và tăng x theo quy tắc
    let lastX = 0;
    let lastY = 0;

    for (let j = 0; j < totalRows; j++) {
      for (let i = 0; i < totalCols; i++) {
        const positionKey = `${i}-${j}`;

        if (!usedPositions.has(positionKey)) {
          lastX = i;
          lastY = j;
          return { x: lastX, y: lastY, w: 1, h: 1 };
        }
      }
    }

    // Nếu không tìm thấy vị trí trống, trả về x + 1
    return null;
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

  const handleMultiDrop = (id) => {
    if (layoutActive.grid.length >= 100 || getTotal(layoutActive.grid) >= 100)
      return;
    const emptyXPositions = findEmptyPositionWithRectangularPriority(
      layoutActive.grid
    );
    let newItem = { w: 1, h: 1, i: id };
    if (emptyXPositions) {
      newItem = { id: id + 1, ...emptyXPositions, w: 1, h: 1, i: id };
      // Thêm item mới vào grid currentLayout
    } else {
      const lastX = getLastLocation("x", "w", layoutActive.grid);
      const lastY = getLastLocation("y", "h", layoutActive.grid);

      if (lastX < 10 && lastX <= lastY) {
        newItem = { ...newItem, x: lastX, y: 0 };
      } else {
        newItem = { ...newItem, x: 0, y: lastY };
      }
    }
    return newItem;
  };

  const dataContext = {
    handleItemClick,
    listAdd,
    handleMouseDown,
    setLayoutActive,
    listLayoutActive,
    setListLayoutActive,
    layoutActive,
    setIsErrors,
    isErrors,
    setListAdd,
    isResizeItem,
    isDragItem,
    handleDoubleClickCam,
  };

  return (
    <LiveView2Context.Provider value={dataContext}>
      <React.Fragment>
        <Box>
          <HeaderLiveView
            setIsFullScreen={() => setIsFullScreen(true)}
            layoutActive={layoutActive}
            handleCleanTask={handleCleanTask}
            dataSideGroup={dataSideGroup}
            setLayoutActive={setLayoutActive}
            listLayoutActive={listLayoutActive}
            setListLayoutActive={setListLayoutActive}
            setIsErrors={setIsErrors}
            isErrors={isErrors}
            shareUserName={shareUserName}
            setShareUserName={setShareUserName}
            isDragItem={isDragItem}
            setIsDragItem={setIsDragItem}
            isResizeItem={isResizeItem}
            setIsResizeItem={setIsResizeItem}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBlock: 24,
              //minHeight: "808px",
            }}
          >
            <Content
              layoutActive={layoutActive}
              isFullScreen={isFullScreen}
              isSideBar={isSideBar}
              setLayoutActive={setLayoutActive}
              listAdd={listAdd}
              setListAdd={setListAdd}
              isResizeItem={isResizeItem}
              handleDoubleClickCam={handleDoubleClickCam}
              handleMultiDrop={handleMultiDrop}
            />
            <Box style={{ display: "flex", marginLeft: "16px" }}>
              <NavBar
                handleOpenSideBar={handleOpenSideBar}
                typeDisplaySide={typeDisplaySide}
              />
              {isSideBar && (
                <SideBar
                  typeDisplaySide={typeDisplaySide}
                  data={dataSideGroup}
                  setData={setDataSideGroup}
                  listPlan={listPlan}
                  setListPlan={setListPlan}
                  listAdd={listAdd}
                  setListAdd={setListAdd}
                  handleItemClick={handleItemClick}
                />
              )}
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    </LiveView2Context.Provider>
  );
});

export default LiveView;
