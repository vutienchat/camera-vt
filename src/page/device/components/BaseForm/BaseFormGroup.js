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
  customStyle,
  wrap,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width || "100%",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems={wrap ? "flex-start" : "center"}
        alignContent="center"
        direction={wrap ? "column" : "row"}
        wrap={wrap ? "wrap" : "nowrap"}
        spacing={0}
        style={{ ...customStyle }}
      >
        <Box
          style={{
            flex: "0.25",
            paddingBottom: wrap ? 8 : 0,
            marginTop: wrap ? 0 : 11,
          }}
        >
          <Typography
            style={{
              fontSize: "0.9rem",
              color: "black",
              lineHeight: "normal",
              letterSpacing: "normal",
              display: "flex",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            {label}
            {isRequired && (
              <span style={{ paddingLeft: "6px", color: "#dd3d4b" }}>*</span>
            )}
          </Typography>
        </Box>
        <Box
          style={{ width: wrap && (widthCustom || "100%"), flex: wrap && 1 }}
        >
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
      </Grid>
      <Box style={{ width: "100%" }}>
        <Box
          style={{
            width: widthCustom || "100%",
            position: "relative",
            //   marginLeft:  "auto",
          }}
        >
          {showErrorMessage && error ? (
            <Typography
              color="error"
              style={{
                marginTop: wrap ? 5 : 20,
                fontSize: 14,
                marginLeft: wrap ? 0 : 110,
              }}
            >
              {error.message}
            </Typography>
          ) : (
            <Typography
              style={{
                marginTop: wrap ? 5 : 20,
                fontSize: 14,
                marginLeft: wrap ? 0 : 110,
                height: 21,
              }}
            ></Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BaseFormGroup;
