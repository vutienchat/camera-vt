import React from "react";
import { InputAdornment, TextField, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Eye from "../../Icon/Eye";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const BaseInputForm = ({
  name,
  isNoSpace = false,
  typeInput = "text",
  validateText,
  length,
  type,
  ...props
}) => {
  const { control, register } = useFormContext();
  const [isHiddenText, setIsHiddenText] = useState(false);
  const classes = TextFieldStyle();

  return (
    <Controller
      control={control}
      key={name}
      name={name}
      render={({ field }) => {
        const { onChange, ref, value } = field;
        return (
          <TextField
            {...register(name)}
            {...field}
            type={
              type && type === "password" && !isHiddenText ? "password" : "text"
            }
            value={value}
            onChange={(event) => {
              const value = event.target.value;
              if (type === "number" && isNaN(Number(value))) return;
              // if (validateText && !validateText.test(value)) {
              //   console.log(validateText.test(value));
              //   return;
              // }
              onChange(
                value
                  .slice(0, length || value.length)
                  .replace(/^\s+/, "")
                  .replace(/\s+$/, " ")
              );
            }}
            onKeyDown={(event) => {
              if (type === "number" && isNaN(event.target.value))
                event.preventDefault();
              return;
            }}
            // inputRef={ref}
            InputProps={{
              endAdornment: type === "password" && (
                <InputAdornment
                  position="end"
                  onClick={() => setIsHiddenText((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                >
                  {isHiddenText ? (
                    <VisibilityOffIcon style={{ fontSize: 16 }} />
                  ) : (
                    <Eye />
                  )}
                </InputAdornment>
              ),
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.root}
            {...props}
          />
        );
      }}
    />
  );
};

const TextFieldStyle = makeStyles({
  root: {
    height: 34,
    borderRadius: "8px",

    "& .MuiInputBase-root": {
      height: 34,
      borderRadius: "8px",
    },
  },
});

export default BaseInputForm;
