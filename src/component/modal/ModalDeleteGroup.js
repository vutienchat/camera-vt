import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const ModalDeleteGroup = ({ groupDetail, handleClose, isOpen }) => {
  const classes = useStyles();

  const handleDeleteGroup = () => {
    alert(`Delete group ${groupDetail.data.id}`);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 480 }}>
        <Box className={classes.dialogHeader}>
          <Typography>Delete Group</Typography>
        </Box>
        <DialogContent>
          <DialogContentText
            style={{
              marginTop: "14px",
              color: "#333",
              fontSize: "16px",
              fontWeight: "bold",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "normal",
              textAlign: "center",
            }}
          >
            Are you sure you want to DELETE selected group?
          </DialogContentText>
        </DialogContent>
        <Box className={classes.actionButtons}>
          <Button
            onClick={handleClose}
            style={{
              background: "#fff",
              color: "#000",
              border: "solid 1.5px #000",
            }}
          >
            <Typography>Cancel</Typography>
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              handleDeleteGroup();
            }}
            style={{
              background: "#dd3d4b",
              color: "#fff",
            }}
          >
            <Typography>Delete</Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

const useStyles = makeStyles({
  dialogHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginInline: "24px",
    padding: "20px 0 10px 0",
    "& p": {
      textTransform: "capitalize",
      fontSize: "21px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#000",
    },
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    padding: "20px 0 40px 0",
    "& button": {
      width: "150px",
      height: "48px",
    },
    "& p": {
      textTransform: "capitalize",
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
    },
  },
});

export default React.memo(ModalDeleteGroup);
