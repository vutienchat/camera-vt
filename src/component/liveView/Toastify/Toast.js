import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import React, { useRef, useState } from "react";

const useStyles = makeStyles(() => ({
  toastifyToast: {
    position: "relative",
    minHeight: 64,
    marginBottom: 15,
    borderRadius: 4,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#D65745",
    padding: 15,
    color: "#ffffff",
    boxSizing: "border-box",
    borderRadius: 12,
    // border: "1px solid #F3CDC8",
  },

  toastifyProgressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "5px",
    zIndex: 9999,
    transformOrigin: "left",
    animation: "Toastify__trackProgress__trackProgress linear 5s forwards",
    background: "#F3CDC8",
  },
}));

const Toast = ({ onCloseToast, data }) => {
  const classes = useStyles();
  const toastRef = useRef(null);
  const [closing, setClosing] = useState(false);

  return (
    <Paper
      className={`${classes.toastifyToast} toastify-toast-item toastify-slideIn`}
      ref={toastRef}
      onAnimationEnd={() => {
        if (closing) onCloseToast(data);
      }}
    >
      {data}
      <Box
        onClick={() => {
          onCloseToast(data);
        }}
      >
        <CloseIcon />
      </Box>
      <Box
        className={`${classes.toastifyProgressBar} toastify-progress-bar`}
        onAnimationEnd={(e) => {
          toastRef.current.classList.remove("toastify-slideIn");
          //   toastRef.current.classList.add("toastify-out-right");
          //   setClosing(true);
        }}
      ></Box>
    </Paper>
  );
};

export default Toast;
