import React, { useEffect, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import PlaceHolder from "./PlaceHolder";
import FormLabel from "../../../page/unitManagement/components/FormLabel";

const FormSelect = (props) => {
  const {
    name,
    label,
    options,
    renderLabel = (option) => option.label,
    renderValue = (option) => option.value,
    disabled,
    placeholder,
    getOptionDisabled,
    onSelect,
    required,
    PaperProps,
    ...rest
  } = props;

  const { control, setValue } = useFormContext();

  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({ name, control });

  const entries = useMemo(
    () =>
      options.reduce((acc, option, i) => {
        const value = renderValue(option);
        const label = renderLabel(option);
        const disabled =
          (getOptionDisabled && getOptionDisabled(option)) || false;
        acc[value] = { value, label, disabled, key: i };
        return acc;
      }, {}),
    [getOptionDisabled, options, renderLabel, renderValue]
  );

  // Rollback
  useEffect(() => {
    if (value in entries || value === null) return;
    setValue(name, null);
  }, [value, entries, name, setValue]);

  return (
    <FormControl fullWidth error={Boolean(error)} disabled={disabled}>
      {label && (
        <FormLabel name={name} required={required} title={label}></FormLabel>
      )}
      <Select
        id={name}
        labelId={name}
        {...(disabled && {
          IconComponent: () => null,
        })}
        multiple={false}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: 34 * 10,
            },
            ...PaperProps,
          },
        }}
        renderValue={(value) => {
          if (!(value in entries)) {
            return <PlaceHolder>{!disabled && placeholder}</PlaceHolder>;
          }
          return entries[value].label;
        }}
        style={{ height: 48 }}
        variant="outlined"
        {...others}
        {...rest}
        value={value in entries ? value : ""}
        onChange={(event) => {
          onChange(event);
          onSelect && onSelect(event.target.value);
        }}
      >
        {Object.keys(entries).map((valueKey) => {
          const { value, label, disabled, key } = entries[valueKey];
          return (
            <MenuItem key={key} value={value} disabled={disabled}>
              <Typography variant="subtitle2">{label}</Typography>
            </MenuItem>
          );
        })}
      </Select>
      {error?.message && (
        <FormHelperText variant="outlined">{error.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
