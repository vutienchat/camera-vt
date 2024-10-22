import React from "react";
import Box from "@material-ui/core/Box";

import ListGroupCompany from "./components/ListGroupCompany";
import ConfigGroupCompany from "./components/ConfigGroupCompany";

const UnitManagement = () => {
  return (
    <Box sx={{ marginTop: 70, padding: 24, paddingBottom: 0 }}>
      <Box
        sx={{
          display: "flex",
          gap: 24,
          height: "calc(100vh - 94px)",
          backgroundColor: "#F9FAFC",
          boxSizing: "border-box",
        }}
      >
        <ListGroupCompany />
        <ConfigGroupCompany />
      </Box>
    </Box>
  );
};

export default UnitManagement;
