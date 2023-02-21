import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Checkbox } from "@material-ui/core";

const ModalCloseTask = ({
  open,
  handleClose,
  handleCloseTask,
  taskIndex,
  skipClose,
  setSkipClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 400 }}>
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
          <Typography style={{ fontWeight: 800 }}>Rename Task View</Typography>
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
              textAlign: "center",
            }}
          >
            Are you sure you want to close current Task view
          </DialogContentText>

          <Box style={{ display: "flex" }}>
            <Checkbox
              checked={skipClose}
              onChange={() => {
                setSkipClose((prev) => !prev);
              }}
            />
            <DialogContentText
              style={{
                marginTop: "14px",
                fontSize: "14px",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              Don't show this message again
            </DialogContentText>
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px 0 10px 0",
          }}
        >
          <Button
            autoFocus
            onClick={() => {
              handleCloseTask(taskIndex.id);
            }}
            style={{
              width: "120px",
              height: "35px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            OK
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

export default React.memo(ModalCloseTask);
