import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseButton from "../BaseButton";

const ModalConfirmSelectDevice = ({ open, handleClose, handleSubmit }) => {
  const classes = modalAddStyle();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth={"sm"}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ padding: "24px 16px 0px 24px" }}
      >
        <Box className={classes.frame}>
          <Box className={classes.textWrapper}>Are you sure?</Box>
          <CloseIcon
            style={{ color: "#222222", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
      </DialogTitle>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 24,
          gap: 20,
        }}
      >
        <Typography>
          This action cannot be undone. Your draft will be discarded
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0 20px 0",
            gap: "30px",
          }}
        >
          <BaseButton label={"Keep"} type={"normal"} onClick={handleClose} />
          <BaseButton
            label={"Discard"}
            type={
              // !data.height || !data.width ? "disable" :

              "redBackground"
            }
            onClick={handleSubmit}
          />
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
export default ModalConfirmSelectDevice;
