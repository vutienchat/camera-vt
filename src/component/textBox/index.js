import { TextField, Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";

const messageErr = {
  require: "Server name is required",
  alreadyExist: "Server name already exists",
  invalid: "Server name is invalid",
};

const TextBox = ({
  label,
  isRequired,
  maxLength,
  value,
  regex,
  onChange,
  name,
}) => {
  const [errMess, setErrMess] = useState();

  const handleCheckErr = () => {
    let err = "";
    if (isRequired && (!value || value.length === 0)) {
      err = messageErr["require"];
    }
    if (value && regex && !regex.test(value)) {
      err = messageErr["invalid"];
    }

    setErrMess(err);
  };
  return (
    <React.Fragment>
      <Typography>{label || ""}</Typography>
      {isRequired && <span>*</span>}
      <TextField
        variant="outlined"
        onBlur={handleCheckErr}
        value={value}
        onChange={(e) => {
          onChange(name, e);
          setErrMess("");
        }}
      />
      {errMess && <span>{errMess}</span>}
    </React.Fragment>
  );
};

TextBox.prototype = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextBox;
