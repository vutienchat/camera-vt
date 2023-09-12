import { Grid, Typography } from "@material-ui/core";
import React from "react";

const SignViewPdf = () => {
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Grid>
        <Typography style={{ fontSize: 14, textAlign: "center" }}>
          TRƯỞNG PHÒNG
        </Typography>
      </Grid>
      <Grid style={{height: 15}}></Grid>
      <Grid>
        <Typography style={{ fontSize: 14, textAlign: "center" }}>
          PHÓ PHÒNG
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignViewPdf;
