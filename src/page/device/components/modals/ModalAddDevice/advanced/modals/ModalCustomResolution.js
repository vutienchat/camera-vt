import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseButton from "../../../../BaseButton";

const ModalCustomResolution = ({ open, handleClose, type, handleSubmit }) => {
  const classes = modalAddStyle();
  const [data, setData] = useState({
    width: 0,
    height: 0,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth={"sm"}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ padding: "24px 16px 16px 24px" }}
      >
        <Box className={classes.frame}>
          <Box className={classes.textWrapper}>
            {type || "New"} Customize Resolution
          </Box>
          <CloseIcon
            style={{ color: "#222222", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
      </DialogTitle>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Width</Typography>
          <TextField
            variant="outlined"
            size="small"
            onChange={(e) => setData()}
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Width</Typography>
          <TextField variant="outlined" size="small" />
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0 20px 0",
            gap: "30px",
          }}
        >
          <BaseButton
            label={"Save"}
            type={!data && !data.length ? "disable" : "redBackground"}
            onClick={() => handleSubmit(data)}
          />
          <BaseButton label={"Cancel"} type={"normal"} onClick={handleClose} />
        </Box>
      </Box>
    </Dialog>
  );
};

const modalAddStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflow: "hidden scroll",
    },
  },
  frame: {
    alignItems: "center",
    display: "flex",
    gap: "20px",
    height: "45px",
    justifyContent: "center",
    position: "relative",
  },
  textWrapper: {
    color: "#222222",
    flex: "1",
    height: "45px",
    lineHeight: "45px",
    position: "relative",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ModalCustomResolution;
