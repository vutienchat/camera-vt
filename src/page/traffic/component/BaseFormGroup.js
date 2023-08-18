import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

const BaseFormGroup = ({
  label,
  component,
  isRequired,
  error,
  width,
  showErrorMessage,
  widthCustom,
}) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      alignContent="center"
      style={{ width: width || "100%" }}
    >
      <Box>
        <Typography
          style={{
            fontSize: "16px",
            color: "black",
            lineHeight: "normal",
            letterSpacing: "normal",
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          {label}{" "}
          {isRequired && (
            <span style={{ paddingLeft: "6px", color: "#dd3d4b" }}>*</span>
          )}
        </Typography>
      </Box>
      <Box style={{ width: widthCustom || "400px" }}>
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
      </Box>
      <React.Fragment>
        <Box style={{ width: "100%" }}>
          <Box style={{ width: "400px", marginLeft: "auto" }}>
            <Typography color="error" style={{ marginTop: "5px" }}>
              {showErrorMessage && error ? error.message : ""}
            </Typography>
          </Box>
        </Box>
      </React.Fragment>
    </Grid>
  );
};

export default BaseFormGroup;
