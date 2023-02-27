import {
  Box,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeItem from "@material-ui/lab/TreeItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ViewSideDevice from "./ViewSideDevice";
import ViewSideTaskWall from "./ViewSideTaskWall";
import PopUpOptionSideBar from "./PopUpOptionSideBar";
import { getGroupTree } from "./javascript";
import { ModalAddGroup, ModalAddPlan, ModalRenameTask } from "../modal/index";
import { dataInitTask } from "./dataSideBar";

const useStyles = makeStyles({
  Sub: {
    borderBottom: "solid 1px #e5e5e5",
    "& .MuiTreeItem-content": {
      height: 50,
      flexDirection: "row-reverse",
      borderBottom: "solid 2px #e5e5e5",

      "& .MuiTreeItem-label": {
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: "15px",
      },
    },
  },
  isSub: {
    "& .MuiTreeItem-content": {
      height: 50,
      flexDirection: "row",
      borderBottom: "none",
      "& .MuiTreeItem-label": {
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
      },
    },
  },
  root: {
    "& .MuiTreeItem-label": {
      backgroundColor: "#fff !important",
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label ": {
      backgroundColor: "#fff !important",
    },
  },
  boxHead: {
    display: "flex",
    flex: "1",
    height: "40px",
    alignItems: "center",
    justifyContent: "space-around",
    borderBlock: "solid 1px #e5e5e5",
    cursor: "pointer",
  },
  active: {
    borderBottom: "solid 2px red",
  },
  iconStyle: {
    fontSize: "40px  !important",
    marginRight: 15,
    zIndex: 1,
  },
  sideBar: {
    width: 400,
    border: "solid 1px #e5e5e5",
    maxHeight: 975,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  },
});

export const renderData = (data, classes, handleShowPopupSelect, isNoIcon) => {
  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon style={{ fontSize: 40 }} />}
      defaultExpandIcon={<ArrowRightIcon style={{ fontSize: 40 }} />}
      style={{ marginLeft: 10 }}
    >
      {data &&
        data.map((item, index) => {
          return (
            <Box key={index}>
              <TreeItem
                onLabelClick={(e) => e.preventDefault()}
                key={item.id}
                label={
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography>{item.label}</Typography>
                    {!isNoIcon && (
                      <MoreHorizIcon
                        style={{ paddingRight: 24 }}
                        onClick={(e) => {
                          handleShowPopupSelect &&
                            handleShowPopupSelect(e, "", item);
                        }}
                      />
                    )}
                  </Box>
                }
                nodeId={String(index)}
                className={classes.isSub || ""}
              >
                <>
                  {item.nodeChildren && item.nodeChildren.length
                    ? renderData(
                        item.nodeChildren,
                        classes,
                        handleShowPopupSelect,
                        isNoIcon
                      )
                    : null}
                  {item.listTask && item.listTask.length
                    ? item.listTask.map((child, index) => {
                        return (
                          <TreeItem
                            onLabelClick={(e) => {
                              e.preventDefault();
                            }}
                            key={child.id}
                            label={
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <Typography>{child.label}</Typography>
                                <MoreHorizIcon
                                  style={{ paddingRight: 24 }}
                                  onClick={(e) => {
                                    handleShowPopupSelect &&
                                      handleShowPopupSelect(e, "task", child);
                                  }}
                                />
                              </Box>
                            }
                            nodeId={String(index)}
                            className={classes.isSub || ""}
                          ></TreeItem>
                        );
                      })
                    : null}
                </>
              </TreeItem>
            </Box>
          );
        })}
    </TreeView>
  );
};

