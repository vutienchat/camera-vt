import { Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const BaseTabCommon = ({
  width,
  list,
  selectedTab,
  handleChangeSelectedTab,
  badge,
  customeStyle,
}) => {
  const classes = useTabCommonStyle();

  return (
    <Box
      className={classes.root}
      style={{
        width: width || "fit-content",
        ...customeStyle,
      }}
    >
      {list.map(({ label, value }, index) => (
        <Box
          key={value}
          className={classes.statusBox}
          style={{
            borderBottom: selectedTab === value ? "3px solid #dd3d4b" : "",
            width: width ? `${100 / list.length}%` : "auto",
            backgroundColor: selectedTab === value ? "#ebebeb" : "#fff",
            borderTopLeftRadius: customeStyle && index === 0 ? "8px" : "0px",
            borderTopRightRadius:
              customeStyle && index === list.length - 1 ? "8px" : "0px",
          }}
          onClick={() => {
            if (selectedTab !== value) {
              handleChangeSelectedTab(value);
            }
          }}
        >
          <Typography
            className={classes.textStatusBox}
            style={{
              fontWeight: selectedTab === value ? "bold" : "normal",
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
    borderTop: "1px solid #d9d9d9",
    overflow: "hidden",
  },
  statusBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 15px",
    cursor: "pointer",
    position: "relative",
    zIndex: 2,
    border: "1px solid #d9d9d9",
    borderTop: "none",
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
