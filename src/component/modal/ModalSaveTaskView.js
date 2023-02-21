import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const ModalSaveTaskView = ({
  open,
  handleClose,
  setTaskIndex,
  taskIndex,
  handleSaveTask,
}) => {
  const [value, setValue] = useState();

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
            value={taskIndex?.label || ""}
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
          <FormControl fullWidth size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              variant="outlined"
              native
              label={null}
              placeholder="Task View Group"
              aria-placeholder="center"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
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
