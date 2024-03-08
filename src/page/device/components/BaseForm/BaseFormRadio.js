import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const BaseFormRadio = ({ name, label, options, wrap, ...props }) => {
  const { control, register } = useFormContext();

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        alignItems={wrap ? "flex-start" : "center"}
        style={{ paddingBottom: 20 }}
        direction={wrap ? "column" : "row"}
      >
        <Grid item style={{ fontWeight: 600, fontSize: 16 }}>
          {label}
        </Grid>
        <Grid item style={{ paddingBlock: 0 }}>
          <Controller
            control={control}
            key={name}
            name={name}
            render={({ field }) => {
              return (
                <FormControl component="fieldset">
                  <RadioGroup {...field} name={name} row>
                    {(options || []).map((it, indx) => (
                      <FormControlLabel
                        value={it.value}
                        key={indx}
                        control={<Radio />}
                        label={
                          <Typography style={{ fontSize: 14 }}>
                            {it.label}
                          </Typography>
                        }
                        style={{ fontSize: 14 }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(BaseFormRadio);
