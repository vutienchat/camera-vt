import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  switchContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    height: 28,
    padding: 2,
  },
  text: {
    fontSize: 14,
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    height: "100%",
    color: "#ffffff",
  },
}));

const CustomSwitch = () => {
  const classes = useStyles();
  const [isAll, setIsAll] = useState(true);

  return (
    <div className={classes.switchContainer}>
      <Typography
        className={`${classes.text} ${isAll ? classes.checked : ""}`}
        onClick={() => {
          setIsAll(true);
        }}
      >
        All
      </Typography>
      <Typography
        className={`${classes.text} ${!isAll ? classes.checked : ""}`}
        onClick={() => {
          setIsAll(false);
        }}
      >
        Unread
      </Typography>
    </div>
  );
};

export default CustomSwitch;
