import { Box, Typography } from "@material-ui/core";
import React from "react";
import Device from "../../asset/image/Mask Group 733.png";
import Event from "../../asset/image/Mask Group 737.png";
import View from "../../asset/image/Mask Group 735.png";
import Plan from "../../asset/image/Mask Group 736.png";
const NavBar = () => {
  return (
    <React.Fragment>
      <Box
        style={{
          width: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 975,
          border: " solid 2px #e5e5e5",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: "20px",
          }}
        >
          <img src={Device} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Device
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: "20px",
          }}
        >
          <img src={Event} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Event
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: "20px",
          }}
        >
          <img src={View} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            View
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: "20px",
          }}
        >
          <img src={Plan} />
          <Typography style={{ fontSize: "14px", paddingTop: "8px" }}>
            Plan
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(NavBar);
