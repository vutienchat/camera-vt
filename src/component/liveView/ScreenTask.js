import React, { memo } from "react";
import { Box } from "@material-ui/core";

const ScreenTask = memo((props) => {
  const { screenDetail } = props;

  if (screenDetail.screenDetail.length === 0) {
    return (
      <Box
        style={{
          backgroundColor: "#e2e2e2",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            color: "white",
            textAlign: "end",
            pointerEvents: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <Box style={{ fontWeight: "bold", fontSize: "36px" }}>viettel</Box>
          <Box>hight tech</Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      style={{ backgroundColor: "#e2e2e2", width: "100%", height: "100%" }}
    ></Box>
  );
});

export default ScreenTask;
