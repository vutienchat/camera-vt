import React, { memo } from "react";
import { Box } from "@material-ui/core";

const RenderVideoView = memo((props) => {
  const { deviceList } = props;

  return (
    <Box style={{ height: "100%" }}>
      {/* <iframe
        style={{ width: "100%", height: "100%" }}
        control={false}
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      ></iframe> */}
      <video style={{ width: "100%", height: "100%" }} controls={false}>
        <source
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          type="video/mp4"
        />
      </video>
    </Box>
  );
});

const ScreenTask = memo((props) => {
  const { screenDetail } = props;
  const deviceList = [
    { url: "http://", stayTime: 60 },
    { url: "http://", stayTime: 70 },
    { url: "http://", stayTime: 40 },
    { url: "http://", stayTime: 80 },
    { url: "http://", stayTime: 100 },
  ];

  if (screenDetail.screenDetail.length !== 0) {
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
    <Box style={{ backgroundColor: "#e2e2e2", width: "100%", height: "100%" }}>
      <RenderVideoView deviceList={deviceList} />
    </Box>
  );
});

export default ScreenTask;
