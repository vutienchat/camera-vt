import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

const BaseFormGroup = ({
  label,
  component,
  isRequired,
  error,
  width,
  showErrorMessage,
}) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      alignContent="center"
      style={{ width: width || "100%" }}
    >
      <Grid item xs={3} lg={3}>
        {label} {isRequired && <span>(*)</span>}
      </Grid>
      <Grid item xs={9} lg={9}>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {component}
        </Box>
      </Grid>
      <React.Fragment>
        <Grid item xs={3} lg={3}></Grid>
        <Grid item xs={9} lg={9}>
          <Typography color="error" style={{ marginTop: "5px" }}>
            {showErrorMessage && error ? error.message : ""}
          </Typography>
        </Grid>
      </React.Fragment>
    </Grid>
  );
};

export default BaseFormGroup;
