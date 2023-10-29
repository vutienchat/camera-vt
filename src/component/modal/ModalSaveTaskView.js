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
      borderRadius: "12px",
    },
  },
});

const ModalSaveTaskView = ({
  open,
  handleClose,
  setLayoutActive,
  layoutActive,
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
      <Box style={{ width: 500, height: 300 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "30px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800, fontSize: "21px" }}>
            Save Task View
          </Typography>
        </Box>
        <DialogContent>
          <Box
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <DialogContentText
              style={{
                color: "#333",
                fontWeight: " 600",
                marginBottom: "0",
                marginRight: "20px",
                fontSize: "16px",
              }}
            >
              Task View Name
            </DialogContentText>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              style={{ width: 300 }}
              value={layoutActive.label || ""}
              onChange={(e) => {
                if (e.target.value !== " ")
                  setLayoutActive({ ...layoutActive, label: e.target.value });
              }}
            />
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <DialogContentText
              style={{
                color: "#333",
                fontWeight: " 600",
                marginBottom: "0",
                marginRight: "20px",
                fontSize: "16px",
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
                  width: 300,
                }}
              >
                <Box sx={{ width: 300, position: "relative" }}>
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
                  <RenderDataGroup data={dataGroup} width={277} />
                )}
              </Box>
            </ClickAwayListener>
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 26px 0",
          }}
        >
          <Button
            onClick={handleClose}
            style={{
              width: "150px",
              height: "48px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
              borderRadius: "4px",
              marginRight: 16,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSaveTask();
              handleClose();
            }}
            disabled={layoutActive.label === ""}
            style={{
              width: "150px",
              height: "48px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "4px",
              marginLeft: 16,
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalSaveTaskView);
