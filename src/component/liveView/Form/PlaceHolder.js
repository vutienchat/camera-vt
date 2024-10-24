import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  placeholder: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    opacity: 0.75,
    textOverflow: "ellipsis",
    userSelect: "none",
    pointerEvents: "none",
  },
});

const PlaceHolder = ({ classes, children }) => {
  return <span className={classes.placeholder}>{children}</span>;
};

export default withStyles(styles)(PlaceHolder);
