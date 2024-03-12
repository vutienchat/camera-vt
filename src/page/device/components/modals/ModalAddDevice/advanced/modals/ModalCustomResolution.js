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

const ModalCustomResolution = ({
  open,
  handleClose,
  type,
  handleSubmit,
  dataSelect,
  isCustom,
}) => {
  const classes = modalAddStyle();
  const [data, setData] = useState({
    width: "",
    height: "",
  });

  useEffect(() => {
    if (dataSelect && dataSelect.length && isCustom) {
      const convertData = dataSelect[0].split("x");
      if (!convertData.length) return;
      setData({
        width: convertData[0],
        height: convertData[1],
      });
    }
  }, [dataSelect]);

  const handleChange = (type, value) => {
    if (
      isNaN(Number(value)) ||
      (Number(value) && (Number(value) < 1 || Number(value) > 1000000))
    )
      return;
    setData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
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
          <Box className={classes.textWrapper}>
            {type || "New"} Customize Resolution
          </Box>
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
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Typography>
            Width <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            onChange={(e) => handleChange("width", e.target.value)}
            style={{ width: 350 }}
            value={data.width}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Typography>
            Height <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            onChange={(e) => handleChange("height", e.target.value)}
            style={{ width: 350 }}
            value={data.height}
          />
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
            type={!data.height || !data.width ? "disable" : "redBackground"}
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
