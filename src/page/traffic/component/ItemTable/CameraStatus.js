import { Box, Typography, makeStyles } from "@material-ui/core";
import { Circle } from "@mui/icons-material";

const CameraStatus = ({ data }) => {
  const classes = styles();
  return (
    <Box className={classes.root}>
      <Box style={{ marginRight: 5 }}>
        <Circle
          style={{
            width: 12,
            height: 12,
            color: data.status === "Online" ? "#56b26e" : "#939393",
          }}
        />
      </Box>
      <Typography style={{ flex: 1 }}>{data.status}</Typography>
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

export default CameraStatus;
