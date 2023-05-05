import { Box, Checkbox, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeItem from "@material-ui/lab/TreeItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ViewSideDevice from "./ViewSideDevice";
import ViewSideTaskWall from "./ViewSideTaskWall";
import ViewSidePlan from "./ViewSidePlan";
import PopUpOptionSideBar from "./PopUpOptionSideBar";
import { getGroupTree } from "./javascript";
import {
  ModalAddGroup,
  ModalAddPlan,
  ModalDeleteTask,
  ModalRenameTask,
  ModalMove,
} from "../modal/index";
import { dataInitTask } from "./dataSideBar";
import ModalAddPlanSchedule from "../modal/ModalAddPlanSchedule";

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
      height: 40,
      flexDirection: "row",
      paddingBottom: "10px",
      borderBottom: "none",
      "& .MuiTreeItem-label": {
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
      },
      "& .MuiTreeItem-iconContainer": {
        // paddingLeft: "20px",
      },
    },
  },
  root: {
    "& .MuiTreeItem-label": {
      backgroundColor: "#fff !important",
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label ":
      {
        backgroundColor: "#fff !important",
      },
  },
  boxHead: {
    display: "flex",
    height: "40px",
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #e5e5e5",
    cursor: "pointer",
  },
  active: {
    borderBottom: "solid 2px red",
    background: "#e2e2e2",
    "& p": {
      fontWeight: "bold",
    },
  },
  iconStyle: {
    fontSize: "40px  !important",
    marginRight: 15,
    zIndex: 1,
  },
  sideBar: {
    width: 344,
    border: "solid 1px #e5e5e5",
    maxHeight: 975,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  },
  outlined: {
    "& .MuiSelect-outlined": {
      padding: "10px !important",
    },
  },
  buttonDevice: {
    height: 40,
    border: "solid 1px #ebebeb ",
  },
});

