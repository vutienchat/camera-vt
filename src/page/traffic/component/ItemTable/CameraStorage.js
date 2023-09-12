import { Box, Typography, makeStyles } from "@material-ui/core";
import { Circle } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";

const CameraStorage = ({ data }) => {

  const [circleColor, setCircleColor] = useState("#56b26e");
  useEffect(() => {
    if(data.cameraStorage === "Off"){
      setCircleColor("#939393")
    }else if(data.cameraStorage === "On"){
      setCircleColor("#56b26e")
    } else if(data.cameraStorage === "Error"){
      setCircleColor("#dd3d4b")
    }
  }, [data]);

  const classes = styles();
  return (
    <Box className={classes.root}>
      <Box style={{ marginRight: 5 }}>
        <Circle style={{ width: 12, height: 12, color: circleColor }} />
      </Box>
      <Typography style={{ flex: 1 }}>{data.cameraStorage}</Typography>
    </Box>
  );
};

const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CameraStorage;
