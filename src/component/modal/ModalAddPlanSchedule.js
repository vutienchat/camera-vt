import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControlLabel,
  makeStyles,
  InputAdornment,
  Select,
  Popover,
  MenuItem,
} from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import ModalAddTaskView from "./ModalAddTaskView";
import ModalDeleteTask from "./ModalDeleteTask";
import DownArrow from "../../../src/asset/image/arrow_down_icon.png";
import UpArrow from "../../../src/asset/image/arrow_up_icon.png";
import TrashBin from "../../../src/asset/image/trash_bin_icon.png";
import TriangleDown from "../../../src/asset/image/triangle_down_icon.png";

const useStyles = makeStyles({
  root: {
    "& .MuiIconButton-label": {
      color: "#c9c9c9 !important",
    },
    "& .MuiIconButton-label .MuiSvgIcon-root": {
      width: "26px",
      height: "26px",
    },
    "& .MuiTreeItem-iconContainer": {
      marginRight: "16px",
    },
    "& .MuiTreeItem-iconContainer img": {
      marginLeft: "-2px !important",
    },
    "& .MuiTreeItem-label:hover": {
      backgroundColor: "transparent",
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":
      {
        backgroundColor: "transparent",
      },
  },
  styleTable: {
    overflowY: "auto",
    maxHeight: "288px",
    "& .MuiTableCell-stickyHeader": {
      backgroundColor: "#ebebeb",
      height: "48px",
      boxSizing: "border-box",
      lineHeight: "0",
    },
    "& .MuiTableCell-root": {
      // padding: "14px 16px 13px 16px",
      height: "48px",
      boxSizing: "border-box",
      borderBottom: "2px solid #E5E5E5 !important",
    },
  },
  paddingSelect: {
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      padding: "5px 5px",
    },
    padding: "1px 5px !important",
  },
  outlined: {
    "& .MuiSelect-outlined": {
      padding: "10px !important",
    },
    "& .MuiSelect-root": {
      fontSize: "16px !important",
      color: "#939393",
    },
  },
  dropDownSelectTask: {
    backgroundColor: "#fff",
    // position: 'absolute',
    // border: '1px solid #E9E9E9',
    borderRadius: "5px",
    padding: "16px",
    zIndex: "9",
    width: "302px",
    height: "277px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  selectCustom: {
    "& .MuiSelect-selectMenu": {
      padding: "10px !important",
    },
    "& .MuiPopover-paper": {
      padding: "10px !important",
    },
  },
  selectTypeCustom: {
    top: "200px !important",
    padding: "16px",
    minWidth: "232px !important",
    boxSizing: "border-box",
    height: "168px !important",
    "& li": {
      minHeight: "40px !important",
    },
  },
});

const listTask = [
  {
    taskId: 1,
    name: "Task 1",
  },
  {
    taskId: 2,
    name: "Task 12",
  },
  {
    taskId: 3,
    name: "Task 31",
  },
];

const data = [
  {
    taskId: 1,
    planVideoId: 1,
    startTime: { h: 10, m: 0, s: 0 },
    endTime: { h: 10, m: 0, s: 0 },
    stayTime: { h: 10, m: 0, s: 0 },
    no: 1,
  },
  {
    taskId: 2,
    planVideoId: 2,
    startTime: { h: 10, m: 0, s: 0 },
    dataTimeMax: { h: 12, m: 0, s: 0 },
    dataTimeMin: { h: 13, m: 0, s: 0 },
    endTime: { h: 10, m: 0, s: 0 },
    stayTime: { h: 10, m: 0, s: 0 },
    no: 2,
  },
  {
    taskId: 3,
    planVideoId: 1,
    startTime: { h: 10, m: 0, s: 0 },
    endTime: { h: 10, m: 0, s: 0 },
    stayTime: { h: 10, m: 0, s: 0 },
    no: 1,
  },
];

const listHours = Array.from({ length: 24 }, (_, index) => ({
  title: index < 10 ? `0${index}` : `${index}`,
  value: index,
}));

