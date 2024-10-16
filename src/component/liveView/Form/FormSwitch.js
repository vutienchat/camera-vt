import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Controller, useFormContext } from "react-hook-form";

const FormSwitch = (props) => {
  const { name, label, onChecked, disabled, ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          style={{ margin: 0 }}
          control={
            <Switch
              checked={Boolean(field.value)}
              onChange={(e) => {
                const checked = e.target.checked;
                field.onChange(checked);
                onChecked && onChecked(checked);
              }}
            />
          }
          {...rest}
          disabled={disabled}
          label={label}
        />
      )}
    />
  );
};

export default FormSwitch;
