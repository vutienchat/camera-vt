import { makeStyles } from "@material-ui/styles";
import React from "react";

const FeatureAi = ({ arrayOfValue }) => {
  const classes = style();
  return (
    <div className={classes.root}>
      {arrayOfValue.map((item) => {
        return (
          <div key={item.value} className={classes.chip}>
            <p style={{ padding: "1px 8px", fontSize: 12 }}>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};

const style = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    maxHeight: 60,
    overflow: "auto",
    "&::-webkit-scrollbar": {
      height: "5px",
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 6,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "white",
    },
  },
  chip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 67,
    height: 22,
    borderRadius: 2,
    border: "1px solid #e6e6ec",
    backgroundColor: "white",
  },
}));
export default FeatureAi;
