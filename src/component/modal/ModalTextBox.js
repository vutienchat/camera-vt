import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useMemo } from "react";
const useStyles = makeStyles({
  modal: {
    "& .MuiPaper-rounded": {
      width: 500,
      height: 245,
      borderRadius: 12,
    },
  },
});

const ModalTextBox = ({
  open,
  handleClose,
  setLayoutActive,
  layoutActive,
  handleChangeText,
  title,
  isDisabled,
  messageErr,
  field,
  nameButton,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      className={classes.modal}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 500 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 20px 0",
          }}
        >
          <Typography
            style={{ fontWeight: 800, textAlign: "center", fontSize: "21px" }}
          >
            {title}
          </Typography>
        </Box>
        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <DialogContentText
            style={{
              marginRight: "20px",
              fontSize: "16px",
              color: "#333",
              fontWeight: " 600",
              marginBottom: 0,
            }}
          >
            {field}
          </DialogContentText>
          <TextField
            style={{ width: 300 }}
            fullWidth
            variant="outlined"
            size="small"
            error={isDisabled}
            value={nameButton === "RENAME" ? layoutActive.label : ""}
            onChange={(e) => {
              if (e.target.value !== " " && nameButton === "RENAME")
                setLayoutActive({
                  ...layoutActive,
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
            justifyContent: "center",
            padding: "42px 0 10px 0",
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
              handleChangeText(layoutActive.id || "");
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
            {nameButton}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalTextBox);