const SideBar = ({ typeDisplaySide, data, setData, setListPlan, listPlan }) => {
  const classes = useStyles();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShowPopUpSelect, setIsShowPopupSelect] = useState(false);
  const [typeDisplay, setTypeDisplay] = useState("");
  const [indexGroup, setIndexGroup] = useState();
  const [dataGroup, setDataGroup] = useState();
  const [isModalAddGroup, setIsModalAddGroup] = useState(false);
  const [subGroupAdd, setSubGroupAdd] = useState();
  const [isDisabled, setDisabled] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const [isModalAddPlan, setIsModalAddPlan] = useState(false);
  const [isShowModalRename, setIsShowModalRename] = useState(false);
  const [listTaskInPlan, setListTaskInPlan] = useState([]);
  const [detailPlan, setDetailPlan] = useState({
    name: `Plan ${listPlan.length + 1}`,
    type: "MANUAL",
  });

  useEffect(() => {
    let disable = false;

    if (
      !subGroupAdd ||
      subGroupAdd.trim().length === 0 ||
      (indexGroup &&
        (!indexGroup.label || indexGroup.label.trim().length === 0))
    ) {
      setMessageErr("This field is required");
      disable = true;
    }

    if (data.map((item) => item.label).includes(subGroupAdd)) {
      setMessageErr("That name is not valid");
      disable = true;
    }

    if (typeDisplay === "main" && dataGroup.length > 100) {
      disable = true;
    }

    if (
      indexGroup &&
      indexGroup.nodeChildren &&
      indexGroup.nodeChildren.length > 100
    ) {
      disable = true;
    }

    if (indexGroup && Object.keys(indexGroup).length) {
      const tempData = [...data]
        .filter((item) => item.id !== indexGroup.id)
        .map((it) => it.label);

      if (tempData.includes(indexGroup.label)) {
        disable = true;
        setMessageErr("That name is not valid");
      }
    }

    setDisabled(disable);
  }, [subGroupAdd, data, typeDisplay, indexGroup, dataGroup]);

  useEffect(() => {
    const parseData =
      data &&
      [...data, ...dataInitTask].reduce((abc, nodeTree) => {
        if (nodeTree.parentId === "") {
          return [
            ...abc,
            { ...getGroupTree(nodeTree, [...data, ...dataInitTask]) },
          ];
        }
        return [...abc];
      }, []);
    console.log(parseData);
    setDataGroup([...parseData]);
  }, [data, dataInitTask]);

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

  const handleShowPopupSelect = (e, type, indexGroup) => {
    setIsShowPopupSelect((prev) => !prev);
    setAnchorEl(e.currentTarget);
    setTypeDisplay(type);
    setIndexGroup(indexGroup);
    setSubGroupAdd(
      `Sub Group  ${
        indexGroup && indexGroup.nodeChildren
          ? indexGroup.nodeChildren.length + 1
          : ""
      }`
    );
  };

  const handleAddSubGroup = (id) => {
    setData((prev) => {
      return [
        ...prev,
        {
          label: subGroupAdd,
          id: `setSubGroupAdd ${data.length}`,
          parentId: id ? id : "",
        },
      ];
    });
  };

  const renderSideBar = (type) => {
    let view;
    switch (type) {
      case "Device":
        view = <ViewSideDevice classes={classes} />;
        break;
      case "Event":
        view = "Event";
        break;
      case "View":
        view = (
          <ViewSideTaskWall
            classes={classes}
            handleShowPopupSelect={handleShowPopupSelect}
            dataGroup={dataGroup}
          />
        );
        break;
      case "Plan":
        view = "Plan";
        break;
      default:
        view = <ViewSideDevice classes={classes} />;
        break;
    }

    return view;
  };

  const listPlans = [...listTaskInPlan];
  const handleAddToPlan = (data) => {
    setIsModalAddPlan(true);
    const listPlanIds = [...listPlans].map((item) => item.id);
    if (data && data.listTask && data.listTask.length) {
      data.listTask.forEach((group) => {
        const taskIndex = dataInitTask.findIndex(
          (task) => task.id === group.id
        );
        if (
          taskIndex !== -1 &&
          !listPlanIds.includes(dataInitTask[taskIndex].id)
        )
          listPlans.push({ ...dataInitTask[taskIndex] });
      });
    }
    if (data && typeDisplay === "task") {
      const taskIndex = dataInitTask.findIndex((task) => task.id === data.id);
      if (taskIndex !== -1 && !listPlanIds.includes(dataInitTask[taskIndex].id))
        listPlans.push({ ...dataInitTask[taskIndex] });
    }
    if (data && data.nodeChildren && data.nodeChildren.length) {
      data.nodeChildren.forEach((item) => {
        handleAddToPlan(item);
      });
    }
    setListTaskInPlan([...listPlans]);
  };

  const handleSavePlan = () => {
    const temp = [...listPlan];
    temp.push({ ...detailPlan, planTaskVideo: [...listTaskInPlan] });
    setListPlan([...temp]);
  };

  const handleRename = (id) => {
    const tempData = [...data];
    const groupIdx = tempData.findIndex((item) => item.id === id);
    if (groupIdx !== -1) tempData[groupIdx] = { ...indexGroup };

    setData([...tempData]);
  };

  return (
    <React.Fragment>
      <Box className={classes.sideBar}>{renderSideBar(typeDisplaySide)}</Box>
      {isShowPopUpSelect && (
        <PopUpOptionSideBar
          open={isShowPopUpSelect}
          anchorEl={anchorEl}
          typeDisplay={typeDisplay}
          wrapperRef={wrapperRef}
          setIsShowPopupSelect={setIsShowPopupSelect}
          setIsModalAddGroup={setIsModalAddGroup}
          openModalRename={() => {
            setIsShowModalRename(true);
          }}
          data={indexGroup}
          handleAddToPlan={() => {
            handleAddToPlan(indexGroup);
          }}
        />
      )}
      {isModalAddGroup && (
        <ModalAddGroup
          open={isModalAddGroup}
          handleClose={() => setIsModalAddGroup(false)}
          indexGroup={indexGroup}
          setIndexGroup={setIndexGroup}
          handleAddSubGroup={handleAddSubGroup}
          subGroupAdd={subGroupAdd}
          setSubGroupAdd={setSubGroupAdd}
          isDisabled={isDisabled}
          messageErr={messageErr}
        />
      )}
      {isModalAddPlan && (
        <ModalAddPlan
          open={isModalAddPlan}
          handleClose={() => setIsModalAddPlan(false)}
          data={listTaskInPlan}
          setDetailPlan={setDetailPlan}
          detailPlan={detailPlan}
          handleSavePlan={handleSavePlan}
        />
      )}
      {isShowModalRename && (
        <ModalRenameTask
          open={isShowModalRename}
          handleClose={() => {
            setIsShowModalRename(false);
          }}
          handleRename={handleRename}
          taskIndex={indexGroup}
          setTaskIndex={setIndexGroup}
          type={typeDisplay}
          isDisabled={isDisabled}
          messageErr={messageErr}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(SideBar);
