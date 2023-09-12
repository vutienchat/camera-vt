import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    width: 171,
    height: 136,
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.15)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: 20,
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  des: {
    fontSize: 12,
    paddingBlock: 8,
  },
  fillColor: {
    width: "12px",
    height: 12,
    borderRadius: "50%",
    marginRight: 8,
  },
  value: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,

    "& p": {
      fontSize: 12,
    },
  },
});
const TooltipCustom = ({ label, des, active, payload }) => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.des}>{des}</Typography>
      <Box className={classes.content}>
        {(payload || []).reverse().map((item) => (
          <Box
            style={{ display: "flex", msFlexDirection: "column" }}
            key={item.dataKey}
          >
            <Box className={classes.value}>
              <Box
                className={classes.fillColor}
                style={{ background: item.fill }}
              ></Box>
              <Typography style={{ textTransform: "capitalize" }}>
                {item.dataKey}:{" "}
              </Typography>
              <Typography> {item.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TooltipCustom;