const listMinutes = Array.from({ length: 60 }, (_, index) => ({
  title: index < 10 ? `0${index}` : `${index}`,
  value: index,
}));

const ModalAddPlanSchedule = ({
  open,
  handleClose,
  indexGroup,
  handleAddSubGroup,
  isDisabled,
  detailPlan,
  setDetailPlan,
  handleSavePlan,
}) => {
  const classes = useStyles();
  const [isOpenModalAddTaskView, setIsOpenModalAddTaskView] = useState();
  const [arrayHeader, setArrayHeader] = useState([]);
  const [dataClone, setDataClone] = useState(data);
  const [taskViewDelete, setTaskViewDelete] = useState(null);

  useEffect(() => {
    switch (detailPlan.type) {
      case 1:
        setArrayHeader([
          { label: "No.", width: 2 },
          { label: "Task Name", width: 400 },
          { label: "Operation", width: 250 },
        ]);
        break;
      case 2:
        setArrayHeader([
          { label: "No.", width: 1 },
          { label: "Task Name", width: 340 },
          { label: "Stay time", width: 160 },
          { label: "Operation", width: 160 },
        ]);
        break;
      case 3:
        setArrayHeader([
          { label: "No.", width: 1 },
          { label: "Task Name", width: 330 },
          { label: "Start time", width: 150 },
          { label: "End time", width: 150 },
          { label: "Operation", width: 150 },
        ]);
        break;
      default:
        setArrayHeader([
          { label: "No.", width: 2 },
          { label: "Task Name", width: 400 },
          { label: "Operation", width: 250 },
        ]);
        break;
    }
  }, [detailPlan.type]);

  const onChangeValue = useCallback(
    ({ value, name, subName, index }) => {
      console.log(value, name, subName, index);
      let data = [...dataClone];
      if (subName) {
        data[index][name][subName] = value;
        setDataClone([...data]);
      } else {
        data[index][name] = value;
        setDataClone([...data]);
      }
    },
    [dataClone]
  );

  const handleDeleteTask = (id) => {
    console.log(id);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        maxWidth="1000px"
      >
        <Box style={{ width: 1000, height: 861, position: "relative" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "23px 0 30px 0",
              // marginBottom: '30px'
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: "21px" }}>
              Add Plan
            </Typography>
          </Box>
          <DialogContent style={{ paddingTop: "0px" }}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Box
                className="checkbox-custom"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography>Plan Name:</Typography>
                <TextField
                  className="checkbox-custom"
                  variant="outlined"
                  size="small"
                  value={detailPlan.name || ""}
                  onChange={(e) =>
                    setDetailPlan({ ...detailPlan, name: e.target.value })
                  }
                />
              </Box>
              <Box
                className="checkbox-custom"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography>Plan Type:</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    // value={age}
                    onChange={(e) =>
                      setDetailPlan({ ...detailPlan, type: e.target.value })
                    }
                    classes={"tesst-cass-d"}
                    className={`checkkkk-from ${classes.selectCustom}`}
                    displayEmpty
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "right",
                      },
                      getContentAnchorEl: null,
                      classes: { paper: classes.selectTypeCustom },
                    }}
                    variant="outlined"
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={1}>Manual</MenuItem>
                    <MenuItem value={2}>TOUR</MenuItem>
                    <MenuItem value={3}>SCHEDULE</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
                Plan Details
              </Typography>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpenModalAddTaskView(true)}
              >
                <AddIcon color="secondary" style={{ fontSize: "27px" }} />
                <Typography
                  style={{
                    fontSize: "18px",
                    color: "red",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Add Task View
                </Typography>
              </Box>
            </Box>
            <RenderTablePlan
              listTask={listTask}
              header={arrayHeader}
              bodyContent={dataClone}
              typePlan={detailPlan.type}
              onChangeValue={onChangeValue}
              onChangeTableValue={(newValue) => setDataClone([...newValue])}
              classes={classes}
              setTaskViewDelete={setTaskViewDelete}
            />
            {detailPlan.type === 3 && (
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.root}
                      // inputProps={{ 'aria-label': 'primary checkbox' }}
                      onChange={(e) => {
                        console.log(e);
                        setDetailPlan({
                          ...detailPlan,
                          playThisTask: e.target.checked,
                        });
                      }}
                      value={detailPlan.playThisTask || false}
                    />
                  }
                  label="Play this Task View for the Time Remaining"
                />
                <Select
                  native
                  id="demo-customized-select-native"
                  variant="outlined"
                  className={classes.outlined}
                  style={{
                    width: "200px",
                    height: "48px",
                    fontSize: "12px",
                    padding: "0px",
                  }}
                  defaultValue={1}
                  size="small"
                  onChange={(e) =>
                    setDetailPlan({ ...detailPlan, type: e.target.value })
                  }
                >
                  <option value={1}>Manual </option>
                  <option value={2}>Tour</option>
                  <option value={3}>Schedule</option>
                </Select>
              </Box>
            )}
          </DialogContent>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              position: "absolute",
              bottom: "0",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                padding: "23.5px 24px 24px",
                borderTop: "0.5px solid #8d8e91",
                width: "90%",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleClose}
                style={{
                  width: "150px",
                  height: "48px",
                  background: "#fff",
                  color: "#333",
                  fontWeight: "600",
                  border: "solid 1px ",
                  marginRight: "32px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  handleSavePlan();
                }}
                style={{
                  width: "150px",
                  height: "48px",
                  background: "#dd3d4b",
                  color: "#fff",
                  fontWeight: "600",
                }}
                disabled={isDisabled}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {isOpenModalAddTaskView && (
        <ModalAddTaskView
          data={data}
          open={isOpenModalAddTaskView}
          handleClose={() => setIsOpenModalAddTaskView(false)}
        />
      )}
      {taskViewDelete !== null && (
        <ModalDeleteTask
          open={taskViewDelete !== null}
          handleClose={() => setTaskViewDelete(null)}
          handleDelete={handleDeleteTask}
          taskIndex={taskViewDelete}
        />
      )}
    </React.Fragment>
  );
};

