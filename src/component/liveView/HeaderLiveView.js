import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  Typography,
  ClickAwayListener,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import PopupOption from "./PopupOption";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ModalTextBox from "../modal/ModalTextBox";
import ModalDeleteTask from "../modal/ModalDeleteTask";
import ModalCloseTask from "../modal/ModalCloseTask";
import Clean from "../../asset/image/Mask Group 739.png";
import SaveAs from "../../asset/image/Group 8862.png";
import ModalSaveTaskView from "../modal/ModalSaveTaskView";
import CustomGrid from "../../asset/image/Mask_Group_728.png";
import { OptionGridTask } from ".";
import { ModalCustomGrid } from "../modal";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import {
  dataGridCustomX4_1,
  dataGridCustomX4_2,
  dataInit,
  dataInitTask,
} from "./dataSideBar";
import { getDataGridBySize, getGroupTree } from "./javascript";
import HeaderPopup from "./HeaderPopup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Checkbox from "@material-ui/core/Checkbox";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PopupLayout from "./PopupLayout";
export const dataHeader = [
  {
    id: 0,
    label: "New Layout",
    duplicate: 0,
    default: 1,
    isSave: false,
  },
];

const useStyles = makeStyles({
  task: {
    width: "155px",
    height: "38px",
    border: "solid 1px #ebebeb",
    display: "flex",
    alignItems: "center",
    maxWidth: "160px",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  labelTask: {
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000",
  },
  ionClose: {
    color: "rgb(147, 147, 147)",
    marginRight: "12px",
    fontSize: "13px",
    height: "18px",
    lineHeight: "18px",
    fontWeight: "700",
  },
  addNewBtn: {
    width: "160px",
    height: "38px",
    border: "solid 1px #ebebeb",
    display: "flex",
    alignItems: "center",
    maxWidth: "160px",
    justifyContent: "flex-start",
    color: "#dd3d4b",
    cursor: "pointer",
  },
  activeTask: {
    borderBottom: "solid 1px red",
    border: "solid 1px #ebebeb",
    backgroundColor: "#e2e2e2",
  },
  numberGrid: {
    display: "block",
    border: "1px solid black",
    borderRadius: "4px",
    padding: "4px",
    marginRight: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": { opacity: 0.4 },
  },
  buttonCustomGrid: {
    width: "min-content",
    border: "1px solid black",
    borderRadius: "4px",
    padding: "2px",
    paddingBottom: 0,
    cursor: "pointer",
    "&:hover": { opacity: 0.4 },
  },
  popUpCustomGrid: {
    position: "absolute",
    background: "white",
    border: "1px solid #e2e2e2",
    borderRadius: "8px",
    padding: "12px",
    right: 0,
    zIndex: 1,
  },
  contentSearch: {
    borderRadius: "4px",
    fontSize: 14,
    color: "black",
    padding: "7px 11px 7px 22px",
    cursor: "pointer",
    border: "solid 1.5px #d3d3d3",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export const HeaderLiveViewContext = createContext({});
const HeaderLiveView = (props) => {
  const {
    setIsFullScreen,
    taskLive,
    onUpdateGridData,
    handleCleanTask,
    dataSideGroup,
    groupDeviceList,
  } = props;
  const classes = useStyles();
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  const [data, setData] = useState([...dataHeader]);
  const [dataIndex, setDataIndex] = useState(0);
  const [size, setSize] = useState(5);
  const [taskIndex, setTaskIndex] = useState();
  const [skipClose, setSkipClose] = useState(false);
  const [isModalClose, setIsModalClose] = useState(false);
  const [isShowPopUpSelect, setIsShowPopupSelect] = useState(false);
  const [isShowModalRename, setIsShowModalRename] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isModalSave, setIsModalSave] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElLayout, setAnchorElLayout] = useState(null);
  const [isShowPopupCustom, setIsShowPopupCustom] = useState(false);
  const [isShowModalCustomGrid, setIsShowModalCustomGrid] = useState(false);
  const [isShowPopupSearch, setIsShowPopupSearch] = useState(false);
  const [dataGroup, setDataGroup] = useState();
  const [isOpenPopupLayout, setIsOpenPopupLayout] = useState(false);
  const [isChooseItem, setIsChooseItem] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [lengthChange, setLengthChange] = useState(0);

  const handleAddNewTask = () => {
    const temp = [...data];
    const indexTaskActive = temp.findIndex((item) => item.default);
    temp[indexTaskActive] = {
      ...temp[indexTaskActive],
      default: 0,
    };

    temp.push({
      id: lengthChange + 1,
      label: `New Layout ${lengthChange + 1}`,
      isNew: true,
      duplicate: 0,
      default: 1,
      isSave: false,
    });
    // const taskIndx = temp.findIndex((item) => item.id === newLayout.id);
    // if (taskIndx >= 0 ) {
    //   const modifyLayout = {
    //     ...newLayout,
    //     id: temp.length + 1,
    //     label: `${newLayout.label} (${newLayout.duplicate + 1})`,
    //   };
    //   temp.push(modifyLayout);
    // } else {
    //   temp.push(newLayout);
    // }
    setData([...temp]);
    setDataIndex((prev) => {
      if (prev + size >= data.length + 1) return prev;
      return prev + size;
    });
    setLengthChange((prev) => prev + 1);
  };

  const handleChangePage = (type) => {
    if (type === "next") {
      setDataIndex((prev) => {
        if (prev + size >= data.length) return prev;
        return prev + size;
      });
    } else {
      setDataIndex((prev) => {
        if (prev <= 0) {
          return 0;
        } else {
          return prev - size;
        }
      });
    }
  };

  const handleDuplicate = (id) => {
    console.log("3");
    const tempData = [...data];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    if (taskIndx === -1) return;
    tempData.push({
      ...tempData[taskIndx],
      id: tempData.length + 1,
      label: `${tempData[taskIndx].label} (${
        tempData[taskIndx].duplicate + 1
      })`,
      duplicate: 0,
      isNew: true,
    });

    const activeTaskIndex = tempData.findIndex((item) => item.default);
    if (activeTaskIndex === -1) return;
    tempData[activeTaskIndex] = {
      ...tempData[activeTaskIndex],
      default: 0,
    };

    tempData[taskIndx] = {
      ...tempData[taskIndx],
      duplicate: tempData[taskIndx].duplicate + 1,
    };
    setData([...tempData]);
    setDataIndex((prev) => {
      if (prev + size >= data.length + 1) return prev;
      return prev + size;
    });
  };

  const handleDelete = (id) => {
    const temp = [...data].filter((item) => item.id !== id);
    if (temp.length % 5 === 0) {
      setDataIndex((prev) => prev - 5);
    }
    setData(temp);
  };

  const handleRename = (id) => {
    const tempData = [...data];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    if (taskIndx === -1) return;
    tempData[taskIndx] = { ...taskIndex };
    setData([...tempData]);
  };

  const handleCloseTask = (id) => {
    const tempData = [...data];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    if (taskIndx === -1) return;
    if (!tempData[taskIndx].isNew) return;
    const newTemp = tempData.filter(
      (item) => item.id !== tempData[taskIndx].id
    );
    setData([...newTemp]);
    setIsModalClose(false);
  };

  const handleCloseMultipleLayout = (id) => {
    const tempData = [...data];
    const newListLayout = tempData.filter((item) => item.id === id);
    setData([...newListLayout]);
  };

  const handleShowModalClose = (id) => {
    if (skipClose) {
      handleCloseTask(id);
    } else {
      setIsModalClose(true);
    }
  };

  const handleShareLayout = (id) => {};
  const handleSaveTask = (id) => setIsModalSave(true);

  const handleChangeTask = (id) => {
    setIsChooseItem(id);
    setIsActive(id);
    const tempData = [...data];
    const activeTaskIndex = tempData.findIndex((item) => item.default);
    if (activeTaskIndex === -1) return;
    tempData[activeTaskIndex] = {
      ...tempData[activeTaskIndex],
      default: 0,
    };

    const newActive = tempData.findIndex((item) => item.id === id);
    if (newActive === -1) return;
    tempData[newActive] = {
      ...tempData[newActive],
      default: 1,
    };

    setData([...tempData]);
  };

  const handleOpenPopupSearch = () => {
    setIsShowPopupSearch((prev) => !prev);
  };

  useEffect(() => {
    const taskActive = data.find((item) => item.default);
    setTaskIndex({ ...taskActive });
  }, [data]);

  useEffect(() => {
    const parseData =
      dataSideGroup &&
      [...dataSideGroup].reduce((abc, nodeTree) => {
        if (nodeTree.parentId === "") {
          return [...abc, { ...getGroupTree(nodeTree, [...dataSideGroup]) }];
        }
        return [...abc];
      }, []);
    setDataGroup([...parseData]);
  }, [data, dataInitTask]);

  const dataContext = {
    isShowPopUpSelect,
    anchorEl,
    handleAddNewTask,
    handleDuplicate,
    taskIndex,
    setIsShowModalRename,
    setTaskIndex,
    setIsShowPopupSelect,
    setIsShowModalDelete,
    handleShowModalClose,
    wrapperRef,
    data,
    handleChangeTask,
    isChooseItem,
    setIsChooseItem,
    handleShareLayout,

    anchorElLayout,
    isOpenPopupLayout,
    setIsOpenPopupLayout,
    setIsOpenShareModal,
    isOpenShareModal,
    handleCloseMultipleLayout,
  };
  return (
    <HeaderLiveViewContext.Provider value={dataContext}>
      <React.Fragment>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #e5e5e5",
            paddingBottom: 10,
            boxSizing: "border-box",
          }}
        >
          <Box style={{ display: "flex", alignItem: "center" }}>
            {data.slice(dataIndex, dataIndex + size).map((item) => {
              return (
                <Task
                  key={item.id}
                  item={item}
                  taskIndex={taskIndex}
                  setTaskIndex={setTaskIndex}
                  setIsShowPopupSelect={setIsShowPopupSelect}
                  setAnchorEl={setAnchorEl}
                  handleChangeTask={handleChangeTask}
                  setIsActive={setIsActive}
                  isActive={isActive}
                />
              );
            })}

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 10,
              }}
            >
              {data.length > 5 && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "50px",
                  }}
                >
                  <Box
                    onClick={() => handleChangePage("prev")}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ChevronLeftIcon />
                  </Box>
                  <Box>
                    <ChevronRightIcon
                      onClick={() => handleChangePage("next")}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </Box>
                </Box>
              )}
              <Button
                onClick={handleAddNewTask}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: 30,
                  minWidth: 30,
                }}
              >
                <AddIcon style={{ color: "black" }} />
              </Button>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: 30,
                  minWidth: 30,
                }}
                onClick={(e) => {
                  setIsOpenPopupLayout(!isOpenPopupLayout);
                  setAnchorElLayout(e.currentTarget);
                }}
              >
                <MoreVertIcon />
              </Button>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: 500,
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox />
              <Typography>Drag Items</Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox />
              <Typography>Resize Items</Typography>
            </Box>
            <Box
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={setIsFullScreen}
            >
              <FullscreenIcon style={{ fontSize: 32, color: "#f50057" }} />
              <Typography>Full screen</Typography>
            </Box>
          </Box>
        </Box>
        {isShowModalCustomGrid && (
          <ModalCustomGrid
            handleClose={() => setIsShowModalCustomGrid(false)}
            handleSubmit={(dataGrid, sizeGrid) => {
              onUpdateGridData(dataGrid, sizeGrid);
              setIsShowModalCustomGrid(false);
            }}
            dataGrid={taskLive.grid}
            sizeGrid={taskLive.size}
          />
        )}
        {isOpenPopupLayout && <PopupLayout />}

        {isShowPopUpSelect && <PopupOption />}
        {isOpenShareModal && (
          <ModalTextBox
            open={isOpenShareModal}
            handleClose={() => {
              setIsOpenShareModal(false);
            }}
            handleChangeText={handleShareLayout}
            taskIndex={taskIndex}
            setTaskIndex={setTaskIndex}
            title={"Share Layout"}
            field={"Username"}
            nameButton={"SHARE"}
          />
        )}

        {isShowModalRename && (
          <ModalTextBox
            open={isShowModalRename}
            handleClose={() => {
              setIsShowModalRename(false);
            }}
            handleChangeText={handleRename}
            taskIndex={taskIndex}
            setTaskIndex={setTaskIndex}
            title={"Rename Layout"}
            field={"Rename Layout"}
            nameButton={"RENAME"}
          />
        )}
        {isShowModalDelete && (
          <ModalDeleteTask
            open={isShowModalDelete}
            handleClose={() => {
              setIsShowModalDelete(false);
            }}
            handleDelete={handleDelete}
            taskIndex={taskIndex}
          />
        )}
        {isModalClose && (
          <ModalCloseTask
            open={isModalClose}
            handleClose={() => {
              setIsModalClose(false);
            }}
            taskIndex={taskIndex}
            handleCloseTask={handleCloseTask}
            skipClose={skipClose}
            setSkipClose={setSkipClose}
          />
        )}
        {isModalSave && (
          <ModalSaveTaskView
            open={isModalSave}
            handleClose={() => {
              setIsModalSave(false);
            }}
            taskIndex={taskIndex}
            setTaskIndex={setTaskIndex}
            handleSaveTask={handleSaveTask}
            dataGroup={dataGroup}
          />
        )}
      </React.Fragment>
    </HeaderLiveViewContext.Provider>
  );
};
export default React.memo(HeaderLiveView);

