import {
  Box,
  ClickAwayListener,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import {
  AcceptIcon,
  CancelIcon,
  EditIcon,
  PlayIcon,
  ReplayIcon,
  SaveIcon,
  SettingIcon,
} from "../../../../../Icon";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useFormContext } from "react-hook-form";

const DataBodyTable = React.memo(
  ({ row, index, setListData, type, listData }) => {
    const classes = useStyles();
    const cellClass = cellStyle();
    const [dataIndex, setDataIndex] = useState({ ...row });
    const { setValue } = useFormContext();
    const listActionPreset = [
      {
        icon: <EditIcon />,
        action: () => {
          setIsEdit(true);
          setListAction([...listActionPresetEdit]);
          setTimeout(() => {
            inputRef.current.focus();
          }, 100);
        },
      },
      {
        icon: <SaveIcon />,
        action: (dataIndex) => {
          handleEdit(index, dataIndex);
        },
      },
      {
        icon: <DeleteOutlineIcon />,
        action: () => {
          handleDelete(index);
        },
      },
    ];

    const listActionPresetEdit = [
      {
        icon: <AcceptIcon />,
        action: (dataIndex) => {
          handleEdit(index, dataIndex);
        },
      },
      {
        icon: <CancelIcon />,
        action: (dataIndex, row) => {
          handleReset(row);
        },
      },
    ];

    const listActionTour = [
      {
        icon: <PlayIcon />,
        action: (dataIndex) => {},
      },
      {
        icon: <ReplayIcon />,
        action: (dataIndex, row) => {},
      },
      {
        icon: (
          <SettingIcon width={16} height={16} color={"rgba(68, 73, 77, 1)"} />
        ),
        action: (dataIndex) => {},
      },
      {
        icon: <DeleteOutlineIcon />,
        action: (dataIndex, row) => {
          handleDelete(index);
        },
      },
    ];

    const handleDelete = (index) => {
      console.log(index, 123);
      const tempData = [...listData];
      tempData.splice(index, 1);
      console.log("tempData", tempData);
      setListData(tempData);
      handleUpdateDataForm(type, tempData);
      console.log("row", row);
      handleReset(row);
    };

    const handleEdit = (index, dataIndex) => {
      setListData((prev) => {
        const tempData = [...prev];
        tempData.splice(index, 1, { ...dataIndex, isNew: false });
        handleUpdateDataForm(type, tempData);
        return tempData;
      });
      handleReset(dataIndex);
    };

    const handleReset = (data) => {
      setIsEdit(false);
      setDataIndex({ ...data, isNew: false });
      if (type === "tour") {
        setListAction([...listActionTour]);
      } else {
        setListAction([...listActionPreset]);
      }
    };

    const handleUpdateDataForm = (type, data) => {
      setValue(type || "preset", data);
    };

    useEffect(() => {
      if (dataIndex.isNew) {
        setIsEdit(true);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
        const newAction = [...listActionPreset];
        newAction.shift();
        setListAction(newAction);
      }
    }, [dataIndex]);

    useEffect(() => {
      if (type === "tour") {
        setListAction(listActionTour);
      } else {
        setListAction(listActionPreset);
      }
    }, [type]);

    const [isEdit, setIsEdit] = useState(false);
    const [listAction, setListAction] = useState([]);
    const inputRef = useRef(null);

    return (
      <ClickAwayListener
        key={index}
        onClickAway={() => {
          handleReset(row);
          if (dataIndex.isNew) {
            setListData((prev) => [...prev].filter((it) => !it.isNew));
          }
        }}
      >
        <TableRow
          className={cellClass.root}
          style={{
            background: isEdit || row.isNew ? "rgba(221, 61, 75, 0.15)" : "",
          }}
        >
          <TableCell component="th" scope="row" style={{ paddingRight: 0 }}>
            {index + 1}
          </TableCell>
          <TableCell align="left" style={{ paddingRight: 0 }}>
            <Tooltip
              title={<TooltipDetail />}
              disableHoverListener={type === "tour"}
              classes={{ tooltip: classes.tooltip }}
            >
              <TextField
                size="small"
                fullWidth
                value={dataIndex.name}
                variant="outlined"
                className={classes.textFieldEdit}
                disabled={!isEdit}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    if (dataIndex.isNew) {
                      handleDelete(index, e);
                    } else {
                      setDataIndex({ ...row });
                      setIsEdit(false);
                      setListAction(listActionPreset);
                    }
                  }
                }}
                inputRef={inputRef}
                onChange={(e) => {
                  setDataIndex((prev) => ({
                    ...prev,
                    name: e.target.value.slice(0, 50),
                  }));
                }}
              />
            </Tooltip>
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
                <Box
                  key={idx}
                  onClick={() => it.action(dataIndex, row)}
                  style={{ cursor: "pointer" }}
                >
                  {it.icon}
                </Box>
              ))}
            </Box>
          </TableCell>
        </TableRow>
      </ClickAwayListener>
    );
  }
);

const TooltipDetail = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box display={"flex"} style={{ gap: 15 }}>
        <Typography>Pan:</Typography>
        <Typography>180º</Typography>
      </Box>
      <Box display={"flex"} style={{ gap: 15 }}>
        <Typography>Tilt:</Typography>
        <Typography>180º</Typography>
      </Box>
      <Box display={"flex"} style={{ gap: 15 }}>
        <Typography>Zoom:</Typography>
        <Typography>180º</Typography>
      </Box>
    </Box>
  );
};

const cellStyle = makeStyles({
  root: {
    "&:hover": {
      background: "rgba(221, 61, 75, 0.15)",
    },
  },
});

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
  tooltip: {
    background: "#fff",
    color: "rgba(34, 34, 34, 1)",
    border: "solid 1px #333",
    borderRadius: "1px",
  },
});

export default DataBodyTable;
