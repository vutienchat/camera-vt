import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const BaseButton = ({ label, type, component, onClick, width, submitType, colorBorder }) => {
  const classes = useStyles();
  let styleButton;
  if (type === "redBackground") {
    styleButton = classes.redBackground;
  } else if (type === "normal") {
    styleButton = classes.border;
  } else if (type === "disable") {
    styleButton = classes.disable;
  }else if(type === "headerButton"){
    styleButton = classes.headerButton;
  }
  return (
    <Button
      style={{
        width: width ? width : 125,
        height: 40,
        borderRadius: 4,
        textTransform: label !== "Import" && "none",
        fontWeight: 700,
        boxShadow: "none",
        backgroundColor: colorBorder && "#FFD8DC",
        color: colorBorder && " rgba(221, 61, 75, 1)",
        border: colorBorder && "none"
      }}
      className={styleButton}
      disabled={type === "disable"}
      variant="contained"
      startIcon={component}
      onClick={onClick}
      type={submitType}
    >
      {label}
    </Button>
  );
};

const useStyles = makeStyles(() => ({
  redBackground: {
    backgroundColor: "rgba(221, 61, 75, 1)",
    border: "none",
    "& span": { color: "#ffffff" },
    "&:hover": {
      backgroundColor: "#aa0e1b",
      "& span": { color: "#ffffff" },
    },
  },
  border: {
    backgroundColor: "#ffffff",
    border: "1px solid",
    "&:hover": {
      backgroundColor: "rgb(243,244,246)",
    },
  },
  headerButton:{
    backgroundColor: "#ffffff",
    border: "1px solid rgba(34, 34, 34, 0.1)",
    "&:hover": {
      backgroundColor: "rgb(243,244,246)",
    },
  },
  disable: {
    border: "none",
    "& span": { color: "#ffffff" },
    "&:hover": {
      backgroundColor: "#aa0e1b",
      "& span": { color: "#ffffff" },
    },
    "&.MuiButton-contained.Mui-disabled": {
      backgroundColor: "rgb(0 0 0 / 43%)",
    },
  },
}));
export default BaseButton;
