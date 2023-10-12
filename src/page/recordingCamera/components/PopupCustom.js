import React from "react";
import { Box, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    boxShadow: "1px 1px 1px  #d3d3d3",
    zIndex: 1,
    position: "absolute",
    boxSizing: "border-box",
    marginTop: 10,
  },
  option: {
    padding: 10,
    margin: 5,
    height: "20px",
    cursor: "pointer",

    "&:hover": {
      background: "#f6f4f4",
    },
  },
});

const PopupCustom = ({ width, listOption }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.boxContainer}
      style={{
        width: width || 250,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search "
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {listOption.map((it) => (
        <Box key={it.name} className={classes.option}>
          {it.name}
        </Box>
      ))}
    </Box>
  );
};

export default PopupCustom;