const RenderTablePlan = memo(
  ({
    header = [],
    bodyContent = [],
    typePlan,
    onChangeValue,
    onChangeTableValue,
    setTaskViewDelete,
    listTask,
    classes,
  }) => {
    const [indexRowEdit, setIndexRowEdit] = useState();
    const [selectTaskView, setSelectTaskView] = useState(null);

    const open = useMemo(() => Boolean(selectTaskView), [selectTaskView]);
    const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

    const onNodeSelect = (node) => {
      console.log(node);
    };

    return (
      <React.Fragment>
        <TableContainer
          style={{ paddingBottom: 30, maxHeight: "288px" }}
          className={classes.styleTable}
        >
          <Table aria-label="simple table" size="small" stickyHeader>
            <TableHead style={{ height: 15 }}>
              <TableRow
                style={{
                  border: "2px solid #E5E5E5",
                  height: 15,
                  backgroundColor: "#ebebeb",
                }}
              >
                {header.map((item, index, array) => {
                  return (
                    <TableCell
                      width={item.width}
                      key={index}
                      align={index !== 1 ? "center" : "left"}
                      style={{
                        fontWeight: "bold",
                        padding: "14px 16px 13px 16px",
                        ...(index >= 1
                          ? { borderLeft: "2px solid #E5E5E5" }
                          : {}),
                      }}
                    >
                      {item.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {bodyContent.map((planTask, index) => (
                // <RenderRowDetailPlan
                //     key={index}
                //     typePlan={typePlan}
                //     planTask={planTask}
                //     number={index + 1}
                //     index={index}
                //     indexRowEdit={indexRowEdit}
                //     onClickEditRow={(index) => setIndexRowEdit(index)}
                //     onChangeValue={onChangeValue}
                // />
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ padding: "14px 16px 13px 16px" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderLeft: "2px solid #E5E5E5",
                      padding: "14px 16px 13px 16px",
                      position: "relative",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "16px", lineHeight: "0" }}>
                        {
                          listTask.find(
                            (item) => item.taskId === planTask.taskId
                          ).name
                        }
                      </Typography>
                      <React.Fragment>
                        {/* {(!open || indexRowEdit !== index) && */}
                        <img
                          src={TriangleDown}
                          style={{
                            height: "20px",
                            width: "20px",
                            ...(open && indexRowEdit === index
                              ? { rotate: "180deg" }
                              : {}),
                          }}
                          onClick={(e) => {
                            setSelectTaskView(e.currentTarget);
                            setIndexRowEdit(index);
                          }}
                        />
                        {/* } */}
                        {indexRowEdit === index && (
                          <Popover
                            id={id}
                            className="chekc-popover"
                            open={open}
                            anchorEl={selectTaskView}
                            onClose={() => setSelectTaskView(null)}
                            anchorOrigin={{
                              vertical: 30,
                              horizontal: 21,
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Box className={classes.dropDownSelectTask}>
                              <RenderTreeViewTask
                                classes={classes}
                                onNodeSelect={onNodeSelect}
                              />
                            </Box>
                          </Popover>
                        )}
                      </React.Fragment>
                    </Box>
                  </TableCell>
                  {typePlan === 2 && (
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "2px solid #E5E5E5",
                        padding: "9px 16px 7px",
                      }}
                    >
                      <RenderSelectTime
                        handleChange={({ value, name }) =>
                          onChangeValue({
                            value,
                            name: "stayTime",
                            subName: name,
                            index,
                          })
                        }
                        valueTime={planTask.stayTime}
                        classes={classes}
                      />
                    </TableCell>
                  )}
                  {typePlan === 3 && (
                    <React.Fragment>
                      <TableCell
                        align="center"
                        style={{
                          borderLeft: "2px solid #E5E5E5",
                          padding: "9px 16px 7px",
                        }}
                      >
                        <RenderSelectTime
                          handleChange={({ value, name }) =>
                            onChangeValue({
                              value,
                              name: "startTime",
                              subName: name,
                              index,
                            })
                          }
                          valueTime={planTask.startTime}
                          classes={classes}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          borderLeft: "2px solid #E5E5E5",
                          padding: "9px 16px 7px",
                        }}
                      >
                        <RenderSelectTime
                          handleChange={({ value, name }) =>
                            onChangeValue({
                              value,
                              name: "endTime",
                              subName: name,
                              index,
                            })
                          }
                          valueTime={planTask.endTime}
                          classes={classes}
                        />
                      </TableCell>
                    </React.Fragment>
                  )}
                  <TableCell
                    align="center"
                    style={{
                      borderLeft: "2px solid #E5E5E5",
                      padding: "14px 16px 13px 16px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={DownArrow}
                        style={{
                          marginRight: "16px",
                          cursor: "pointer",
                          ...(index === bodyContent.length - 1
                            ? { opacity: 0.5 }
                            : { opacity: 1 }),
                        }}
                        onClick={() => {
                          if (index === bodyContent.length - 1) return;
                          let dataArray = [...bodyContent];
                          [dataArray[index], dataArray[index + 1]] = [
                            dataArray[index + 1],
                            dataArray[index],
                          ];
                          onChangeTableValue([...dataArray]);
                        }}
                      />
                      <img
                        src={UpArrow}
                        style={{
                          marginRight: "16px",
                          cursor: "pointer",
                          ...(index === 0 ? { opacity: 0.5 } : { opacity: 1 }),
                        }}
                        onClick={() => {
                          if (index === 0) return;
                          let dataArray = [...bodyContent];
                          [dataArray[index], dataArray[index - 1]] = [
                            dataArray[index - 1],
                            dataArray[index],
                          ];
                          onChangeTableValue([...dataArray]);
                        }}
                      />
                      <img
                        src={TrashBin}
                        style={{ cursor: "pointer" }}
                        onClick={() => setTaskViewDelete(planTask)}
                      />
                      {/* <ArrowDropDownIcon fontSize="large" color={index === (bodyContent.length - 1) ? 'disabled' : 'inherit'}
                                            onClick={() => {
                                                if (index === (bodyContent.length - 1)) return;
                                                let dataArray = [...bodyContent];
                                                [dataArray[index], dataArray[index + 1]] = [dataArray[index + 1], dataArray[index]];
                                                onChangeTableValue([...dataArray]);
                                            }}
                                        /> */}
                      {/* <ArrowDropUpIcon fontSize="large" color={index === 0 ? 'disabled' : 'inherit'}
                                            onClick={() => {
                                                if (index === 0) return;
                                                let dataArray = [...bodyContent];
                                                [dataArray[index], dataArray[index - 1]] = [dataArray[index - 1], dataArray[index]];
                                                onChangeTableValue([...dataArray]);
                                            }}
                                        /> */}
                      {/* <DeleteOutlineIcon
                                            onClick={() => setTaskViewDelete(planTask)}
                                        /> */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
    },
  },
};

const RenderSelectTime = ({ handleChange, valueTime, classes }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Select
        value={valueTime.h}
        onChange={(e) => handleChange({ value: e.target.value, name: "h" })}
        displayEmpty
        MenuProps={MenuProps}
        variant="outlined"
        className={classes.paddingSelect}
        inputProps={{
          "aria-label": "Without label",
          IconComponent: () => (
            <img style={{ width: "12px" }} src={TriangleDown} />
          ),
        }}
      >
        {listHours.map((value, index) => {
          return (
            <MenuItem key={index} value={value.value}>
              {value.title}
            </MenuItem>
          );
        })}
      </Select>
      <span style={{ margin: "0px 3px" }}>:</span>
      <Select
        value={valueTime.m}
        onChange={(e) => handleChange({ value: e.target.value, name: "m" })}
        displayEmpty
        MenuProps={MenuProps}
        variant="outlined"
        className={classes.paddingSelect}
        inputProps={{
          "aria-label": "Without label",
          IconComponent: () => (
            <img style={{ width: "12px" }} src={TriangleDown} />
          ),
        }}
      >
        {listMinutes.map((value, index) => {
          return (
            <MenuItem key={index} value={value.value}>
              {value.title}
            </MenuItem>
          );
        })}
      </Select>
      <span style={{ margin: "0px 3px" }}>:</span>
      <Select
        value={valueTime.s}
        onChange={(e) => handleChange({ value: e.target.value, name: "s" })}
        displayEmpty
        MenuProps={MenuProps}
        variant="outlined"
        className={classes.paddingSelect}
        inputProps={{
          "aria-label": "Without label",
          IconComponent: () => (
            <img style={{ width: "12px" }} src={TriangleDown} />
          ),
        }}
      >
        {listMinutes.map((value, index) => {
          return (
            <MenuItem key={index} value={value.value}>
              {value.title}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

const dataTreeView = [
  {
    id: 0,
    name: "Parent",
    children: [
      {
        id: 1,
        name: "Child - 1",
      },
      {
        id: 3,
        name: "Child - 3",
        children: [
          {
            id: 4,
            name: "Child - 4",
            children: [
              {
                id: 7,
                name: "Child - 7",
              },
              {
                id: 8,
                name: "Child - 8",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Child - 5",
        children: [
          {
            id: 6,
            name: "Child - 6",
          },
        ],
      },
    ],
  },
];

const employees = [
  {
    id: 1,
    name: "John Heart",
    prefix: "Dr.",
    position: "CEO",
    nodeChildren: [
      {
        id: 2,
        name: "Samantha Bright",
        prefix: "Dr.",
        position: "COO",
        nodeChildren: [
          {
            id: 3,
            name: "Kevin Carter",
            prefix: "Mr.",
            position: "Shipping Manager",
          },
          {
            id: 14,
            name: "Victor Norris",
            prefix: "Mr.",
            selected: true,
            position: "Shipping Assistant",
          },
        ],
      },
      {
        id: 4,
        name: "Brett Wade",
        prefix: "Mr.",
        position: "IT Manager",
        nodeChildren: [
          {
            id: 5,
            name: "Amelia Harper",
            prefix: "Mrs.",
            position: "Network Admin",
          },
          {
            id: 6,
            name: "Wally Hobbs",
            prefix: "Mr.",
            position: "Programmer",
          },
          {
            id: 7,
            name: "Brad Jameson",
            prefix: "Mr.",
            position: "Programmer",
          },
          {
            id: 8,
            name: "Violet Bailey",
            prefix: "Ms.",
            position: "Jr Graphic Designer",
          },
        ],
      },
      {
        id: 9,
        name: "Barb Banks",
        prefix: "Mrs.",
        position: "Support Manager",
        nodeChildren: [
          {
            id: 10,
            name: "Kelly Rodriguez",
            prefix: "Ms.",
            position: "Support Assistant",
          },
          {
            id: 11,
            name: "James Anderson",
            prefix: "Mr.",
            position: "Support Assistant",
          },
        ],
      },
    ],
  },
];

const RenderTreeViewTask = ({ classes, onNodeSelect }) => {
  const [selected, setSelected] = useState([]);

  const [dataTree, setDataTree] = useState(employees);
  const [nodeChildLast, setNodeChildLast] = useState([]);
  const treeViewRef = useRef(null);

  const handleSearch = (e) => {
    // let value = document.querySelector('.k-textbox').value
    console.log(e.target.value);
    let newData = search(employees, e.target.value);
    setDataTree(newData);
  };

  useEffect(() => {
    getChildLastNode(employees);
  }, []);

  const getChildLastNode = (data) => {
    if (!Array.isArray(data)) {
      nodeChildLast.push(data.id);
      setNodeChildLast([...nodeChildLast]);
    } else {
      data.forEach((item) => {
        if (item.nodeChildren) {
          getChildLastNode(item.nodeChildren);
        } else {
          getChildLastNode(item);
        }
      });
    }
  };

  const handleSelectNode = (node) => {
    if (nodeChildLast.includes(node)) onNodeSelect(node);
    else return;
  };

  console.log(nodeChildLast);

  const search = (items, term) => {
    return items.reduce((acc, item) => {
      if (contains(item.name, term)) {
        acc.push(item);
      } else if (item.nodeChildren && item.nodeChildren.length > 0) {
        let newItems = search(item.nodeChildren, term);
        if (newItems && newItems.length > 0) {
          acc.push({ name: item.name, nodeChildren: newItems, id: item.id });
        }
      }
      return acc;
    }, []);
  };

  const contains = (text, term) => {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  };

  const renderTree = (nodes) => {
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  widthL: "100%",
                  alignItems: "center",
                }}
              >
                {nodes.name}
              </Box>
            }
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.nodeChildren)
          ? nodes.nodeChildren.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <Box>
      <TextField
        onChange={handleSearch}
        placeholder="Search"
        style={{
          fontSize: "16px",
          fontWeight: "500",
          width: "100%",
          marginBottom: "16px",
        }}
        size="small"
        variant="outlined"
        className="textbox-search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#939393" }} />
            </InputAdornment>
          ),
        }}
      />
      <TreeView
        style={{ overflowY: "auto", overflowX: "hidden" }}
        defaultCollapseIcon={
          <img
            src={TriangleDown}
            style={{ marginLeft: 10, zIndex: 1, width: "20px" }}
          />
        }
        defaultExpandIcon={
          <img
            src={TriangleDown}
            style={{
              marginLeft: 10,
              zIndex: 1,
              width: "20px",
              rotate: "-90deg",
            }}
          />
        }
        className={classes.root}
        onNodeSelect={(e, value) => handleSelectNode(value)}
      >
        {Array.isArray(dataTree)
          ? dataTree.map((item, index) => renderTree(item))
          : renderTree(dataTree)}
      </TreeView>
    </Box>
  );
};

export default React.memo(ModalAddPlanSchedule);
