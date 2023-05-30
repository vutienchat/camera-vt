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

export const CustomerItemContent = ({ task }) => {
  const { selectedColumns } = useContext(CustomerContext);

  const [state, setState] = useState({});
  const [checked, setChecked] = useState([]);

  const handleClick = (item) => {
    const newstate = { ...state, [item]: !state[item] };
    setState(newstate);
  };

  const handleChangeCheckbox = (event) => {
    const cloneChecked = [...checked];

    if (event.target.checked) {
      setChecked((prev) => [...prev, [event.target.value]]);
    } else {
      setChecked(cloneChecked.filter((prev) => prev !== event.target.value));
    }
  };

  const treeTable = useCallback(
    (contentTable, collapseId) => {
      return contentTable.children.map((task) => (
        <React.Fragment>
          <TableRow hover key={task.id}>
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state["childTasks"] && state[collapseId]}
                timeout="auto"
                unmountOnExit
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gridGap="5px"
                >
                  {task.children.length > 0 ? (
                    <Box
                      component="div"
                      key={task.id}
                      onClick={() => handleClick(task.id)}
                      style={{ paddingTop: "3px", cursor: "pointer" }}
                    >
                      {state[task.id] ? <DropdownIcon /> : <ExpandMoreIcon />}
                    </Box>
                  ) : null}
                  <Checkbox
                    value={task.id}
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
                  in={state["childTasks"] && state[collapseId]}
                  timeout="auto"
                  unmountOnExit
                >
                  {format(task[key])}
                </Collapse>
              </TableCell>
            ))}
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state["childTasks"] && state[collapseId]}
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
          {treeTable(task, task.id)}
        </React.Fragment>
      ));
    },
    [state, selectedColumns]
  );

  return (
    <React.Fragment>
      <TableRow hover key={task.id}>
        <TableCell>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gridGap="5px"
          >
            {task.children.length > 0 ? (
              <Box
                component="div"
                key={task.id}
                onClick={() => handleClick("childTasks")}
                style={{ paddingTop: "3px", cursor: "pointer" }}
              >
                {state["childTasks"] ? <DropdownIcon /> : <ExpandMoreIcon />}
              </Box>
            ) : null}
            <Checkbox
              value={task.id}
              size="small"
              onChange={handleChangeCheckbox}
            />
          </Box>
        </TableCell>
        {selectedColumns.map(({ key, format = (value) => value }) => (
          <TableCell style={{ padding: 0 }}>{format(task[key])}</TableCell>
        ))}
        <TableCell>
          <Box display="flex" alignItems="center" gridGap="10px">
            <InfoDetailIcon />
            <EditIcon />
            <DeleteIcon color="#000" />
          </Box>
        </TableCell>
      </TableRow>
      {treeTable(task, "childTasks")}
    </React.Fragment>
  );
};
