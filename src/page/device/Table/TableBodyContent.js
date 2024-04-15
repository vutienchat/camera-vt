import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  Popover,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { TableCommonContext } from "./TableContent";
import MenuDotIcon from "../Icon/MenuDotIcon";
import LiveViewIcon from "../Icon/LiveViewIcon";
import PlayBackIcon from "../Icon/PlaybackIcon";
import ConfigIcon from "../Icon/ConfigIcon";
import DeletePopoverIcon from "../Icon/DeletePopoverIcon";
import HistoryIcon from "../Icon/HistoryIcon";
import ResyncIcon from "../Icon/ResyncIcon";

const TableBodyContent = () => {
  const {
    isLoading,
    tableHeader,
    tableData,
    checkedItems,
    handleCheckData,
    handleClickColumns,
    checkedAble,
    dispatch,
  } = useContext(TableCommonContext);
  const classes = useTableBodyStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedWindow, setOpenedWindow] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const setChooseDevice = (data) => {
    dispatch({
      type: "CHOOSE_DEVICE",
      chooseDevice: data,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setChooseDevice({});
  };
  const handleCheckItem = (event) => {
    const val = JSON.parse(event.target.value);

    if (event.target.checked) {
      handleCheckData([...checkedItems, val]);
    } else {
      handleCheckData([...checkedItems].filter((item) => item.id !== val.id));
    }
  };

  const handleOpenModalDeviceStatus = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalDeviceStatus: true,
      },
    });
  };

  const handleOpenNewTab = (url) => {
    if (openedWindow && !openedWindow.closed) {
      openedWindow.focus();
    } else {
      const newWindow = window.open(url, "_blank");
      setOpenedWindow(newWindow);
    }
  };

  const handleOpenDeleteModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalDelete: true,
      },
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeader.length + 1}>
            <Box
              style={{ display: "flex", justifyContent: "center", padding: 20 }}
            >
              <CircularProgress color="secondary" />
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!tableData || tableData.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeader.length + 1}>
            <Typography
              style={{ textAlign: "center", padding: 20, fontSize: 21 }}
            >
              No Device Found
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {tableData.map((dataBody) => {
        const isChecked = !!checkedItems.find(
          (item) => item.id === dataBody.id
        );
        return (
          <TableRow
            key={dataBody.id}
            style={{ backgroundColor: isChecked ? "#F6F4F5" : "transparent" }}
            className={classes.rowTrafficItem}
          >
            {checkedAble && (
              <TableCell
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "28px",
                }}
              >
                <Checkbox
                  value={JSON.stringify(dataBody)}
                  checked={isChecked}
                  onChange={handleCheckItem}
                  className={`${classes.checkBoxed} ${
                    isChecked && classes.checked
                  }`}
                />
              </TableCell>
            )}
            {tableHeader.map((head) => {
              const { field, component, customStyles, width } = head;
              return (
                <TableCell
                  key={field}
                  style={{
                    ...customStyles,
                    width,
                    cursor: handleClickColumns ? "pointer" : "auto",
                  }}
                  className={classes.tableCellCustom}
                  onClick={() => {
                    if (handleClickColumns) {
                      handleClickColumns(dataBody);
                    }
                  }}
                >
                  {component ? (
                    component(dataBody)
                  ) : (
                    <Tooltip title={dataBody[field] || ""}>
                      <Typography className={classes.text} style={{ width }}>
                        {dataBody[field]}
                      </Typography>
                    </Tooltip>
                  )}
                </TableCell>
              );
            })}
            {checkedAble && (
              <TableCell
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  paddingBottom: 21,
                }}
              >
                <Typography
                  onClick={(e) => {
                    handleClick(e);
                    setChooseDevice(dataBody);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <MenuDotIcon />
                </Typography>
              </TableCell>
            )}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              className={classes.root}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box
                className={classes.poperItem}
                onClick={() => {
                  handleOpenNewTab("/traffic");
                }}
              >
                <LiveViewIcon />
                <Typography className={classes.poperText}>Liveview</Typography>
              </Box>
              <Divider />
              <Box
                className={classes.poperItem}
                onClick={() => {
                  handleOpenNewTab("/traffic");
                }}
              >
                <PlayBackIcon />
                <Typography className={classes.poperText}>Playback</Typography>
              </Box>
              <Divider />
              <Box className={classes.poperItem}>
                <ConfigIcon />
                <Typography className={classes.poperText}>Config</Typography>
              </Box>
              <Divider />
              <Box className={classes.poperItem}>
                <ResyncIcon />
                <Typography className={classes.poperText}>Re-Sync</Typography>
              </Box>
              <Divider />
              <Box
                className={classes.poperItem}
                onClick={() => {
                  handleOpenModalDeviceStatus();
                }}
              >
                <HistoryIcon />
                <Typography className={classes.poperText}>
                  History Connections
                </Typography>
              </Box>
              <Divider />
              <Box
                className={classes.poperItem}
                onClick={() => {
                  handleOpenDeleteModal();
                }}
              >
                <DeletePopoverIcon />
                <Typography className={classes.poperText}>Delete</Typography>
              </Box>
            </Popover>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const useTableBodyStyle = makeStyles({
  root: {
    "& .MuiPaper-elevation8": {
      boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.2)",
      backgroundColor: "white",
      minWidth: 120,
    },
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  rowTrafficItem: {
    height: 81,
    "&:hover": { backgroundColor: "#F6F4F5 !important" },
  },
  tableCellCustom: { padding: "12px 24px" },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "#C9C9C9" },
  },
  checked: {
    "& svg": { color: "#dd3d4b !important" },
  },
  poperItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "5px 10px",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#F6F4F5 !important" },
  },
  poperText: {
    fontSize: 15,
    flex: 1,
  },
});

export default TableBodyContent;
