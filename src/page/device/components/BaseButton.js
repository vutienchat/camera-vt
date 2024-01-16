import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const BaseButton = ({ label, type, component, onClick }) => {
  const classes = useStyles();
  let styleButton;
  if (type === "redBackground") {
    styleButton = classes.redBackground;
  } else if (type === "normal") {
    styleButton = classes.border;
  }
  return (
    <Button
      style={{
        width: 125,
        height: 40,
        borderRadius: 4,
        textTransform: "none",
        fontWeight: 700,
        boxShadow: "none",
      }}
      className={styleButton}
      variant="contained"
      startIcon={component}
      onClick={onClick}
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
}));
export default BaseButton;
