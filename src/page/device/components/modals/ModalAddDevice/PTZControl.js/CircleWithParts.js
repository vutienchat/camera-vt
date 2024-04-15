import { Box, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { RefreshIcon } from "../../../../Icon";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const totalParts = 4;

const useStyles = makeStyles((theme) => ({
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    position: "absolute",
    overflow: "hidden",
    border: "solid 2px #DDDDDD",
    transform: `rotate(25deg)`,
  },
  part: {
    position: "absolute",
    left: "calc(50% - 1px)",
    width: "2px",
    height: "100%",
    background: "#DDDDDD",
    zIndex: "100",
  },
  btn: {
    position: "absolute",
    background: "#F6F6F6 ",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    width: 50,
    height: 50,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    border: "solid 1px #DDDDDD",
  },
  segment: {
    position: " absolute",
    width: " 100%",
    height: " 100%",
    clipPath: " polygon(50% 50%, 100% 0, 100% 50%)",
    background: "#F6F6F6 ",
    transformOrigin: " 50% 50%",
    cursor: "pointer",
  },
  icons: {
    position: "absolute",
    inset: "5px",
    fontSize: "2rem",
    cursor: "default",
  },
}));

const CircleWithParts = () => {
  const classes = useStyles();

  const handleIconClick = () => {};

  const handleSegmentClick = (index) => {
    console.log("zooo", index);
  };

  return (
    <Box className={classes.circle}>
      <Box className={classes.btn}>
        <RefreshIcon />
      </Box>
      {Array.from(Array(totalParts)).map((_, indx) => (
        <Box
          className={classes.part}
          style={{
            transform: `rotate(calc(45deg * ${indx}))`,
          }}
          key={indx}
        ></Box>
      ))}

      <Box
        style={{
          inset: 0,
          position: "absolute",
          rotate: "22.5deg",
          background: "#F6F6F6 ",
        }}
      >
        {Array.from(Array(8)).map((_, indx) => (
          <Box
            className={classes.icons}
            style={{
              transform: `rotate(calc(45deg * ${indx} + 10deg))`,
            }}
            key={indx}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick();
            }}
          >
            <ExpandLessIcon
              style={{
                transform: " rotate(-55deg)",
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        style={{
          inset: 0,
          position: "absolute",
          rotate: "22.5deg",
        }}
      >
        {Array.from(Array(8)).map((_, indx) => (
          <Box
            className={classes.segment}
            style={{
              transform: `rotate(calc(45deg * ${indx} + 23deg))`,
              opacity: 0,
            }}
            key={indx}
            onClick={() => {
              handleSegmentClick(indx);
            }}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};

export default CircleWithParts;
