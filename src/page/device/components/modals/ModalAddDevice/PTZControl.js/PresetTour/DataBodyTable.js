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
import _ from "lodash";

const DataBodyTable = React.memo(
  ({
    row,
    index,
    setListData,
    type,
    listData,
    setDataIndex,
    dataIndex,
    handleSettingTour,
  }) => {
    const classes = useStyles();
    const cellClass = cellStyle();
    const { setValue } = useFormContext();

    const listActionPreset = [
      {
        icon: <EditIcon />,
        action: (row) => {
          setIsEdit(true);
          setListAction([...listActionPresetEdit]);
          setDataIndex({ ...row });
          setTimeout(() => {
            inputRef.current.focus();
          }, 100);
        },
      },
      {
        icon: <SaveIcon />,
        action: (row, dataIndex, listData) => {
          handleEdit(index, dataIndex, listData);
        },
      },
      {
        icon: <DeleteOutlineIcon style={{ fontSize: 19, color: "red" }} />,
        action: (row, dataIndex, listData) => {
          handleDelete(row.id, listData);
        },
      },
    ];

    const listActionPresetEdit = [
      {
        icon: <AcceptIcon />,
        action: (row, dataIndex, listData) => {
          handleEdit(index, dataIndex, listData);
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
        action: (row) => {
          setDataIndex(row);
          handleSettingTour(row);
        },
      },
      {
        icon: <DeleteOutlineIcon style={{ fontSize: 19, color: "red" }} />,
        action: (row, dataIndex, listData) => {
          handleDelete(row.id, listData);
        },
      },
    ];

    const handleEdit = (index, dataIndex, listData) => {
      if (!dataIndex || !listData || index === undefined) return;
      const tempData = _.cloneDeep([...listData]);
      tempData.splice(index, 1, { ...dataIndex, isNew: false });
      setListData(tempData);
      handleUpdateDataForm(type, tempData);
      handleReset();
      setDataIndex(null);
    };

    const handleDelete = (id, listData) => {
      if (!listData) return;
      let tempData = _.cloneDeep([...listData]).filter((it) => it.id !== id);
      setListData(tempData);
      handleUpdateDataForm(type, tempData);
    };

    const handleReset = (data) => {
      setIsEdit(false);
      setDataIndex(null);

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
      if (type === "tour") {
        setListAction(listActionTour);
      } else {
        setListAction(listActionPreset);
      }
    }, [type]);

    useEffect(() => {
      if (dataIndex && dataIndex.isNew && dataIndex.id === row.id) {
        setIsEdit(true);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
        const newAction = [...listActionPreset];
        newAction.shift();
        setListAction(newAction);
      }
    }, [dataIndex, row]);

    const [isEdit, setIsEdit] = useState(false);
    const [listAction, setListAction] = useState([]);
    const inputRef = useRef(null);

    return (
      <ClickAwayListener
        key={index}
        onClickAway={() => {
          if (row && row.isNew) {
            handleReset(row);
            setListData((prev) => [...prev].filter((it) => !it.isNew));
          }
        }}
      >
        <TableRow
          className={cellClass.root}
          style={{
            background:
              isEdit && dataIndex && dataIndex.id === row.id
                ? "rgba(221, 61, 75, 0.15)"
                : "",
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
              disableFocusListener={isEdit}
            >
              <TextField
                size="small"
                fullWidth
                value={
                  isEdit && dataIndex && dataIndex.id === row.id
                    ? dataIndex.name
                    : row.name
                }
                variant="outlined"
                className={classes.textFieldEdit}
                disabled={!isEdit}
                onKeyDown={(e) => {
                  if (!dataIndex) return;
                  if (e.key === "Escape") {
                    if (dataIndex.isNew) {
                      handleDelete(dataIndex.id, listData);
                    } else {
                      // setDataIndex({ ...row });
                      setIsEdit(false);
                      setListAction(listActionPreset);
                    }
                  } else if (e.key === "Enter") {
                    handleEdit(index, dataIndex, listData);
                  }
                }}
                inputRef={inputRef}
                onChange={(e) => {
                  if (!dataIndex || dataIndex.id !== row.id) return;
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
                  onClick={() => it.action(row, dataIndex, listData)}
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
