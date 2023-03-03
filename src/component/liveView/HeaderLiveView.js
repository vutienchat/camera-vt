import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  Typography,
  ClickAwayListener,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import PopupOption from "./PopupOption";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ModalRenameTask from "../modal/ModalRenameTask";
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

const dataHeader = [
  { id: 1, label: "Task 1", duplicate: 0, default: 1 },
  { id: 2, label: "Task 2", duplicate: 0, default: 0 },
  { id: 3, label: "Task 3", duplicate: 0, default: 0 },
  { id: 4, label: "Task 4", duplicate: 0, default: 0 },
];

const useStyles = makeStyles({
  task: {
    width: "160px",
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
    paddingLeft: "12px",
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
    padding: "11px 11px 11px 22px",
    width: "100%",
    cursor: "pointer",
    border: "solid 1.5px #d3d3d3",
    background: "#fff",
    "&:hover": {
      boxShadow: "rgba(0, 0,0, 0.24) 0px 3px 8px",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

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
  useOutsideAlerter(wrapperRef);
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
  const [isShowPopupCustom, setIsShowPopupCustom] = useState(false);
  const [isShowModalCustomGrid, setIsShowModalCustomGrid] = useState(false);
  const [isShowPopupSearch, setIsShowPopupSearch] = useState(false);
  const [dataGroup, setDataGroup] = useState();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShowPopupSelect(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleAddNewTask = () => {
    const temp = [...data];
    const indexTaskActive = temp.findIndex((item) => item.default);
    temp[indexTaskActive] = {
      ...temp[indexTaskActive],
      default: 0,
    };

    temp.push({
      id: data.length + 1,
      label: `task ${data.length + 1}`,
      isNew: true,
      duplicate: 0,
      default: 1,
    });
    setData([...temp]);
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
  };

  const handleDelete = (id) => {
    const temp = [...data].filter((item) => item.id !== id);
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

  const handleShowModalClose = (id) => {
    if (skipClose) {
      handleCloseTask(id);
    } else {
      setIsModalClose(true);
    }
  };

  const handleSaveTask = (id) => setIsModalSave(true);

  const handleChangeTask = (id) => {
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

  return (
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
        <Box style={{ display: "flex", justifyContent: "flex-start" }}>
          <ClickAwayListener
            onClickAway={() => {
              setIsShowPopupSearch(false);
            }}
          >
            <Box
              style={{
                paddingLeft: 12,
                marginRight: 70,
                width: 300,
              }}
            >
              <Box sx={{ width: 300, position: "relative" }}>
                <Box
                  className={classes.contentSearch}
                  onClick={handleOpenPopupSearch}
                >
                  <span>Owner Organization</span>
                  <ArrowDropDownIcon />
                </Box>
              </Box>
              {isShowPopupSearch && (
                <HeaderPopup
                  listData={groupDeviceList || []}
                  textSearch="search"
                />
              )}
            </Box>
          </ClickAwayListener>
          <Box style={{ display: "flex" }}>
            {data.slice(dataIndex, dataIndex + size).map((item) => {
              return (
                <Task
                  key={item.id}
                  item={item}
                  taskIndex={taskIndex}
                  setTaskIndex={setTaskIndex}
                  setIsShowPopupSelect={setIsShowPopupSelect}
                  setAnchorEl={setAnchorEl}
                  activeTask={item.default ? true : false}
                  handleChangeTask={handleChangeTask}
                />
              );
            })}
            <Box className={classes.addNewBtn} onClick={handleAddNewTask}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 40,
                }}
              >
                <AddIcon />
              </Box>
              <Typography
                className={classes.labelTask}
                style={{ color: "#dd3d4b", paddingLeft: 8 }}
              >
                Add new
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "inherit",
            alignItems: "center",
            width: 500,
          }}
        >
          {data.length > 5 && (
            <Box style={{ display: "flex" }}>
              <Box
                onClick={() => handleChangePage("prev")}
                style={{ cursor: "pointer" }}
              >
                <ChevronLeftIcon />
              </Box>
              <Box>
                <ChevronRightIcon
                  onClick={() => handleChangePage("next")}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          )}
          <Box
            className="flex-col-center"
            style={{ cursor: "pointer" }}
            onClick={() => setIsModalSave(true)}
          >
            <SaveIcon style={{ fontSize: 32, paddingTop: 10 }} />
            <Typography style={{ fontSize: 9 }}>Save</Typography>
          </Box>
          <Box className="flex-col-center">
            <img
              src={SaveAs}
              alt="save as"
              style={{ paddingTop: 13, width: 24 }}
            />
            <Typography style={{ fontSize: 9, whiteSpace: "nowrap" }}>
              Save As
            </Typography>
          </Box>
          <Box
            style={{
              width: 40,
              borderLeft: "solid 1px #707070",
              borderRight: "solid 1px #707070",
              textAlign: "center",
            }}
          >
            <img src={Clean} onClick={handleCleanTask} />
          </Box>
          <OptionGridTask
            onClickCustomSize={(sizeGrid) =>
              onUpdateGridData(getDataGridBySize(sizeGrid), sizeGrid)
            }
          />

          <ClickAwayListener onClickAway={() => setIsShowPopupCustom(false)}>
            <Box style={{ position: "relative" }}>
              <img
                src={CustomGrid}
                alt="customGrid"
                style={{ width: 24, cursor: "pointer" }}
                onClick={() => setIsShowPopupCustom(true)}
              />
              {isShowPopupCustom ? (
                <Box className={classes.popUpCustomGrid}>
                  <Box style={{ display: "flex" }}>
                    <OptionGridTask
                      onClickCustomSize={(sizeGrid) =>
                        onUpdateGridData(getDataGridBySize(sizeGrid), sizeGrid)
                      }
                    />
                    <DashboardIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => onUpdateGridData(dataGridCustomX4_1, 4)}
                    />
                    <ViewQuiltIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => onUpdateGridData(dataGridCustomX4_2, 4)}
                    />
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <span
                      className={classes.numberGrid}
                      onClick={() => onUpdateGridData(getDataGridBySize(5), 5)}
                    >
                      25
                    </span>
                    <span
                      className={classes.numberGrid}
                      onClick={() => onUpdateGridData(getDataGridBySize(6), 6)}
                    >
                      36
                    </span>
                  </Box>
                  <hr />
                  <Box
                    className={classes.buttonCustomGrid}
                    onClick={() => setIsShowModalCustomGrid(true)}
                  >
                    <BorderColorIcon />
                  </Box>
                </Box>
              ) : null}
            </Box>
          </ClickAwayListener>

          <Box
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={setIsFullScreen}
          >
            <FullscreenIcon fontSize="medium" style={{ fontSize: 32 }} />
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

      {isShowPopUpSelect && (
        <PopupOption
          open={isShowPopUpSelect}
          anchorEl={anchorEl}
          handleAddNewTask={handleAddNewTask}
          handleDuplicate={handleDuplicate}
          setIsShowModalRename={setIsShowModalRename}
          setIsShowPopupSelect={setIsShowPopupSelect}
          setIsShowModalDelete={setIsShowModalDelete}
          handleShowModalClose={handleShowModalClose}
          setTaskIndex={setTaskIndex}
          data={taskIndex}
          wrapperRef={wrapperRef}
        />
      )}

      {isShowModalRename && (
        <ModalRenameTask
          open={isShowModalRename}
          handleClose={() => {
            setIsShowModalRename(false);
          }}
          handleRename={handleRename}
          taskIndex={taskIndex}
          setTaskIndex={setTaskIndex}
          type={"task"}
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
  );
};
export default React.memo(HeaderLiveView);

const Task = ({
  item,
  setTaskIndex,
  setIsShowPopupSelect,
  setAnchorEl,
  activeTask,
  handleChangeTask,
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
      className={`${classes.task} ${activeTask ? classes.activeTask : ""}`}
      onClick={() => handleChangeTask(item.id)}
    >
      <Typography className={classes.labelTask}>{item.label}</Typography>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={(e) => {
          handleShow(e);
        }}
      >
        <MoreVertIcon />
      </Button>
    </Box>
  );
};
