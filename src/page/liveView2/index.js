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

export const LiveView2Context = createContext();

const LiveView = memo(() => {
  const {} = useListLayout();
  const [taskLive, setTaskLive] = useState({
    id: "id Task 3",
    size: 3,
    name: "Name Task",
    active: true,
    groupId: "a57w4867s5ad75sa76as4d",
    userId: "2654s7awd654214e65wa4d",
    no: 3,
    grid: defaultData,
    lastModified: new Date(),
    createDate: new Date(),
  });
  const [isSideBar, setIsSideBar] = useState(false);
  const [typeDisplaySide, setTypeDisplaySide] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataSideGroup, setDataSideGroup] = useState([...dataInit]);
  const [groupDeviceList, setGroupDeviceList] = useState();
  const [listPlan, setListPlan] = useState([]);
  const [listAdd, setListAdd] = useState([]);
  const [listTask, setListTask] = useState([...dataInitTask]);

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

  const handleUpdateGridData = (gridData, sizeGrid) => {
    setTaskLive((taskLivePrev) => {
      return {
        ...taskLivePrev,
        size: sizeGrid,
        grid: gridData.map((gridScreenItem) => {
          const deviceDetail = taskLivePrev.grid.find(
            (gridOldItem) => gridOldItem.key === gridScreenItem.key
          );

          return {
            ...gridScreenItem,
            screenDetail: deviceDetail ? deviceDetail.screenDetail : [],
          };
        }),
      };
    });
  };

  const handleCleanTask = () => {
    setTaskLive((taskLivePrev) => {
      return {
        ...taskLivePrev,
        grid: taskLivePrev.grid.map((gridScreenItem) => {
          return { ...gridScreenItem, screenDetail: [] };
        }),
      };
    });
  };

  const handleItemClick = (item, event) => {
    const tempData = [...listTask];
    if (event.shiftKey) return;
    if (event.ctrlKey) {
      const itemIdx = tempData.findIndex((it) => it.id === item.id);
      if (itemIdx !== -1) {
        tempData[itemIdx] = {
          ...tempData[itemIdx],
          selected: !tempData[itemIdx].selected,
        };
      }
      handleChangeListAdd(tempData);
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
    setListTask(listData);
    return;
  };

  const [startIdx, setStartIdx] = useState(null);

  const handleMouseDown = (index, event, listData) => {
    if (!listData) return;
    const tempData = [...listData];
    if (event.ctrlKey) return;
    if (event.shiftKey) {
      if (startIdx === null) {
        // If Shift is held and this is the first mouse click, set the first item selected

        if (index === -1) return;
        tempData[index] = { ...tempData[index], selected: true };
        setListAdd(tempData.filter((it) => it.selected));
        setStartIdx(index);
      } else {
        // If there is already a first item selected, selects all items from the first to the last item

        const listSelect = tempData
          .slice(startIdx, index + 1)
          .map((it) => ({ ...it, selected: true }));

        setListAdd(listSelect);
        setStartIdx(null); // Resets the first selected item after selection is complete
      }
    }
  };

  const dataContext = {
    handleItemClick,
    listAdd,
    handleMouseDown,
    setTaskLive,
  };

  return (
    <LiveView2Context.Provider value={dataContext}>
      <React.Fragment>
        <Box>
          <HeaderLiveView
            setIsFullScreen={() => setIsFullScreen(true)}
            taskLive={taskLive}
            onUpdateGridData={handleUpdateGridData}
            handleCleanTask={handleCleanTask}
            dataSideGroup={dataSideGroup}
            groupDeviceList={groupDeviceList}
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
              taskLive={taskLive}
              isFullScreen={isFullScreen}
              isSideBar={isSideBar}
              setTaskLive={setTaskLive}
              listAdd={listAdd}
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
