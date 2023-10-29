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
const sizeDefault = 2;

export const LiveViewContext = createContext();

const nodeListWithoutDevices = [
  {
    id: "123",
    parentId: "",
    label: "HNQC",
    groupType: 20,
    deviceList: null,
    address: null,
    auto: true,
    children: [],
  },
  {
    id: "1234",
    parentId: "123",
    label: "HNQC2",
    groupType: 20,
    deviceList: null,
    address: null,
    auto: true,
    children: [],
  },
  {
    id: "1235",
    parentId: "1234",
    label: "HNQC3",
    groupType: 20,
    deviceList: null,
    address: null,
    auto: true,
    children: [],
  },

  {
    id: "12352",
    parentId: "1235",
    label: "HNQC4",
    groupType: 20,
    deviceList: null,
    address: null,
    auto: true,
    children: [],
  },
  {
    id: "142234",
    parentId: "123",
    label: "HNQC332",
    groupType: 20,
    deviceList: null,
    address: null,
    auto: true,
    children: [],
  },
  {
    id: "123512",
    parentId: "1234",
    label: "HNQ33C3",
    groupType: 20,
    deviceList: null,
    address: null,
    auto: true,
    children: [],
  },
];

const convertListToTree = (list, key) => {
  const { parentKey, displayKey, mappingKey } = key;
  let convertedList = [];
  list.length > 0 &&
    list.forEach((element) => {
      if (element[parentKey].length === 0) {
        let newIem = { ...element, [parentKey]: "0" };
        convertedList.push(newIem);
      } else {
        convertedList.push(element);
      }
    });

  let map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < convertedList.length; i += 1) {
    map[convertedList[i].id] = i;
    convertedList[i].nodeChildren = [];
  }

  for (i = 0; i < convertedList.length; i += 1) {
    node = convertedList[i];
    if (node[parentKey] !== "0" && map[node[parentKey]] !== undefined) {
      convertedList[map[node[parentKey]]].nodeChildren.push({
        ...node,
        [displayKey]: node[mappingKey],
      });
    } else {
      roots.push({
        ...node,
        [displayKey]: node[mappingKey],
      });
    }
  }
  return roots;
};

const flattenTree = (root, key) => {
  let flatten = [Object.assign({}, root)];

  delete flatten[0][key];

  if (root[key] && root[key].length > 0) {
    return flatten
      .concat(root[key])
      .map((child) => flattenTree(child, key))
      .reduce((a, b) => a.concat(b), []);
  }

  return flatten;
};

// const filterTreeNode = (treeNodes, filterString, key) => {
//   console.log(treeNodes);
//   const matchedNodesName = treeNodes.filter((item) => {
//     //console.log(
//     //item.label.toLowerCase().indexOf(`${filterString.toLowerCase()}`) !== -1;
//     //);
//     // item.label.toLowerCase()
//     //   .indexOf(`${filterString.toLowerCase()}`)
//     //   .map((item) => item.label);
//   });

//   console.log(matchedNodesName);
// };

const getAllNodeParent = (nodeParentId, nodeTree, listNodeTMP, listNode) => {
  if (
    listNode.some((node) => node.id === nodeParentId) ||
    listNodeTMP.some((node) => node.id === nodeParentId)
  ) {
    return [...listNodeTMP];
  }

  const nodeParent = nodeTree.find((node) => node.id === nodeParentId);

  if (!nodeParent || Object.keys(nodeParent).length === 0) {
    return [...listNodeTMP];
  }

  if (nodeParent.parentId) {
    return getAllNodeParent(
      nodeParent.parentId,
      nodeTree,
      [...listNodeTMP, { ...nodeParent }],
      listNode
    );
  }
  return [...listNodeTMP, { ...nodeParent }];
};

const flattenTreeNode = (root, keyWord) => {
  return root.reduce((listNode, node) => {
    let nodeTMP = [];
    if (node.label.toLowerCase().indexOf(`${keyWord.toLowerCase()}`) !== -1) {
      if (node.parentId) {
        nodeTMP = getAllNodeParent(node.parentId, root, nodeTMP, listNode);
      }
      return [...listNode, node].concat(nodeTMP);
    }
    return [...listNode];
  }, []);
};

const LiveView = memo(() => {
  const [layoutActive, setLayoutActive] = useState({
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
    // const allGates = {
    //   id: "0",
    //   text: "allGates",
    //   children: convertListToTree(nodeListWithoutDevices, {
    //     parentKey: "parentId",
    //     mappingKey: "label",
    //     displayKey: "text",
    //   }),
    // };

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
    setLayoutActive((taskLivePrev) => {
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
    setLayoutActive((taskLivePrev) => {
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
    setLayoutActive,
  };

  return (
    <LiveViewContext.Provider value={dataContext}>
      <React.Fragment>
        <Box>
          <HeaderLiveView
            setIsFullScreen={() => setIsFullScreen(true)}
            layoutActive={layoutActive}
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
              layoutActive={layoutActive}
              isFullScreen={isFullScreen}
              isSideBar={isSideBar}
              setLayoutActive={setLayoutActive}
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
    </LiveViewContext.Provider>
  );
});

export default LiveView;
