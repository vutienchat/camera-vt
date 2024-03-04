import {
  Box,
  ClickAwayListener,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  AcceptIcon,
  CancelIcon,
  EditIcon,
  SaveIcon,
} from "../../../../../Icon";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cell: {
    color: "#6B7280",
    paddingBlock: 10,
  },
  textFieldEdit: {
    "& .MuiOutlinedInput-root": {
      height: 22,
    },
    "& input": {
      height: 22,
    },
    width: 90,
  },
});

const PresetTourTable = React.memo(({ data }) => {
  const classes = useStyles();
  const [listData, setListData] = useState([...data]);

  return (
    <TableContainer style={{ maxHeight: 400, overflowX: "hidden" }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} align="left">
              #
            </TableCell>
            <TableCell className={classes.cell} align="left">
              Name
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <AddIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setListData((prev) => [
                    ...prev,
                    { name: `test ${listData.length + 1}`, isNew: true },
                  ]);
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{
            maxHeight: 300,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {listData.map((row, index) => (
            <DataBodyTable row={row} key={index} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const DataBodyTable = ({ row, index }) => {
  const classes = useStyles();
  const listActionPreset = [
    {
      icon: <EditIcon />,
      action: () => {
        setIsEdit(true);
        setListAction([...listActionPresetEdit]);
        inputRef.current.focus();
      },
    },
    {
      icon: <SaveIcon />,
      action: () => {},
    },
    {
      icon: <DeleteOutlineIcon />,
      action: () => {},
    },
  ];

  const listActionPresetEdit = [
    {
      icon: <AcceptIcon />,
      action: () => {},
    },
    {
      icon: <CancelIcon />,
      action: () => {},
    },
  ];

  useEffect(() => {
    if (row.isNew) {
      setIsEdit(true);
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [row]);

  const [isEdit, setIsEdit] = useState(false);
  const [listAction, setListAction] = useState([...listActionPreset]);
  const inputRef = useRef(null);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsEdit(false);
        setListAction([...listActionPreset]);
      }}
    >
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left" style={{ paddingRight: 0 }}>
          <TextField
            size="small"
            fullWidth
            value={row.name}
            variant="outlined"
            className={classes.textFieldEdit}
            disabled={!isEdit}
            inputRef={inputRef}
          />
        </TableCell>
        <TableCell>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {listAction.map((it, idx) => (
              <Box key={idx} onClick={it.action} style={{ cursor: "pointer" }}>
                {it.icon}
              </Box>
            ))}
          </Box>
        </TableCell>
      </TableRow>
    </ClickAwayListener>
  );
};

export default PresetTourTable;