const Task = ({
  item,
  setTaskIndex,
  setIsShowPopupSelect,
  setAnchorEl,
  handleChangeTask,
  setIsActive,
  isActive,
}) => {
  const classes = useStyles();

  const handleShow = (e) => {
    setIsShowPopupSelect((prev) => !prev);
    setAnchorEl(e.currentTarget);
    setTaskIndex({ ...item });
  };

  return (
    <Box
      key={item.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isActive === item.id ? "#dd3d4b" : "#ffffff",
        border: isActive !== item.id && "1px solid #dd3d4b",
        cursor: "pointer",
        width: 140,
      }}
      onClick={() => {
        handleChangeTask(item.id);
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isActive === item.id ? "#ffffff" : "#0f0f0f",
          marginLeft: 5,
        }}
      >
        <Typography
          style={{
            color: isActive === item.id ? "#ffffff" : "#0f0f0f",
            maxWidth: 97,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: 15,
          }}
          className={classes.labelTask}
        >
          {item.label}
        </Typography>
        {!item.isSave && (
          <span style={{ fontWeight: 600, fontSize: 18, marginLeft: 5 }}>
            *
          </span>
        )}
      </Box>
      {isActive === item.id && (
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            width: 30,
            minWidth: 30,
          }}
          onClick={(e) => {
            handleShow(e);
          }}
        >
          <KeyboardArrowDownIcon
            style={{ color: isActive === item.id ? "#ffffff" : "#0f0f0f" }}
          />
        </Button>
      )}
    </Box>
  );
};
