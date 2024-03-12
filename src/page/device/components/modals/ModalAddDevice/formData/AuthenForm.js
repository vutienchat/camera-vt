import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Eye } from "../../../../Icon";

function AuthenticationForm() {
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
  } = useForm();

  const onSubmit = (data, event) => {
    console.log(event);
    event.preventDefault(); // Prevent page reload
    // Gửi dữ liệu xác thực (data.username, data.password) đến hệ thống để xác thực camera
    console.log("Username:", data.username);
    console.log("Password:", data.password);

    // Sau khi xác thực, reset form
    reset();
  };

  return (
    <FormProvider onSubmit={(e) => handleSubmit((data) => onSubmit(data, e))}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <BaseFormGroup
            label={"Username"}
            wrap={true}
            showErrorMessage={true}
            // error={errors["password"]}
            component={
              <BaseInputForm
                name={"username"}
                style={{ width: "100%", flex: 1 }}
                variant="outlined"
                size="small"
                control={control}
              />
            }
          />
        </Grid>
        <Grid item xs={5}>
          <BaseFormGroup
            label={"Password"}
            wrap={true}
            showErrorMessage={true}
            // error={errors["password"]}
            component={
              <BaseInputForm
                name={"password"}
                style={{ width: "100%", flex: 1 }}
                variant="outlined"
                size="small"
                type={"password"}
                control={control}
              />
            }
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            style={{
              background: "#fff",
              border: "solid 1px #DD3D4B",
              width: 135,
              height: 34,
              marginTop: 25,
            }}
            type="submit"
            disabled={!isDirty}
          >
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#DD3D4B",
                textAlign: "center",
              }}
            >
              Apply
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

const BaseInputForm = ({ name, control, ...props }) => {
  const [isHiddenText, setIsHiddenText] = useState(false);
  const classes = TextFieldStyle();

  return (
    <Controller
      control={control}
      key={name}
      name={name}
      render={({ field }) => {
        const { onChange } = field;
        return (
          <TextField
            type={name === "password" && !isHiddenText ? "password" : "text"}
            onChange={onChange}
            InputProps={{
              endAdornment: name === "password" && (
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

export default AuthenticationForm;
