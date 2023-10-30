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
import CloseIcon from "@material-ui/icons/Close";
import React, { useMemo } from "react";
const useStyles = makeStyles({
  modal: {
    "& .MuiPaper-rounded": {
      borderRadius: 12,
      maxWidth: 700,
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
  setIsErrors,
  shareUserName,
  setShareUserName,
}) => {
  const classes = useStyles();
  const errorMessage = useMemo(() => {
    if (messageErr.renameEmpty) return "Layout name is required";
    if (messageErr.renameExist) return "Layout name already exists";
    if (messageErr.shareUsernameEmpty) return "Username is required";
  }, [messageErr]);
  return (
    <Dialog
      disableEscapeKeyDown={false}
      open={open}
      className={classes.modal}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 500 }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 20px 0",
          }}
        >
          <Typography
            style={{
              fontWeight: 800,
              textAlign: "center",
              fontSize: "21px",
              flex: 1,
            }}
          >
            {title}
          </Typography>
          <CloseIcon onClick={handleClose} style={{ width: 30}} />
        </Box>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DialogContentText
            style={{
              marginRight: "20px",
              fontSize: "16px",
              color: "#333",
              fontWeight: " 600",
              marginBottom: 22,
            }}
          >
            <span>{field}</span>
            <span style={{ color: "red", marginLeft: 2 }}>*</span>
          </DialogContentText>
          <Box>
            <TextField
              style={{ width: 300 }}
              fullWidth
              variant="outlined"
              size="small"
              error={isDisabled}
              value={
                nameButton === "RENAME"
                  ? layoutActive.label || ""
                  : shareUserName || ""
              }
              onChange={(e) => {
                const inputValue = e.target.value;
                const isRename = nameButton === "RENAME";
                const newErrors = {
                  ...errorMessage,
                  renameEmpty: isRename && inputValue === "",
                  shareUsernameEmpty: !isRename && inputValue === "",
                };
                setIsErrors(newErrors);
                if (isRename) {
                  setLayoutActive({
                    ...layoutActive,
                    label: e.target.value.substring(0, 32),
                  });
                } else {
                  setShareUserName(e.target.value.substring(0, 32));
                }
              }}
            />
            {errorMessage ? (
              <Typography style={{ color: "red" }}>{errorMessage}</Typography>
            ) : (
              <Typography style={{ height: 24 }}></Typography>
            )}
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "30px 30px 33px 30px",
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
              const prop =
                nameButton === "RENAME" ? layoutActive.id : shareUserName;
              handleChangeText(prop);
            }}
            disabled={
              nameButton === "RENAME"
                ? layoutActive.label === ""
                : shareUserName === ""
            }
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
