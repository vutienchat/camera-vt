import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const ModalRenameTask = ({
  open,
  handleClose,
  setTaskIndex,
  taskIndex,
  handleRename,
  type,
  isDisabled,
  messageErr,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
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
          <Typography style={{ fontWeight: 800 }}>
            {type === "task" ? " Rename Task View" : "Rename"}
          </Typography>
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
            {type === "task" ? " Task View Name" : " Task View Group Name"}
          </DialogContentText>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            error={isDisabled}
            value={taskIndex.label || ""}
            onChange={(e) => {
              if (e.target.value !== " ")
                setTaskIndex({
                  ...taskIndex,
                  label: e.target.value.substring(0, 32),
                });
            }}
          />
          {messageErr && isDisabled && (
            <Typography style={{ color: "red" }}>{messageErr}</Typography>
          )}
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
              handleRename(taskIndex.id || "");
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

export default React.memo(ModalRenameTask);
