import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import RenderDataGroup from "../liveView/RenderDataGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles({
  contentSearch: {
    borderRadius: "4px",
    fontSize: 14,
    color: "black",
    padding: "11px 11px 11px 22px",
    cursor: "pointer",
    border: "solid 1.5px #d3d3d3",
    background: "#fff",
    "&:hover": {
      boxShadow: "rgba(0, 0,0, 0.24) 0px 3px 8px",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  root: {
    "& .MuiDialog-paper": {
      overflowY: "unset",
    },
  },
});

const ModalSaveTaskView = ({
  open,
  handleClose,
  setTaskIndex,
  taskIndex,
  handleSaveTask,
  dataGroup,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [isShowPopupSearch, setIsShowPopupSearch] = useState(false);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      className={classes.root}
    >
      <Box style={{ width: 450 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "solid 2px #c9c9c9",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}>Save Task View</Typography>
          <Typography
            style={{ fontWeight: 600, cursor: "pointer" }}
            onClick={handleClose}
          >
            X
          </Typography>
        </Box>
        <DialogContent>
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "#333",
              fontWeight: " 600",
              marginBottom: "10px",
            }}
          >
            Task View Name
          </DialogContentText>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={taskIndex.label || ""}
            onChange={(e) => {
              if (e.target.value !== " ")
                setTaskIndex({ ...taskIndex, label: e.target.value });
            }}
          />
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "#333",
              fontWeight: " 600",
              marginBottom: "10px",
            }}
          >
            Task View Group
          </DialogContentText>
          <ClickAwayListener
            onClickAway={() => {
              setIsShowPopupSearch(false);
            }}
          >
            <Box
              style={{
                width: 400,
              }}
            >
              <Box sx={{ width: 400, position: "relative" }}>
                <Box
                  className={classes.contentSearch}
                  onClick={() => {
                    setIsShowPopupSearch((prev) => !prev);
                  }}
                >
                  <span>View Group</span>
                  <ArrowDropDownIcon />
                </Box>
              </Box>
              {isShowPopupSearch && (
                <RenderDataGroup data={dataGroup} width={370} />
              )}
            </Box>
          </ClickAwayListener>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px 0 10px 0",
          }}
        >
          <Button
            onClick={() => {
              handleSaveTask();
              handleClose();
            }}
            disabled={taskIndex.label === ""}
            style={{
              width: "120px",
              height: "35px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            style={{
              width: "120px",
              height: "35px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalSaveTaskView);
