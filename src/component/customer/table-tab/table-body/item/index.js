import React, { useCallback, useContext, useState } from "react";

import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { EditIcon } from "../../../../../common/icons/EditIcon";
import { DeleteIcon } from "../../../../../common/icons/DeleteIcon";
import { DropdownIcon } from "../../../../../common/icons/DropdownIcon";
import { ExpandMoreIcon } from "../../../../../common/icons/ExpandMoreIcon";
import { InfoDetailIcon } from "../../../../../common/icons/InfoDetailIcon";
import { GroupContext } from "../../../../../page/mangament/Customer/Customer";

export const CustomerItemContent = ({ customerTreeList, parentId }) => {
  const { selectedColumns, setOpenEditGroupModal, setGroupDetail } =
    useContext(GroupContext);

  const [state, setState] = useState({ parentNode: true });
  const [checked, setChecked] = useState([]);

  const handleClick = (item) => {
    const newstate = { ...state, [item]: !state[item] };
    setState(newstate);
  };

  const handleChangeCheckbox = (event) => {
    if (customerTreeList[event.target.value].children.length > 0) {
    } else {
    }
  };

  const treeTable = useCallback(
    (contentTable, collapseId) => {
      return contentTable[collapseId].children.map((task) => (
        <React.Fragment key={task}>
          <TableRow hover>
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state[parentId] && state[collapseId]}
                timeout="auto"
                unmountOnExit
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gridGap="5px"
                >
                  {contentTable[task].children.length > 0 ? (
                    <Box
                      component="div"
                      key={contentTable[task]}
                      onClick={() => handleClick(task)}
                      style={{ paddingTop: "3px", cursor: "pointer" }}
                    >
                      {state[task] ? <DropdownIcon /> : <ExpandMoreIcon />}
                    </Box>
                  ) : null}
                  <Checkbox
                    value={task}
                    size="small"
                    onChange={handleChangeCheckbox}
                  />
                  {checked[task] && "okok"}
                </Box>
              </Collapse>
            </TableCell>
            {selectedColumns.map(({ key, format = (value) => value }) => (
              <TableCell style={{ padding: 0 }} key={key}>
                <Collapse
                  key={collapseId}
                  in={state[parentId] && state[collapseId]}
                  timeout="auto"
                  unmountOnExit
                >
                  {contentTable[task].data[key]}
                </Collapse>
              </TableCell>
            ))}
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state[parentId] && state[collapseId]}
                timeout="auto"
                unmountOnExit
              >
                <Box display="flex" alignItems="center" gridGap="10px">
                  <InfoDetailIcon />
                  <IconButton
                    onClick={() => {
                      setOpenEditGroupModal(true);
                      setGroupDetail(task[collapseId]);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <DeleteIcon color="#000" />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
          {treeTable(contentTable, task)}
        </React.Fragment>
      ));
    },
    [state, selectedColumns, checked]
  );

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell style={{ padding: 0 }}>
          <Collapse
            key={"parentNode"}
            in={state["parentNode"]}
            timeout="auto"
            unmountOnExit
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gridGap="5px"
            >
              {customerTreeList[parentId].children.length > 0 ? (
                <Box
                  component="div"
                  key={customerTreeList[parentId]}
                  onClick={() => handleClick(parentId)}
                  style={{ paddingTop: "3px", cursor: "pointer" }}
                >
                  {state[parentId] ? <DropdownIcon /> : <ExpandMoreIcon />}
                </Box>
              ) : null}
              <Checkbox
                value={parentId}
                size="small"
                onChange={handleChangeCheckbox}
              />
            </Box>
          </Collapse>
        </TableCell>
        {selectedColumns.map(({ key }) => (
          <TableCell style={{ padding: 0 }} key={key}>
            <Collapse
              key={"parentNode"}
              in={state["parentNode"]}
              timeout="auto"
              unmountOnExit
            >
              {customerTreeList[parentId].data[key]}
            </Collapse>
          </TableCell>
        ))}
        <TableCell style={{ padding: 0 }}>
          <Collapse
            key={"parentNode"}
            in={state["parentNode"]}
            timeout="auto"
            unmountOnExit
          >
            <Box display="flex" alignItems="center" gridGap="10px">
              <InfoDetailIcon />
              <EditIcon />
              <DeleteIcon color="#000" />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {treeTable(customerTreeList, parentId)}
    </React.Fragment>
  );
};
