import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-adornedEnd": {
      padding: 0,
    },
  },
  iconButton: {
    width: "31.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "& .MuiSvgIcon-root": {
      color: "#8D8E91",
    },
    "& .MuiSvgIcon-root:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const InputNumber = (props) => {
  const { unit, onChange } = props;
  const classes = useStyles();
  const inputRef = useRef(null);

  const [value, setValue] = useState(0);

  const handleIncrease = () => {
    setValue((prevValue) => Number(prevValue) + 1);
  };

  const handleDecrease = () => {
    setValue((prevValue) =>
      Number(prevValue) > 0 ? Number(prevValue) - 1 : 0
    );
  };

  const handleChange = (event) => {
    const inputValue = event.target.value.replace(unit, " ").trim();
    if (inputValue === "") {
      setValue("");
    } else if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleFocus = () => {
    const inputElement = inputRef.current;
    const valueLength = String(value).length;
    if (inputElement) {
      inputElement.setSelectionRange(valueLength - 1, valueLength);
    }
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <TextField
      variant="outlined"
      value={`${value}${unit ? ` ${unit}` : ""}`}
      onChange={handleChange}
      onFocus={handleFocus}
      InputProps={{
        inputRef: inputRef,
        endAdornment: (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderLeft: "1.5px solid #D3D3D3",
            }}
          >
            <Box className={classes.iconButton} onClick={handleIncrease}>
              <ExpandLessIcon fontSize="small" />
            </Box>
            <Divider />
            <Box className={classes.iconButton} onClick={handleDecrease}>
              <ExpandMoreIcon fontSize="small" />
            </Box>
          </Box>
        ),
      }}
      size="small"
      className={classes.root}
    />
  );
};

export default InputNumber;
