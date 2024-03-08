import { Box, Typography } from "@material-ui/core";
import React from "react";

const BoxListData = ({ label, children }) => {
  return (
    <Box
      style={{
        width: "auto",
        position: "relative",
        padding: "12px 16px",
        border: "solid 1px #858C94 ",
        borderRadius: 8,
      }}
    >
      <Typography
        style={{
          position: "absolute",
          padding: 2,
          background: "#fff",
          top: "-12px",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default BoxListData;
