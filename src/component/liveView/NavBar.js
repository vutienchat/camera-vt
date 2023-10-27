import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Device from "../../asset/image/Mask Group 733.png";
import Event from "../../asset/image/Mask Group 737.png";
import View from "../../asset/image/Mask Group 735.png";
import Plan from "../../asset/image/Mask Group 736.png";

const useStyles = makeStyles({
  nav: {
    width: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    border: " solid 2px #e5e5e5",
  },
  itemNav: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBlock: "20px",
    cursor: "pointer",
    width: 58,
    height: 72,
  },
  itemActive: {
    background: "#e2e2e2",
    fontWeight: "bold",
  },
});

const NavBar = ({ handleOpenSideBar, typeDisplaySide }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.nav}>
        <Box
          className={`${classes.itemNav} ${
            typeDisplaySide === "Device" ? classes.itemActive : ""
          }`}
          onClick={() => handleOpenSideBar("Device")}
        >
          <img src={Device} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Device
          </Typography>
        </Box>
        <Box
          className={`${classes.itemNav} ${
            typeDisplaySide === "Event" ? classes.itemActive : ""
          }`}
          onClick={() => handleOpenSideBar("Event")}
        >
          <img src={Event} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Event
          </Typography>
        </Box>
        <Box
          className={`${classes.itemNav} ${
            typeDisplaySide === "View" ? classes.itemActive : ""
          }`}
          onClick={() => handleOpenSideBar("View")}
        >
          <img src={View} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            View
          </Typography>
        </Box>
        {/* <Box
          className={`${classes.itemNav} ${
            typeDisplaySide === "Plan" ? classes.itemActive : ""
          }`}
          onClick={() => handleOpenSideBar("Plan")}
        >
          <img src={Plan} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Plan
          </Typography>
        </Box> */}
        <Box
          className={`${classes.itemNav} ${
            typeDisplaySide === "layout" ? classes.itemActive : ""
          }`}
          onClick={() => handleOpenSideBar("layout")}
        >
          <img src={Plan} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Layout
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(NavBar);
