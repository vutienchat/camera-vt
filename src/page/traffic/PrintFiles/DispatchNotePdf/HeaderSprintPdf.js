import React from "react";
import { getDottedArray } from "../../javacript/common";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const HeaderSprintPdf = () => {
  const classes = styles();
  return (
    <Grid className={classes.root} >
      <Grid className={classes.wrapper}>
        <Typography>{getDottedArray(160)}</Typography>
      </Grid>
      <Grid className={classes.wrapper}>
        <Grid className={classes.rowSpan}>
          <Typography className={classes.uppercaseText}>
            {getDottedArray(60)}
          </Typography>
          <Typography className={classes.uppercaseText}>
            {getDottedArray(45)}
          </Typography>
          <Grid className={classes.line}></Grid>
          <Grid>
            <Typography style={{ fontSize: 13 }}>
              Số: {getDottedArray(40)}
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.rowSpan}>
          <Typography
            className={classes.uppercaseText}
            style={{ fontWeight: 600 }}
          >
            Cộng hoà xã hội chủ nghĩa việt nam
          </Typography>
          <Typography
            className={classes.uppercaseText}
            style={{ fontWeight: 600 }}
          >
            Độc lập - Tự do - Hạnh phúc
          </Typography>
          <Grid className={classes.line}></Grid>
          <Grid>
            <Typography style={{ fontSize: 13 }}>
              {getDottedArray(20)} , ngày {getDottedArray(5)} thàng{" "}
              {getDottedArray(5)} năm {getDottedArray(7)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const styles = makeStyles({
  root: {
    display: "flex",
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    gap: 20,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rowSpan: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  uppercaseText: {
    textTransform: "uppercase",
    fontSize: 15,
  },
  line: {
    width: 120,
    height: 1,
    backgroundColor: "#000",
    margin: "5px 0",
  },
});
export default HeaderSprintPdf;
