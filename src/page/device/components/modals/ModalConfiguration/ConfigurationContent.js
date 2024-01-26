import { Box, MenuItem, TextField, Typography } from "@material-ui/core";
import React, { memo } from "react";
import Vector from "../../../Icon/Vector";
import { Status } from "../../../utils";
import { makeStyles } from "@material-ui/styles";

const ConfigurationContent = memo(
  ({ list, label, selectProps, handleOnChange }) => {
    const classes = useStyles();
    return (
      <Box style={{ padding: 8 }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {list &&
            list.map((value, index) => {
              return (
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 16,
                    width: "100%",
                    justifyContent: "center",
                  }}
                  key={value.value}
                >
                  <Box>
                    {index === 0 && (
                      <Typography className={classes.label}>
                        Display Name
                        <span style={{ color: "#dd3d4b" }}>*</span>
                      </Typography>
                    )}
                    <TextField
                      defaultValue={value.label}
                      className={classes.root}
                      fullWidth
                      variant="outlined"
                      size="small"
                      style={{
                        color: "black",
                      }}
                      onChange={(e) => {
                        handleOnChange(e.target.value, index, "label");
                      }}
                    />
                    <Typography
                      color="error"
                      style={{ margin: "5px", fontSize: 12, height: 17 }}
                    >
                      {value.label ? "" : "This field is required"}
                    </Typography>
                  </Box>
                  <Box>
                    {index === 0 && (
                      <Typography className={classes.label}>
                        Variable
                        <span style={{ color: "#dd3d4b" }}>*</span>
                      </Typography>
                    )}
                    <TextField
                      className={classes.root}
                      defaultValue={value.value}
                      fullWidth
                      variant="outlined"
                      size="small"
                      style={{
                        color: "black",
                      }}
                      onChange={(e) => {
                        handleOnChange(e.target.value, index, "value");
                      }}
                    />
                    <Typography
                      color="error"
                      style={{ margin: "5px", fontSize: 12, height: 17 }}
                    >
                      {value.value ? "" : "This field is required"}
                    </Typography>
                  </Box>
                  {selectProps && (
                    <Box>
                      {index === 0 && (
                        <Typography className={classes.label}>
                          Default
                          <span style={{ color: "#dd3d4b" }}>*</span>
                        </Typography>
                      )}
                      <TextField
                        select
                        defaultValue={0}
                        variant="outlined"
                        size="small"
                        style={{
                          height: 40,
                          minWidth: 90,
                        }}
                        className={classes.root}
                      >
                        {Object.values(Status).map((item, index) => {
                          return (
                            <MenuItem
                              value={item.value}
                              key={`${item.value}_${index}`}
                            >
                              {item.shortWord ? item.shortWord : item.label}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                      <Typography
                        color="error"
                        style={{ marginTop: "5px", fontSize: 12, height: 17 }}
                      >
                        {value.value ? "" : "This field is required"}
                      </Typography>
                    </Box>
                  )}
                  <Box style={{ minWidth: 15 }}>
                    {index === 0 && <Box style={{ height: 24 }}></Box>}
                    <Vector height="15" width="15" />
                  </Box>
                </Box>
              );
            })}
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 16,
              width: "100%",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Box>
              {!list && (
                <Typography className={classes.label}>
                  Display Name
                  <span style={{ color: "#dd3d4b" }}>*</span>
                </Typography>
              )}
              <TextField
                placeholder={label}
                className={classes.root}
                fullWidth
                variant="outlined"
                size="small"
                style={{
                  color: "black",
                }}
                onChange={(e) => {
                  handleOnChange(e.target.value, "label");
                }}
              />
            </Box>
            <Box>
              {!list && (
                <Typography className={classes.label}>
                  Variable
                  <span style={{ color: "#dd3d4b" }}>*</span>
                </Typography>
              )}
              <TextField
                className={classes.root}
                placeholder="Variable"
                fullWidth
                variant="outlined"
                size="small"
                style={{
                  color: "black",
                }}
                onChange={(e) => {
                  handleOnChange(e.target.value, "value");
                }}
              />
            </Box>
            {selectProps && (
              <Box>
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  defaultValue={0}
                  className={classes.root}
                  style={{ height: 40, minWidth: 90 }}
                >
                  {Object.values(Status).map((item, index) => {
                    return (
                      <MenuItem
                        value={item.value}
                        key={`${item.value}_${index}`}
                      >
                        {item.shortWord ? item.shortWord : item.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Box>
            )}
            <Box style={{ minWidth: 15 }}></Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
    },
  },
  label: {
    marginBottom: 5,
  },
}));
export default ConfigurationContent;
