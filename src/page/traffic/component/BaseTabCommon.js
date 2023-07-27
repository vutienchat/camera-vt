import { Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const BaseTabCommon = ({
  width,
  list,
  selectedTab,
  handleChangeSelectedTab,
  badge,
}) => {
  const classes = useTabCommonStyle();

  return (
    <Box
      className={classes.root}
      style={{
        width: width || "fit-content",
        borderTop: "1px solid rgba(221, 61, 75, 1)",
        borderLeft: "1px solid rgba(221, 61, 75, 1)",
      }}
    >
      {list.map(({ label, value }, index) => (
        <Box
          key={value}
          className={classes.statusBox}
          style={{
            backgroundColor:
              selectedTab === value ? "rgba(221, 61, 75, 1)" : "#fff",
            width: width ? `${100 / list.length}%` : "auto",
          }}
          onClick={() => {
            if (selectedTab !== value) {
              handleChangeSelectedTab(value);
            }
          }}
        >
          {index !== 0 && selectedTab === value && (
            <Box
              className={classes.statusBoxAfter}
              style={{
                backgroundColor: "rgba(221, 61, 75, 1)",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fff",
                  borderTopRightRadius: "12px",
                }}
              ></Box>
            </Box>
          )}
          <Typography
            className={classes.textStatusBox}
            style={{
              color: selectedTab === value ? "#fff" : "#000",
            }}
          >
            {label}
          </Typography>
          {badge && (
            <Box className={classes.badge}>
              <Typography>120</Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

const useTabCommonStyle = makeStyles({
  root: {
    display: "flex",
    width: "fit-content",
    borderTopRightRadius: "12px",
    borderRight: "none",
  },
  statusBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "5px 15px",
    borderTopRightRadius: "12px",
    borderRight: "1px solid rgba(221, 61, 75, 1)",
    cursor: "pointer",
    position: "relative",
    zIndex: 2,
  },
  statusBoxAfter: {
    position: "absolute",
    width: "13px",
    height: "13px",
    top: 0,
    left: "-14px",
    borderRight: "1px solid transparent",
    zIndex: 1,
  },
  textStatusBox: {
    color: "#000",
  },
  badge: {
    padding: "2px 4px",
    borderRadius: "20px",
    backgroundColor: "rgba(237, 237, 252, 1)",
    "& p": {
      fontSize: "12px",
    },
  },
});

export default BaseTabCommon;
