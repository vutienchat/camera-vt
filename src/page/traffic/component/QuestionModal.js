import {
  Box,
  Dialog,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import BaseButton from "./BaseButton";
import CloseModalIcon from "../../masterMap/Icons/CloseModalIcon";

const QuestionModal = ({
  title,
  isOpen,
  children,
  handleConfirm,
  handleClose,
  confirmText = "Xác nhận",
  styleFooterCustom = {},
  disableConfirm,
}) => {
  const classes = useQuestionModalStyle();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xl"
      className={classes.root}
    >
      <Box className={classes.content}>
        <Box className={classes.header}>
          <Typography>{title}</Typography>
          <IconButton onClick={handleClose} className={classes.icon}>
            <CloseModalIcon width={16} height={16} color="#000" />
          </IconButton>
        </Box>
        <Box style={{ padding: "24px 0px" }}>{children}</Box>
        <Box className={classes.footer} style={{ ...styleFooterCustom }}>
          <BaseButton
            typeStyle="border"
            content="Hủy Bỏ"
            onClick={handleClose}
          />
          <BaseButton
            typeStyle="contained"
            onClick={handleConfirm}
            content={confirmText}
            disabled={disableConfirm}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

const useQuestionModalStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": { overflowY: "unset" },
    "& .MuiPaper-rounded": { borderRadius: "12px" },
  },
  content: { padding: "24px", minWidth: "480px" },
  header: {
    position: "relative",
    width: "100%",
    "& p": { textAlign: "center", fontSize: "21px" },
  },
  icon: { position: "absolute", top: -5, right: 0 },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    "& p": { textTransform: "none" },
  },
});

export default QuestionModal;
