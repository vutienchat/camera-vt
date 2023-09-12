import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const BriefInformation = () => {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography className={classes.rowSpan} style={{ fontSize: 11, fontWeight: 600 }}>
        Mẫu số 02/65/68
      </Typography>
      <Grid style={{marginTop: 2}}>
        <Typography className={classes.rowSpan} style={{ fontSize: 11 }}>
          Ban hành kèm theo Thông tư số 15/2022/TT-BCA ngày 06/4/2022{" "}
        </Typography>
        <Typography className={classes.rowSpan} style={{ fontSize: 11 }}>
          của Bộ trưởng Bộ Công an
        </Typography>
      </Grid>
    </Grid>
  );
};

const styles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  rowSpan: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
});

export default BriefInformation;
