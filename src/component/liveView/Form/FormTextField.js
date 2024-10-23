import React from "react";
import TextField from "@material-ui/core/TextField";
import { useController, useFormContext } from "react-hook-form";

const FormTextField = (props) => {
  const {
    name,
    placeholder,
    disabled,
    required,
    validate,
    defaultValue,
    InputProps,
    ...rest
  } = props;

  const { control } = useFormContext();

  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      id={name}
      required={required}
      error={Boolean(error)}
      helperText={error?.message && error.message}
      placeholder={disabled ? void 0 : placeholder}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      InputProps={{
        style: { height: "48px" },
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default FormTextField;