export const renderData = (
  data,
  classes,
  handleShowPopupSelect,
  isNoIcon,
  isMulti,
  handleMultiSelect
) => {
  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon style={{ fontSize: 40 }} />}
      defaultExpandIcon={<ArrowRightIcon style={{ fontSize: 40 }} />}
      // style={{ marginLeft: 10 }}
    >
      {data &&
        data.map((item, index) => {
          return (
            <Box key={index} style={{ marginLeft: 20 }}>
              <TreeItem
                onLabelClick={(e) => e.preventDefault()}
                key={item.id}
                label={
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{item.label}</Typography>
                    {!isNoIcon && (
                      <>
                        {isMulti ? (
                          <Checkbox
                            style={{ paddingRight: 25 }}
                            onClick={(e) => {
                              handleMultiSelect({ ...item }, e.target.checked);
                            }}
                            checked={item.checked || false}
                          />
                        ) : (
                          <MoreHorizIcon
                            style={{ paddingRight: 17 }}
                            onClick={(e) => {
                              handleShowPopupSelect &&
                                handleShowPopupSelect(e, "", item);
                            }}
                          />
                        )}
                      </>
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
                        isNoIcon,
                        isMulti,
                        handleMultiSelect
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
                                  alignItems: "center",
                                }}
                              >
                                <Typography>{child.label}</Typography>
                                {isMulti ? (
                                  <Checkbox style={{ paddingRight: 25 }} />
                                ) : (
                                  <MoreHorizIcon
                                    style={{ paddingRight: 17 }}
                                    onClick={(e) => {
                                      handleShowPopupSelect &&
                                        handleShowPopupSelect(e, "task", child);
                                    }}
                                  />
                                )}
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
  const [isShowModalRename, setIsShowModalRename] = useState(false);
  const [isModalAddGroup, setIsModalAddGroup] = useState(false);
  const [isModalAddPlan, setIsModalAddPlan] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isModalDeleteGroup, setIsModalDeleteGroup] = useState(false);
  const [typeDisplay, setTypeDisplay] = useState("");
  const [indexGroup, setIndexGroup] = useState();
  const [dataGroup, setDataGroup] = useState();
  const [subGroupAdd, setSubGroupAdd] = useState();
  const [messageErr, setMessageErr] = useState("");
  const [listTaskInPlan, setListTaskInPlan] = useState([]);
  const [isModalAddPlanSchedule, setIsModalAddPlanSchedule] = useState(false);
  const [isMulti, setIsMulti] = useState(false);
  const [groupSelected, setGroupSelected] = useState([]);

  const [detailPlan, setDetailPlan] = useState({
    name: `Plan ${listPlan.length + 1}`,
    type: "MANUAL",
  });

  const [objectSelectMove, setObjectSelectMove] = useState({});

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
    const temp = [...data];
    const parseData =
      temp &&
      [...temp].reduce((abc, nodeTree) => {
        if (nodeTree.parentId === "") {
          return [
            ...abc,
            { ...getGroupTree(nodeTree, [...temp, ...dataInitTask]) },
          ];
        }
        return [...abc];
      }, []);
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
            isMulti={isMulti}
            handleMultiSelect={handleMultiSelect}
          />
        );
        break;
      case "Plan":
        view = (
          <ViewSidePlan
            classes={classes}
            data={listTaskInPlan}
            onOpenModalAddPlanSchedule={(isOpen) =>
              setIsModalAddPlanSchedule(isOpen)
            }
          />
        );
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

  const handleDeleteGroup = (id) => {
    const tempData = [...data];
    const newData = tempData.filter((item) => item.id !== id);
    // console.log(newData);
    setData([...newData]);
  };

  const handleOpenModalMove = (objectSelect, typeDisplay) => {
    setIsShowPopupSelect(false);
    setObjectSelectMove({ ...objectSelect, typeDisplay: typeDisplay });
  };

  const tempData = [...data];
  const handleMultiSelect = (group, checked) => {
    const groupIdx = tempData.findIndex((item) => item.id === group.id);
    if (groupIdx !== -1) {
      tempData[groupIdx] = { ...tempData[groupIdx], checked: checked };
    }
    const listChild = tempData.filter((item) => item.parentId === group.id);
    if (listChild && listChild.length) {
      // const newList = listChild.map((item) => {
      //   return { ...item, checked: checked };
      // });
      listChild.forEach((data) => {
        handleMultiSelect(data, checked);
        // const index = tempData.findIndex((it) => it.id === data.id);
        // if (index !== -1) tempData[index] = { ...data };
      });
      const parentIdx = tempData.findIndex(
        (temp) => temp.id === tempData[groupIdx].parentId
      );
      if (
        !listChild
          .map((child) => child.checked)
          .every((value) => value === true)
      ) {
        if (parentIdx !== -1)
          tempData[parentIdx] = { ...tempData[parentIdx], checked: false };
      } else {
        if (parentIdx !== -1)
          tempData[parentIdx] = { ...tempData[parentIdx], checked: true };
      }
    } else {
      const groupParentIdx = tempData.findIndex(
        (it) => it.id === group.parentId
      );
      if (checked === false) {
        tempData[groupParentIdx] = {
          ...tempData[groupParentIdx],
          checked: false,
        };
      } else {
        if (
          tempData
            .filter((item) => item.parentId === tempData[groupParentIdx].id)
            .map((it) => it.checked)
            .every((value) => value === true)
        ) {
          tempData[groupParentIdx] = {
            ...tempData[groupParentIdx],
            checked: true,
          };
        }
      }
    }
    setData([...tempData]);
  };

  return (
    <React.Fragment>
      <Box className={classes.sideBar}>{renderSideBar(typeDisplaySide)}</Box>

      {Object.keys(objectSelectMove).length !== 0 && (
        <ModalMove
          handleClose={() => setObjectSelectMove({})}
          handleMoveTask={() => console.log("move")}
          objectSelectMove={objectSelectMove}
          groupData={data}
          taskData={dataInitTask}
        />
      )}
      {isShowPopUpSelect && (
        <PopUpOptionSideBar
          open={isShowPopUpSelect}
          anchorEl={anchorEl}
          typeDisplay={typeDisplay}
          wrapperRef={wrapperRef}
          setIsShowPopupSelect={setIsShowPopupSelect}
          setIsModalAddGroup={setIsModalAddGroup}
          handleOpenModalMove={handleOpenModalMove}
          openModalRename={() => {
            setIsShowModalRename(true);
          }}
          data={indexGroup}
          handleAddToPlan={() => {
            handleAddToPlan(indexGroup);
          }}
          openModalDelete={() => setIsModalDeleteGroup(true)}
          setIsMulti={() => setIsMulti(true)}
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
          classes={classes}
          setDetailPlan={setDetailPlan}
          detailPlan={detailPlan}
          handleSavePlan={handleSavePlan}
        />
      )}
      {isModalAddPlanSchedule && (
        <ModalAddPlanSchedule
          open={isModalAddPlanSchedule}
          handleClose={() => setIsModalAddPlanSchedule(false)}
          data={listTaskInPlan}
          classes={classes}
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
      <ModalDeleteTask
        open={isModalDeleteGroup}
        handleClose={() => setIsModalDeleteGroup(false)}
        taskIndex={indexGroup}
        handleDelete={handleDeleteGroup}
      />
    </React.Fragment>
  );
};

export default React.memo(SideBar);
