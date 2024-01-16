import React from "react";
import { Box } from "@mui/material";
import ModalAddDevice from "./modals/ModalAddDevice";
import Header from "./Header";
import FilterBar from "./FilterTable";

const DeviceContainer = () => {
  return (
    <React.Fragment>
      <Box
        style={{
          minWidth: 1440,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Header />
        <FilterBar />
      </Box>
    </React.Fragment>
  );
};
export default DeviceContainer;
