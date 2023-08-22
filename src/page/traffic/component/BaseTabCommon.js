import { Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const BaseTabCommon = ({
  width,
  list,
  selectedTab,
  handleChangeSelectedTab,
  customStyle,
  isBaseTabModal,
}) => {
  const classes = useTabCommonStyle();
  return (
    <Box
      className={classes.root}
      style={{
        width: width || "fit-content",
        ...customStyle,
      }}
    >
      {list.map(({ label, value }, index) => {
        const isTabSelected = selectedTab === value;
        return (
          <Box
            key={value}
            className={classes.statusBox}
            style={{
              position: "relative",
              width: width ? `${100 / list.length}%` : "auto",
              minWidth: "200px",
              backgroundColor: isTabSelected
                ? isBaseTabModal
                  ? "#dd3d4b"
                  : "#ebebeb"
                : "#fff",
              borderTopLeftRadius: customStyle && index === 0 ? "8px" : "0px",
              borderTopRightRadius:
                customStyle && index === list.length - 1 ? "8px" : "0px",
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
                fontWeight: isTabSelected ? "bold" : "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
                color: isTabSelected && isBaseTabModal ? "white" : "black",
              }}
            >
              {label} {!isBaseTabModal && 120}
            </Typography>
            {isTabSelected && (
              <Box
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "4px",
                  backgroundColor: "#dd3d4b",
                  bottom: "-2px",
                }}
              />
            )}
          </Box>
        );
      })}
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
    padding: "10px 20px",
    boxSizing: "border-box",
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
