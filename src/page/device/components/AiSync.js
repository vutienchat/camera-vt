import { makeStyles } from "@material-ui/styles";
import React from "react";
import SuccesSyncIcon from "../Icon/SuccesSyncIcon";
import FailSyncIcon from "../Icon/FailSyncIcon";

const AiSync = ({ data }) => {
  const classes = style();
  return (
    <div className={classes.root}>
      {data.zones ? (
        <React.Fragment>
          <div className={classes.chip}>
            <div style={{ padding: "1px 8px", fontSize: 12 }}>
              Zones {data.zones} | Line {data.line}
            </div>
            <div style={{ padding: "3px 5px 0 0" }}>
              {data.sync ? <SuccesSyncIcon /> : <FailSyncIcon />}
            </div>
          </div>
          <div className={classes.chip}>
            <p style={{ padding: "1px 8px", fontSize: 12 }}>Streaming Out</p>
            <div style={{ padding: "3px 5px 0 0" }}>
              {data.sync ? <SuccesSyncIcon /> : <FailSyncIcon />}
            </div>
          </div>
        </React.Fragment>
      ) : null}
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
export default AiSync;
