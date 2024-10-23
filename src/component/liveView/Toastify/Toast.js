import React, { useRef, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const Toast = ({ onCloseToast, data }) => {
  const toastRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const handleCloseToast = () => {
    toastRef.current.classList.remove("toastify-slideIn");
    toastRef.current.classList.add("toastify-out-right");
    setClosing(true);
  };

  return (
    <Paper
      className="toastifyToast toastify-toast-item toastify-slideIn"
      ref={toastRef}
      onAnimationEnd={() => {
        if (closing) onCloseToast(data);
      }}
    >
      {data}
      <Box onClick={handleCloseToast}>
        <CloseIcon />
      </Box>
      <Box
        className="toastify-progress-bar"
        onAnimationEnd={handleCloseToast}
      ></Box>
    </Paper>
  );
};

export default Toast;
