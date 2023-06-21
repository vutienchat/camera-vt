import React, { useCallback, useContext, useState } from "react";

import {
  Box,
  Checkbox,
  Collapse,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { EditIcon } from "../../../../../common/icons/EditIcon";
import { DeleteIcon } from "../../../../../common/icons/DeleteIcon";
import { DropdownIcon } from "../../../../../common/icons/DropdownIcon";
import { ExpandMoreIcon } from "../../../../../common/icons/ExpandMoreIcon";
import { InfoDetailIcon } from "../../../../../common/icons/InfoDetailIcon";

import { GroupContext } from "../../../../../page/mangament/Customer/Customer";

export const CustomerItemContent = ({ groupTreeList, parentId }) => {
  const classes = useStylesTableBodyGroup();
  const {
    checkedGroup,
    setCheckedGroup,
    selectedColumns,
    setOpenEditGroupModal,
    setGroupDetail,
    setIsOpenGroupDetailGroup,
    setIsOpenDeleteGroupModal,
  } = useContext(GroupContext);

  const [collapse, setCollapse] = useState({ [parentId]: true });

  const handleClick = (item) => {
    const newCollapse = { ...collapse, [item]: !collapse[item] };
    setCollapse(newCollapse);
  };

  const handleCommonCheckParent = (id, arr) => {
    let idParentChecked = groupTreeList[id].data.parentId;

    if (
      idParentChecked !== "1234" &&
      idParentChecked !== "root" &&
      idParentChecked !== ""
    ) {
      let count = 0;

      for (let i = 0; i < groupTreeList[idParentChecked].children.length; i++) {
        if (arr.includes(groupTreeList[idParentChecked].children[i])) {
          count += 1;
        }
      }

      if (count === groupTreeList[idParentChecked].children.length) {
        arr.push(idParentChecked);
        setCheckedGroup(arr);
      }

      handleCommonCheckParent(idParentChecked, arr);
    }
  };

  const handleCommonCheckChild = (arr, id) => {
    let childChecked = groupTreeList[id].children;

    for (let i = 0; i < childChecked.length; i++) {
      arr.push(childChecked[i]);
      setCheckedGroup(arr);

      handleCommonCheckChild(arr, childChecked[i]);
    }
  };

  const handleCommonCheck = (groupTreeList, id) => {
    let arrNew = [...checkedGroup];
    let childChecked = groupTreeList[id].children;

    arrNew.push(id);
    handleCommonCheckParent(id, arrNew);

    if (childChecked.length > 0) {
      handleCommonCheckChild(arrNew, id);
    }
    setCheckedGroup(arrNew);
  };

  const handleCommonUnCheckParent = (id) => {
    if (id !== parentId && id !== "") {
      const idParentChecked = groupTreeList[id].data.parentId;

      setCheckedGroup((prev) =>
        prev.filter((child) => child !== id && child !== idParentChecked)
      );

      handleCommonUnCheckParent(idParentChecked);
    }
  };

  const handleCommonUncheck = (groupTreeList, id) => {
    handleCommonUnCheckParent(id);

    if (groupTreeList[id].children.length > 0) {
      for (let i = 0; i < groupTreeList[id].children.length; i++) {
        handleCommonUncheck(groupTreeList, groupTreeList[id].children[i]);
      }
    }
  };

  const handleCheckAllParent = (id, isChecked) => {
    if (isChecked) {
      handleCommonCheck(groupTreeList, id);
    } else {
      handleCommonUncheck(groupTreeList, id);
    }
  };

  const handleChangeCheckbox = (event) => {
    handleCheckAllParent(event.target.value, event.target.checked);
  };

  const treeTable = useCallback(
    (contentTable, collapseId, padding) => {
      return contentTable[collapseId].children.map((task) => {
        return (
          <React.Fragment key={task}>
            <TableRow
              hover
              style={{
                backgroundColor: checkedGroup.includes(task)
                  ? "#f6f4f4"
                  : "transparent",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{
                  padding: `0px 0px 0px ${groupTreeList[task].row * 15}px`,
                  border:
                    (!collapse[parentId] || !collapse[collapseId]) && "none",
                }}
              >
                <Collapse
                  key={collapseId}
                  in={collapse[parentId] && collapse[collapseId]}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box className={classes.checkBoxCell}>
                    {contentTable[task].children.length > 0 ? (
                      <Box
                        component="div"
                        key={contentTable[task]}
                        onClick={() => handleClick(task)}
                        style={{
                          paddingTop: "3px",
                          cursor: "pointer",
                          paddingLeft: `${padding}px`,
                        }}
                      >
                        {collapse[task] ? <DropdownIcon /> : <ExpandMoreIcon />}
                      </Box>
                    ) : null}
                    <Checkbox
                      value={task}
                      checked={checkedGroup.includes(task)}
                      size="small"
                      onChange={handleChangeCheckbox}
                    />
                  </Box>
                </Collapse>
              </TableCell>
              {selectedColumns.map(({ key, maxWidth, textAlign }) => (
                <TableCell
                  key={key}
                  component="th"
                  scope="row"
                  className={classes.tableCell}
                  style={{
                    maxWidth: maxWidth,
                    border:
                      (!collapse[parentId] || !collapse[collapseId]) && "none",
                  }}
                >
                  <Collapse
                    key={collapseId}
                    in={collapse[parentId] && collapse[collapseId]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography style={{ textAlign }}>
                      {contentTable[task].data[key]}
                    </Typography>
                  </Collapse>
                </TableCell>
              ))}
              <TableCell
                style={{
                  padding: 0,
                  maxWidth: 80,
                  border:
                    (!collapse[parentId] || !collapse[collapseId]) && "none",
                }}
                component="th"
                scope="row"
              >
                <Collapse
                  key={collapseId}
                  in={collapse[parentId] && collapse[collapseId]}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box className={classes.iconButton}>
                    <Box
                      component="div"
                      onClick={() => {
                        setGroupDetail(groupTreeList[task]);
                        setIsOpenGroupDetailGroup(true);
                      }}
                    >
                      <InfoDetailIcon />
                    </Box>
                    <Box
                      component="div"
                      onClick={() => {
                        setGroupDetail(groupTreeList[task]);
                        setOpenEditGroupModal(true);
                      }}
                    >
                      <EditIcon />
                    </Box>
                    <Box
                      component="div"
                      onClick={() => {
                        setGroupDetail(groupTreeList[task]);
                        setIsOpenDeleteGroupModal(true);
                      }}
                    >
                      <DeleteIcon color="#000" />
                    </Box>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
            {treeTable(contentTable, task, padding + 12)}
          </React.Fragment>
        );
      });
    },
    [collapse, selectedColumns, checkedGroup]
  );

  return (
    <React.Fragment>{treeTable(groupTreeList, parentId, 12)}</React.Fragment>
  );
};

const useStylesTableBodyGroup = makeStyles({
  tableCell: {
    padding: "0px 10px 0px 0px",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  checkBoxCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gridGap: "5px",
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gridGap: "10px",
    "& div": {
      cursor: "pointer",
    },
  },
});
