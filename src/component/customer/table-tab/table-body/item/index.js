import React, { useCallback, useContext, useState } from "react";

import {
  Box,
  Checkbox,
  Collapse,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { CustomerContext } from "../../..";
import { EditIcon } from "../../../../../common/icons/EditIcon";
import { DeleteIcon } from "../../../../../common/icons/DeleteIcon";
import { DropdownIcon } from "../../../../../common/icons/DropdownIcon";
import { ExpandMoreIcon } from "../../../../../common/icons/ExpandMoreIcon";
import { InfoDetailIcon } from "../../../../../common/icons/InfoDetailIcon";

export const CustomerItemContent = ({ task, parentId }) => {
  const { selectedColumns } = useContext(CustomerContext);

  const [state, setState] = useState({ parentNode: true });
  const [checked, setChecked] = useState({});

  const handleClick = (item) => {
    const newstate = { ...state, [item]: !state[item] };
    setState(newstate);
  };

  const handleChangeCheckbox = (event) => {
    setChecked((prev) => ({
      ...prev,
      [event.target.value]: event.target.checked,
    }));
  };

  const treeTable = useCallback(
    (contentTable, collapseId) => {
      return contentTable[collapseId].children.map((task) => (
        <React.Fragment key={task}>
          <TableRow hover>
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state[collapseId]}
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
                    checked={checked[task]}
                    size="small"
                    onChange={handleChangeCheckbox}
                  />
                </Box>
              </Collapse>
            </TableCell>
            {selectedColumns.map(({ key, format = (value) => value }) => (
              <TableCell style={{ padding: 0 }} key={key}>
                <Collapse
                  key={collapseId}
                  in={state[collapseId]}
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
                in={state[collapseId]}
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
          {treeTable(contentTable, task, task)}
        </React.Fragment>
      ));
    },
    [state, selectedColumns]
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
              {task[parentId].children.length > 0 ? (
                <Box
                  component="div"
                  key={task[parentId]}
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
              {task[parentId].data[key]}
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
      {treeTable(task, parentId)}
    </React.Fragment>
  );
};
