import React, { useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  Typography,
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
  },
  labelTask: {
    fontFamily: "Sarabun",
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
});

const HeaderLiveView = () => {
  const classes = useStyles();
  const [data, setData] = useState([...dataHeader]);
  const [dataIndex, setDataIndex] = useState(0);
  const [size, setSize] = useState(5);
  const [taskIndex, setTaskIndex] = useState();
  const [skipClose, setSkipClose] = useState(false);
  const [isModalColse, setIsModalColse] = useState(false);
  const [isShowPopUpSelect, setIsShowPopupSelect] = useState(false);
  const [isShowModalRename, setIsShowModalRename] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isModalSave, setIsModalSave] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleChangePagi = (type) => {
    if (type == "next") {
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
    const taskIndx = tempData.findIndex((item) => item.id == id);
    if (taskIndx == -1) return;
    tempData.push({
      ...tempData[taskIndx],
      id: tempData.length + 1,
      label: `${tempData[taskIndx].label} (${tempData[taskIndx].duplicate +
        1})`,
      duplicate: 0,
      isNew: true,
    });

    tempData[taskIndx] = {
      ...tempData[taskIndx],
      duplicate: tempData[taskIndx].duplicate + 1,
    };
    setData([...tempData]);
  };

  const handleDelete = (id) => {
    const temp = [...data].filter((item) => item.id != id);
    setData(temp);
  };

  const handleRename = (id) => {
    const tempData = [...data];
    const taskIndx = tempData.findIndex((item) => item.id == id);
    if (taskIndx == -1) return;
    tempData[taskIndx] = { ...taskIndex };
    setData([...tempData]);
  };

  const handleCloseTask = (id) => {
    const tempData = [...data];
    const taskIndx = tempData.findIndex((item) => item.id === id);
    if (taskIndx == -1) return;
    if (!tempData[taskIndx].isNew) return;
    const newTemp = tempData.filter((item) => item.id != tempData[taskIndx].id);
    setData([...newTemp]);
    setIsModalColse(false);
  };

  const handleShowModalClose = (id) => {
    if (skipClose) {
      handleCloseTask(id);
    } else {
      setIsModalColse(true);
    }
  };

  const handleSaveTask = (id) => {
    setIsModalSave(true);
  };

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
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Box style={{ paddingLeft: 12, marginRight: 30 }}>
            <FormControl fullWidth size="small" style={{ width: 212 }}>
              <Select
                native
                id="demo-customized-select-native"
                variant="outlined"
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Box>
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
            width: 400,
          }}
        >
          {data.length > 5 && (
            <Box style={{ display: "flex" }}>
              <Box
                onClick={() => {
                  handleChangePagi("prev");
                }}
                style={{ cursor: "pointer" }}
              >
                <ChevronLeftIcon />
              </Box>
              <Box>
                <ChevronRightIcon
                  onClick={() => {
                    handleChangePagi("next");
                  }}
                />
              </Box>
            </Box>
          )}
          <Box
            className="flex-col-center"
            style={{ cursor: "pointer" }}
            onClick={handleSaveTask}
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
            <Typography style={{ fontSize: 10 }}>Save As</Typography>
          </Box>
          <Box
            style={{
              width: 40,
              borderLeft: "solid 1px #707070",
              borderRight: "solid 1px #707070",
              textAlign: "center",
            }}
          >
            <img src={Clean} />
          </Box>
          <Box>
            <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
          </Box>
          <Box>
            <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
          </Box>
          <Box>
            <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
          </Box>
          <Box>
            <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
          </Box>
          <Box>
            <SaveIcon fontSize="medium" style={{ fontSize: 32 }} />
          </Box>
          <Box style={{ marginLeft: 10 }}>
            <FullscreenIcon fontSize="medium" style={{ fontSize: 32 }} />
          </Box>
        </Box>
      </Box>
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
      {isModalColse && (
        <ModalCloseTask
          open={isModalColse}
          handleClose={() => {
            setIsModalColse(false);
          }}
          taskIndex={taskIndex}
          handleCloseTask={handleCloseTask}
          skipClose={skipClose}
          setSkipClose={setSkipClose}
        />
      )}
      {isModalSave && (
        <ModalCloseTask
          open={isModalSave}
          handleClose={() => {
            setIsModalSave(false);
          }}
          taskIndex={taskIndex}
          setTaskIndex={setTaskIndex}
          handleSaveTask={handleSaveTask}
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
