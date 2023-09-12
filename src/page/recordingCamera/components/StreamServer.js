import { Paper, Box, Typography, makeStyles } from "@material-ui/core";
import ServerIcon from "../../../asset/image/Mask Group 1351.png";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useStylesPaper } from ".";

const useStyles = makeStyles({
  label: {
    padding: "15px 0 30px 15px",
    fontSize: 21,
    fontWeight: "bold",
  },
  value: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#4e8ff7",
    fontSize: 21,
    fontWeight: "bold",
    paddingTop: 30,
  },
  des: {
    fontSize: 14,
    paddingTop: 11,
  },
});

const StreamServer = () => {
  const classesPaper = useStylesPaper();
  const classes = useStyles();
  return (
    <Box className={classesPaper.boxContainer}>
      <Paper style={{ height: "100%" }}>
        <Typography className={classes.label}>Streaming Server</Typography>
        <Box className={classesPaper.boxContent}>
          <img src={ServerIcon} width={120} />
          <Box className={classes.value}>
            <ArrowDropUpIcon /> 2 (6.46%)
          </Box>
          <span className={classes.des}> Compared to last week</span>
        </Box>
      </Paper>
    </Box>
  );
};

export default StreamServer;
