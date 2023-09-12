import { Box, makeStyles } from "@material-ui/core";
import ClipBoard from "../../../masterMap/Icons/ClipBoard";
import RightArrowIcon from "../../../masterMap/Icons/RightArrowIcon";

const CameraAction = () => {
  const classes = styles();
  return (
    <Box className={classes.root}>
      <ClipBoard />
      <RightArrowIcon />
    </Box>
  );
};
const styles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default CameraAction;
