import React from "react";

import { Box, makeStyles } from "@material-ui/core";

const ViolationImageInfo = ({ data }) => {
  const classes = useViolationImageInfoStyle();

  return (
    <Box className={classes.root}>
      <Box style={{ marginRight: "56px", display: "flex" }}>
        <img
          src="./image.png"
          alt="Image"
          style={{ width: "197px", height: "197px", objectFit: "fill" }}
        />
      </Box>
      <Box style={{ display: "flex" }}>
        <video
          style={{
            width: "350px",
            height: "197px",
            objectFit: "fill",
            backgroundImage: 'url("./image.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          controls={false}
          autoPlay
        >
          <source src={""} type="video/mp4" />
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
  },
});

export default ViolationImageInfo;
