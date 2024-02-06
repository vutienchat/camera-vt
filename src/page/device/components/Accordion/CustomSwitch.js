import React from "react";
import { Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CustomSwitch = withStyles((theme) => ({
  root: {
    // width: 42,
    height: 23,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(33px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "rgba(221, 61, 75, 1)",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 22,
    height: 21,
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: "#bdbdbd",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "50%",
      textAlign: "center",
    },
    "&::before": {
      left: 0,
      fontWeight: 700,
      color: "white",
      fontSize: 11,
      paddingBottom: 1,
      content: '"ON"',
    },
    "&::after": {
      right: 0,
      fontWeight: 700,
      color: "white",
      fontSize: 11,
      paddingBottom: 1,
      content: '"OFF"',
    },
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default CustomSwitch;
