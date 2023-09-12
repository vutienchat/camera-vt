import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Controller, useFormContext } from "react-hook-form";
import { Box, makeStyles } from "@material-ui/core";
import DatePickerIcon from "../Icons/DatePickerIcon";

const BaseDatePickerForm = ({
  name,
  disabled,
  width = "472px",
  format = "HH:mm:ss DD/MM/YYYY",
  endIcon,
}) => {
  const { control } = useFormContext();
  const classes = useBaseDatePickerForm();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }} //optional
      render={({ field: { onChange, value } }) => {
        return (
          <Box
            className={classes.root}
            style={{
              backgroundColor: disabled ? "#ebebeb" : "transparent",
              width: width,
            }}
          >
            <DatePicker
              value={value || ""}
              onChange={(date) => {
                onChange(
                  date?.isValid ? new DateObject(date).format(format) : ""
                );
              }}
              format={format}
              style={{
                width: "100%",
                height: "26px",
                flex: 1,
                color: disabled ? "#939393" : "#000",
                border: "none",
              }}
              disabled={disabled}
            />
            {endIcon && <DatePickerIcon />}
          </Box>
        );
      }}
    />
  );
};

const useBaseDatePickerForm = makeStyles({
  root: {
    border: "1px solid rgb(133, 133, 133)",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    paddingRight: "8px",
    "& .rmdp-container ": { width: "100%" },
  },
});

export default BaseDatePickerForm;
