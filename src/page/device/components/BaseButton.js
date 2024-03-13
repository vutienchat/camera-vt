import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const BaseButton = ({
  label,
  type,
  component,
  onClick,
  width,
  submitType,
  noRecoding,
}) => {
  const classes = useStyles();
  let styleButton;
  if (type === "redBackground") {
    styleButton = classes.redBackground;
  } else if (type === "normal") {
    styleButton = classes.border;
  } else if (type === "disable") {
    styleButton = classes.disable;
  } else if (type === "headerButton") {
    styleButton = classes.headerButton;
  } else if (type === "colorBorder") {
    styleButton = classes.colorBorder;
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
        backgroundColor: noRecoding && "#D3D3D3",
      }}
      className={styleButton}
      disabled={type === "disable"}
      variant="contained"
      startIcon={component}
      onClick={onClick}
      type={submitType}
    >
      <span style={{ color: noRecoding && "#939393" }}>{label}</span>
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
  headerButton: {
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
  colorBorder: {
    backgroundColor: "#FFD8DC",
    color: " rgba(221, 61, 75, 1)",
    border: "none",
  },
}));
export default BaseButton;
