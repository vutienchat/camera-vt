import { Box } from "@material-ui/core";
import React, { useState } from "react";
import Content from "../../component/liveView/Content";
import HeaderLiveView from "../../component/liveView/HeaderLiveView";
import NavBar from "../../component/liveView/NavBar";
import SideBar from "../../component/liveView/SideBar";

const LiveView = () => {
  const [isSideBar, setIsSideBar] = useState(false);
  const [typeDisplaySide, setTypeDisplaySide] = useState();

  const handleOpenSideBar = (type) => {
    setIsSideBar((prev) => {
      if (typeDisplaySide === type) {
        setTypeDisplaySide("");
        return !prev;
      } else {
        setTypeDisplaySide(type);
        return true;
      }
    });
  };

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
            <NavBar
              handleOpenSideBar={handleOpenSideBar}
              typeDisplaySide={typeDisplaySide}
            />
            {isSideBar && <SideBar />}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LiveView;
