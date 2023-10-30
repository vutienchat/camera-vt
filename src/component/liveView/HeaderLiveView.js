import React, {
  createContext,
  useContext,
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
import { dataInitTask } from "./dataSideBar";
import { getDataGridBySize, getGroupTree } from "./javascript";
import HeaderPopup from "./HeaderPopup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Checkbox from "@material-ui/core/Checkbox";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PopupLayout from "./PopupLayout";
import { defaultData } from "./@type";
import { LiveView2Context } from "../../page/liveView2";
export const dataHeader = [
  {
    id: 0,
    label: "New Layout",
    duplicate: 0,
    default: 1,
    isSave: false,
    grid: defaultData,
    isNew: false,
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
    layoutActive,
    onUpdateGridData,
    handleCleanTask,
    dataSideGroup,
    groupDeviceList,
    setLayoutActive,
    listLayoutActive,
    setListLayoutActive,
    setIsErrors,
    isErrors,
    shareUserName,
    setShareUserName,
  } = props;
  const classes = useStyles();
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  const [dataIndex, setDataIndex] = useState(0);
  const [size, setSize] = useState(6);
  const [skipClose, setSkipClose] = useState(false);
  const [isModalClose, setIsModalClose] = useState(false);
  const [isShowPopUpSelect, setIsShowPopupSelect] = useState(false);
  const [isShowModalRename, setIsShowModalRename] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isModalSave, setIsModalSave] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElLayout, setAnchorElLayout] = useState(null);
  const [isShowModalCustomGrid, setIsShowModalCustomGrid] = useState(false);
  const [isShowPopupSearch, setIsShowPopupSearch] = useState(false);
  const [dataGroup, setDataGroup] = useState();
  const [isOpenPopupLayout, setIsOpenPopupLayout] = useState(false);
  const [isChooseItem, setIsChooseItem] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [lengthChange, setLengthChange] = useState(0);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSize(1);
    } else if (window.innerWidth < 1023) {
      setSize(3);
    } else {
      setSize(6);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddNewTask = () => {
    const temp = [...listLayoutActive];
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
      grid: defaultData,
    });
    setListLayoutActive([...temp]);
    setDataIndex((prev) => {
      if (prev + size >= listLayoutActive.length + 1) return prev;
      return prev + size;
    });
    setLengthChange((prev) => prev + 1);
  };

  const handleChangePage = (type) => {
    if (type === "next") {
      setDataIndex((prev) => {
        if (prev + size >= listLayoutActive.length) return prev;
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
    const tempData = [...listLayoutActive];
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
      grid: defaultData,
    });

    tempData[taskIndx] = {
      ...tempData[taskIndx],
      duplicate: tempData[taskIndx].duplicate + 1,
    };
    setListLayoutActive([...tempData]);
    setDataIndex((prev) => {
      if (prev + size >= listLayoutActive.length + 1) return prev;
      return prev + size;
    });
  };

  const handleDelete = (id) => {
    const temp = [...listLayoutActive].filter((item) => item.id !== id);
    if (temp.length % size === 0) {
      setDataIndex((prev) => prev - size);
    }
    setListLayoutActive(temp);
  };

  const handleRename = (id) => {
    const tempData = [...listLayoutActive];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    const newListLayout = tempData.filter((item) => item.id !== id);
    const isLayoutNameExist = newListLayout.some(
      (item) => item.label === layoutActive.label.trim()
    );
    if (isLayoutNameExist) {
      setIsErrors({ ...isErrors, renameExist: true });
      return;
    }
    if (taskIndx === -1) return;
    tempData[taskIndx] = { ...layoutActive };
    setListLayoutActive([...tempData]);
    setIsShowModalRename(false);
  };

  const handleCloseTask = (id) => {
    const tempData = [...listLayoutActive];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    if (taskIndx === -1) return;
    if (!tempData[taskIndx].isNew) return;
    const newTemp = tempData.filter(
      (item) => item.id !== tempData[taskIndx].id
    );
    setListLayoutActive([...newTemp]);
    setIsModalClose(false);
  };

  const handleCloseMultipleLayout = (id) => {
    const tempData = [...listLayoutActive];
    const newListLayout = tempData.filter((item) => item.id === id);
    setListLayoutActive([...newListLayout]);
  };

  const handleShowModalClose = (id) => {
    if (skipClose) {
      handleCloseTask(id);
    } else {
      setIsModalClose(true);
    }
  };

  const handleShareLayout = (prop) => {
    console.log("username", prop);
    setIsOpenShareModal(false)
  };
  const handleSaveTask = (id) => setIsModalSave(true);

  const handleChangeTask = (id) => {
    setIsChooseItem(id);
    setIsActive(id);
    const tempData = [...listLayoutActive];
    const layoutIndex = tempData.find((it) => it.id === id);
    if (layoutIndex) {
      setLayoutActive(layoutIndex);
    }
  };

  const handleOpenPopupSearch = () => {
    setIsShowPopupSearch((prev) => !prev);
  };

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
  }, [listLayoutActive, dataInitTask]);

  const dataContext = {
    isShowPopUpSelect,
    anchorEl,
    handleAddNewTask,
    handleDuplicate,
    setIsShowModalRename,
    setLayoutActive,
    setIsShowPopupSelect,
    setIsShowModalDelete,
    handleShowModalClose,
    wrapperRef,
    listLayoutActive,
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
    layoutActive,
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
            {listLayoutActive.slice(dataIndex, dataIndex + size).map((item) => {
              return (
                <Task
                  key={item.id}
                  item={item}
                  setLayoutActive={setLayoutActive}
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
              {listLayoutActive.length > size && (
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
            dataGrid={layoutActive.grid}
            sizeGrid={layoutActive.size}
          />
        )}
        {isOpenPopupLayout && <PopupLayout />}

        {isShowPopUpSelect && <PopupOption />}
        {isOpenShareModal && (
          <ModalTextBox
            open={isOpenShareModal}
            handleClose={() => {
              setIsOpenShareModal(false);
              setIsErrors({
                renameEmpty: false,
                shareUsernameEmpty: false,
                renameExist: false,
              });
            }}
            handleChangeText={handleShareLayout}
            shareUserName={shareUserName}
            setShareUserName={setShareUserName}
            title={"Share Layout"}
            field={"Username"}
            nameButton={"SHARE"}
            messageErr={isErrors}
            setIsErrors={setIsErrors}
          />
        )}

        {isShowModalRename && (
          <ModalTextBox
            open={isShowModalRename}
            handleClose={() => {
              setIsShowModalRename(false);
              setIsErrors({
                renameEmpty: false,
                shareUsernameEmpty: false,
                renameExist: false,
              });
            }}
            handleChangeText={handleRename}
            layoutActive={layoutActive}
            setLayoutActive={setLayoutActive}
            title={"Rename Layout"}
            field={"Rename Layout"}
            nameButton={"RENAME"}
            messageErr={isErrors}
            setIsErrors={setIsErrors}
          />
        )}
        {isShowModalDelete && (
          <ModalDeleteTask
            open={isShowModalDelete}
            handleClose={() => {
              setIsShowModalDelete(false);
            }}
            handleDelete={handleDelete}
            layoutActive={layoutActive}
          />
        )}
        {isModalClose && (
          <ModalCloseTask
            open={isModalClose}
            handleClose={() => {
              setIsModalClose(false);
            }}
            layoutActive={layoutActive}
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
            layoutActive={layoutActive}
            setLayoutActive={setLayoutActive}
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
  setLayoutActive,
  setIsShowPopupSelect,
  setAnchorEl,
  handleChangeTask,
}) => {
  const classes = useStyles();
  const { layoutActive } = useContext(LiveView2Context);

  const handleShow = (e) => {
    setIsShowPopupSelect((prev) => !prev);
    setAnchorEl(e.currentTarget);
    // setLayoutActive({ ...item });
  };

  return (
    <Box
      key={item.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          layoutActive && layoutActive.id === item.id ? "#dd3d4b" : "#ffffff",
        border:
          layoutActive && layoutActive.id !== item.id
            ? "1px solid #dd3d4b"
            : "",
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
          color:
            layoutActive && layoutActive.id === item.id ? "#ffffff" : "#0f0f0f",
          marginLeft: 5,
        }}
      >
        <Typography
          style={{
            color:
              layoutActive && layoutActive.id === item.id
                ? "#ffffff"
                : "#0f0f0f",
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
      {layoutActive && layoutActive.id === item.id && (
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
            style={{
              color:
                layoutActive && layoutActive.id === item.id
                  ? "#ffffff"
                  : "#0f0f0f",
            }}
          />
        </Button>
      )}
    </Box>
  );
};
