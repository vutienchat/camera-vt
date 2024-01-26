import { InputAdornment, TextField } from "@material-ui/core";
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

  return (
    <Controller
      control={control}
      key={name}
      name={name}
      render={({ field }) => {
        const { onChange, ref } = field;
        return (
          <TextField
            {...register(name)}
            {...field}
            type={
              type && type === "password" && !isHiddenText ? "password" : "text"
            }
            onChange={(event) => {
              onChange(
                event.target.value.slice(0, length || event.target.value.length)
              );
              //   if (!regex.test(event.target.value)) {
              //     onChange(validateText(event.target.value, isNoSpace));
              //   }
            }}
            onKeyDown={(event) => {
              //   if (regex.test(event.target.value)) {
              //     event.preventDefault();
              //   }
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
            {...props}
          />
        );
      }}
    />
  );
};

export default BaseInputForm;
