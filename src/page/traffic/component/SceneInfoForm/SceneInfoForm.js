import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import BaseFormGroup from "../BaseFormGroup";
import SelectForm from "../../../../component/SelectForm";
import {
  carsColor,
  plateCarsColor,
  vehicles,
  violationError,
} from "../../../../utils/traffic";

const SceneInfoForm = () => {
  const methods = useFormContext();

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const classes = useSceneInfoFormStyle();

  return (
    <Box className={classes.form}>
      <BaseFormGroup
        label="Biển số xe"
        isRequired={true}
        error={errors["numberPlate"]}
        component={
          <TextField
            {...register("numberPlate", {
              required: "Number Plate is required",
            })}
            error={errors["numberPlate"]}
            style={{ width: "350px" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Biển số xe"
        isRequired={true}
        error={errors["money"]}
        component={
          <Box
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <TextField
              {...register("money", {
                required: "Money is required",
              })}
              variant="outlined"
              error={errors["money"]}
              size="small"
              style={{
                width: 250,
              }}
            />
            <Typography style={{ fontWeight: 700, fontSize: "14px" }}>
              VNĐ
            </Typography>
            <Box style={{ width: "200px" }}></Box>
          </Box>
        }
      />

      <BaseFormGroup
        label="Giữ GPLX"
        isRequired={true}
        error={errors["gplx"]}
        component={
          <Controller
            rules={{
              required: {
                message: "This field is required",
              },
            }}
            control={control}
            name="gplx"
            render={({ field }) => {
              return (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="01"
                    control={<Radio />}
                    label="Giữ GPLX"
                  />
                  <FormControlLabel
                    value="02"
                    control={<Radio />}
                    label="Không giữ GPLX"
                  />
                </RadioGroup>
              );
            }}
          />
        }
      />

      <BaseFormGroup
        label="Phương tiện"
        isRequired={true}
        error={errors["vehicles"]}
        component={
          <SelectForm width={200} keyForm="vehicles" list={vehicles} />
        }
      />

      <BaseFormGroup
        label="Màu biển"
        isRequired={true}
        error={errors["colorPlate"]}
        component={
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <SelectForm keyForm="colorPlate" list={plateCarsColor} />
            <Box>
              <BaseFormGroup
                label="Màu xe"
                width={320}
                isRequired={true}
                error={errors["colorCars"]}
                component={<SelectForm keyForm="colorCars" list={carsColor} />}
              />
            </Box>
          </Box>
        }
      />

      <BaseFormGroup
        label="Thời gian vi phạm"
        isRequired={true}
        error={errors["timeBan"]}
        component={
          <TextField
            {...register("timeBan", {
              required: "Number Plate is required",
            })}
            style={{ width: "100%" }}
            variant="outlined"
            error={!!errors["timeBan"]}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Vi phạm"
        isRequired={true}
        error={errors["violationError"]}
        component={
          <SelectForm keyForm="violationError" list={violationError} />
        }
      />

      <BaseFormGroup
        label="Vị trí"
        isRequired={true}
        error={errors["place"]}
        component={
          <TextField
            {...register("place", {
              required: "Place is required",
            })}
            error={!!errors["place"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Tên camera"
        isRequired={true}
        error={errors["camName"]}
        component={
          <TextField
            {...register("camName", {
              required: "Place is required",
            })}
            error={!!errors["camName"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Hướng đi"
        isRequired={true}
        error={errors["direction"]}
        component={
          <TextField
            {...register("direction", {
              required: "Direction is required",
            })}
            error={!!errors["direction"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Ghi chú"
        error={errors["note"]}
        component={
          <TextField
            {...register("note")}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />
    </Box>
  );
};

const useSceneInfoFormStyle = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    columnGap: "10px",
    border: "3px solid rgba(221, 61, 75, 1)",
    padding: "10px",
    overflowX: "hidden",
  },
});

export default SceneInfoForm;
