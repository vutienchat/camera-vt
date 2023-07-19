import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { settingArr } from "../../../utils/traffic";

const FormGroup = ({ label, component, isRequired, error, errorMessage }) => {
  console.log(error);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={3} lg={3}>
        {label} {isRequired && <span>(*)</span>}
      </Grid>
      <Grid item xs={8} lg={8}>
        {component}
      </Grid>
      <Grid item xs={3} lg={3}></Grid>
      <Grid item xs={8} lg={8}>
        <Typography color="error" style={{ marginTop: "5px" }}>
          {error ? error.message : ""}
        </Typography>
      </Grid>
    </Grid>
  );
};

const SettingModal = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      signer: "01",
      direct: "",
    },
    mode: "onBlur",
  });
  const classes = useSettingStyle();

  const handleChangeSetting = (data) => {
    console.log(data);
  };

  return (
    <Box className={classes.root}>
      <form
        onSubmit={handleSubmit(handleChangeSetting)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {settingArr.map((setting) => {
          if (setting.type === "text") {
            return (
              <FormGroup
                label={setting.label}
                isRequired={true}
                error={errors[setting.key]}
                component={
                  <TextField
                    {...register(setting.key, {
                      required: setting.errorMessage,
                      minLength: setting.minLength && { ...setting.minLength },
                      pattern: setting.pattern && { ...setting.pattern },
                    })}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                }
              />
            );
          } else if (setting.type === "radio") {
            return (
              <FormGroup
                label={setting.label}
                isRequired={true}
                error={errors[setting.key]}
                component={
                  <Controller
                    rules={{
                      required: {
                        message: setting.errorMessage,
                      },
                    }}
                    control={control}
                    name={setting.key}
                    render={({ field }) => {
                      return (
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="01"
                            control={<Radio />}
                            label="Trưởng phòng"
                          />
                          <FormControlLabel
                            value="02"
                            control={<Radio />}
                            label="Phó phòng"
                          />
                        </RadioGroup>
                      );
                    }}
                  />
                }
              />
            );
          }
        })}
        <Box className={classes.footer}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" type="submit" color="primary">
            Confirm
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const useSettingStyle = makeStyles({
  root: {
    marginTop: 20,
    width: 550,
  },
  footer: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    gap: "32px",
  },
});

export default SettingModal;
