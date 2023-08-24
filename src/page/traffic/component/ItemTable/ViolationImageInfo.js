import React, { useRef } from "react";

import { Box, makeStyles } from "@material-ui/core";

const ViolationImageInfo = ({ data }) => {
  const classes = useViolationImageInfoStyle();
  const videoRef = useRef(null);

  const onPlay = () => videoRef.current.play();

  return (
    <Box className={classes.root}>
      <Box style={{ marginRight: "56px", display: "flex" }}>
        <img
          src="./image.png"
          alt="Image"
          style={{ width: "197px", height: "197px", objectFit: "fill" }}
        />
      </Box>
      <Box style={{ display: "flex" }} onMouseOver={onPlay}>
        <video
          ref={videoRef}
          style={{
            width: "350px",
            height: "197px",
            objectFit: "fill",
            backgroundImage: 'url("./image.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          muted
          controls={false}
        >
          <source
            src={"/static/media/video1.74efbde570da071de4a9.mp4"}
            type="video/mp4"
          />
        </video>
      </Box>
    </Box>
  );
};

const useViolationImageInfoStyle = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ViolationImageInfo;
