import {
  Box,
  Button,
  Checkbox,
  Collapse,
  TableCell,
  TableRow,
} from "@material-ui/core";
import {
  DeleteOutline,
  EditAttributesOutlined,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import React, { useState } from "react";

const headers = [
  { key: "id" },
  { key: "type" },
  { key: "customer_name" },
  { key: "address" },
  { key: "phone" },
  { key: "email" },
  { key: "access_key" },
  { key: "secret_key" },
  { key: "created_date" },
  { key: "last_modified" },
];

export const CustomerItemContent = ({ task }) => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState({ parentTasks: true });

  const handleClick = (item) => {
    const newstate = { ...state, [item]: !state[item] };
    setState(newstate);
  };

  const onChangeCheckbox = (event) => {
    console.log(event.target.value);
  };

  const treeTable = (contentTable, collapseId) => {
    return contentTable.children.map((task) => (
      <React.Fragment>
        <TableRow hover key={task.id}>
          <TableCell style={{ padding: 0 }}>
            <Collapse
              key={collapseId}
              in={state[collapseId]}
              timeout="auto"
              unmountOnExit
            >
              <Box display="flex" alignItems="center" gridGap="5px">
                {task.children.length > 0 ? (
                  <Button key={task.id} onClick={() => handleClick(task.id)}>
                    {state[task.id] ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                ) : null}
                <Checkbox
                  value={task.id}
                  onChange={(event) => onChangeCheckbox({ ...event, count })}
                />
              </Box>
            </Collapse>
          </TableCell>
          {headers.map(({ key, format = (value) => value }) => (
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state[collapseId]}
                timeout="auto"
                unmountOnExit
              >
                {format(task[key])}
              </Collapse>
            </TableCell>
          ))}
          <TableCell>
            <Collapse
              key={collapseId}
              in={state[collapseId]}
              timeout="auto"
              unmountOnExit
            >
              <Box display="flex" alignItems="center" gridGap="5px">
                <EditAttributesOutlined />
                <DeleteOutline />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        {treeTable(task, task.id)}
      </React.Fragment>
    ));
  };

  return <React.Fragment>{treeTable(task, "parentTasks")}</React.Fragment>;
};
