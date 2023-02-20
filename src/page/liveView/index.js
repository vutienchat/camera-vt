import { Box } from "@material-ui/core";
import React from "react";
import Content from "../../component/liveView/Content";
import HeaderLiveView from "../../component/liveView/HeaderLiveView";
import NavBar from "../../component/liveView/NavBar";
import SideBar from "../../component/liveView/SideBar";

const LiveView = () => {
  return (
    <React.Fragment>
      <Box>
        <HeaderLiveView />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBlock: 24,
          }}
        >
          <Content />
          <Box style={{ display: "flex" }}>
            <NavBar />
            <SideBar />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LiveView;
