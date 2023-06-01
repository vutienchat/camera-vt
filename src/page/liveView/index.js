import { Box } from "@material-ui/core";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Content,
  HeaderLiveView,
  NavBar,
  SideBar,
} from "../../component/liveView";
import { dataInit } from "../../component/liveView/dataSideBar";
const sizeDefault = 2;

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
  const [planLiveDetail, setPlanLiveDetail] = useState({
    id: "string",
    idOrganization: "string123sad",
    name: "Name Task",
    type: "SCHEDULE",
    apply: "true",
    userId: "string user id",
    active: true,
    description: "",
    idTaskRemain: "string",
    planVideoDetails: [
      {
        idTask: "id Task 1",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "SHARE",
      },
      {
        idTask: "id Task 2",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "PERSON",
      },
      {
        idTask: "id Task 3",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "PERSON",
      },
    ],
    createDate: new Date(),
    lastModified: new Date(),
  });

  const [taskLive, setTaskLive] = useState({
    id: "id Task 3",
    size: sizeDefault,
    name: "Name Task",
    active: true,
    groupId: "a57w4867s5ad75sa76as4d",
    userId: "2654s7awd654214e65wa4d",
    no: 3,
    grid: []
      .concat(
        ...Array.from({ length: sizeDefault }, (_, x) => {
          return Array.from({ length: sizeDefault }, (_, y) => {
            return {
              x: x + 1,
              y: y + 1,
              size: 1,
              merge: [],
              screenDetail: [],
            };
          });
        })
      )
      .map((wall, index) => ({ ...wall, key: index + 1 })),
    lastModified: new Date(),
    createDate: new Date(),
  });
  const [isSideBar, setIsSideBar] = useState(false);
  const [typeDisplaySide, setTypeDisplaySide] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataSideGroup, setDataSideGroup] = useState([...dataInit]);
  const [groupDeviceList, setGroupDeviceList] = useState();
  const [listPlan, setListPlan] = useState([]);

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

  return (
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
              />
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
});

export default LiveView;
