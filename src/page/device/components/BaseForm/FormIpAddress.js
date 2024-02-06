import { Box, Input, InputAdornment, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormIpAddress = React.forwardRef(
  ({ type, label, ipAddress, setIPAddress }, ref) => {
    const { control, watch, register } = useFormContext();
    const formClasses = formStyle();

    const [isHideInput, setIsHideInput] = useState(false);
    const valueData = watch(type);

    const handleInputChange = (event, index, type) => {
      const { value } = event.target;
      if (isNaN(value)) return;
      if (value.trim().length <= 3) {
        const newIPAddress = [...ipAddress];
        newIPAddress[index] = value;

        if (value.length === 3 && index < 2) {
          document.getElementById(`ipPart${index + 1}${type}`).focus();
        }
        if (value.length === 3 && index == 2 && type) {
          document.getElementById(`ipPart${type}`).focus();
        }
        if (Number(value) > 255) return;
        setIPAddress(newIPAddress);
      }
    };
    return (
      <Box
        style={{
          width: "100%",
          border: "solid 1px #bdbdbd",
          height: 40,
          padding: "5px 12px",
          boxSizing: "border-box",
        }}
        onClick={() => {
          if (ipAddress.every((it) => it === "") && !valueData) {
            setIsHideInput(true);
            setTimeout(() => {
              document.getElementById(`ipPart0${type}`).focus();
            }, 100);
          } else {
            setIsHideInput(false);
            // document.getElementById(`ipPart${type}`).focus();
          }
        }}
        onBlur={() => setIsHideInput(false)}
      >
        {ipAddress.every((it) => it === "") && !valueData && !isHideInput ? (
          <span style={{ color: "#c4c4c4" }}>{label} address</span>
        ) : (
          <React.Fragment>
            {ipAddress.map((part, index) => (
              <Input
                className={formClasses.root}
                key={index}
                type="text"
                id={`ipPart${index}${type}`}
                name={`ipPart${index}`}
                maxLength="3"
                value={ipAddress[index]}
                onChange={(e) => {
                  if (e.target.value.trim().length > 3 || isNaN(e.target.value))
                    return;
                  handleInputChange(e, index, type);
                }}
                style={{ border: "none", width: 35 }}
                endAdornment={
                  <InputAdornment position="end">
                    <span style={{ fontWeight: "bold" }}>.</span>
                  </InputAdornment>
                }
              />
            ))}
            <Controller
              control={control}
              key={type}
              name={type}
              render={({ field }) => (
                <Input
                  {...field}
                  className={formClasses.root}
                  type="text"
                  id={`ipPart${type}`}
                  name={type}
                  value={field.value}
                  maxLength="3"
                  onChange={(e) => {
                    if (isNaN(e.target.value) || Number(e.target.value) > 255)
                      return;

                    field.onChange(e.target.value);
                  }}
                  style={{ border: "none", width: 35 }}
                  inputRef={field.ref}
                />
              )}
            />
          </React.Fragment>
        )}
      </Box>
    );
  }
);

const formStyle = makeStyles({
  root: {
    "&:before": {
      display: "none",
    },
    "& .MuiInputAdornment-root": {
      marginLeft: "0",
    },
  },
});

export default React.memo(FormIpAddress);
