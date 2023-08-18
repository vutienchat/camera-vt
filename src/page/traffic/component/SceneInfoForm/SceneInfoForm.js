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
  plateCarsColor,
  vehicles,
  violationError,
} from "../../../../utils/traffic";
import React, { useContext } from "react";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";
import DatePicker, { DateObject } from "react-multi-date-picker";

const SceneInfoForm = () => {
  const methods = useFormContext();
  const { plates, isHighestLevel } = useContext(ListTrafficModalContext);

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const classes = useSceneInfoFormStyle();

  return (
    <Box className={classes.form}>
      <Box className={classes.plate}>
        {plates.map((plate, index) => (
          <Typography key={`${plate}_${index}`}>{plate}</Typography>
        ))}
      </Box>
      <BaseFormGroup
        label="Biển số xe"
        isRequired={true}
        error={errors["numberPlate"]}
        widthCustom={"500px"}
        component={
          <TextField
            {...register("numberPlate", {
              required: "Number Plate is required",
            })}
            className={classes.inputFeild}
            error={errors["numberPlate"]}
            style={{ width: "360px" }}
            variant="outlined"
            size="small"
            disabled={!isHighestLevel}
          />
        }
      />

      {isHighestLevel && (
        <React.Fragment>
          <BaseFormGroup
            label="Số tiền phạt"
            isRequired={true}
            error={errors["fineAmount"]}
            width="100%"
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
                  {...register("fineAmount", {
                    required: "Fine Amount is required",
                  })}
                  variant="outlined"
                  className={classes.inputFeild}
                  error={errors["fineAmount"]}
                  size="small"
                  disabled={!isHighestLevel}
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
            error={errors["holdGPLX"]}
            component={
              <Controller
                name="holdGPLX"
                control={control}
                rules={{ required: "Vui long chon" }}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      disabled={!isHighestLevel}
                      value={"0"}
                      control={<Radio />}
                      label="Giữ GPLX"
                    />
                    <FormControlLabel
                      value={"1"}
                      disabled={!isHighestLevel}
                      control={<Radio />}
                      label="Không giữ GPLX"
                    />
                  </RadioGroup>
                )}
              />
            }
          />
        </React.Fragment>
      )}

      <BaseFormGroup
        label="Phương tiện"
        isRequired={true}
        error={errors["vehicleType"]}
        widthCustom={"500px"}
        component={
          <SelectForm
            className={classes.selectFeild}
            keyForm="vehicleType"
            list={vehicles}
            disabled={!isHighestLevel}
            customStyle={{
              width: !isHighestLevel ? "360px" : "100%",
            }}
          />
        }
      />

      <BaseFormGroup
        label="Màu biển"
        isRequired={true}
        error={errors["colorPlate"]}
        widthCustom={"500px"}
        component={
          <SelectForm
            className={classes.selectFeild}
            keyForm="colorPlate"
            list={plateCarsColor}
            disabled={!isHighestLevel}
            customStyle={{
              width: !isHighestLevel ? "360px" : "100%",
            }}
          />
        }
      />

      <BaseFormGroup
        label="Thời gian vi phạm"
        isRequired={true}
        error={errors["violationDate"]}
        widthCustom={"500px"}
        component={
          <Controller
            control={control}
            name="violationDate"
            rules={{ required: true }} //optional
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  value={value || ""}
                  onChange={(date) => {
                    onChange(
                      date?.isValid
                        ? new DateObject(date).format("HH:mm:ss DD/MM/YYYY")
                        : ""
                    );
                  }}
                  format="HH:mm:ss DD/MM/YYYY"
                  style={{
                    width: "472px",
                    height: "32px",
                    backgroundColor: !isHighestLevel
                      ? "#ebebeb"
                      : "transparent",
                    color: !isHighestLevel ? "#939393" : "#000",
                  }}
                  disabled={!isHighestLevel}
                />
              );
            }}
          />
        }
      />

      <BaseFormGroup
        label="Vi phạm"
        isRequired={true}
        widthCustom={"500px"}
        error={errors["violationError"]}
        component={
          <SelectForm
            className={classes.selectFeild}
            keyForm="violationError"
            list={violationError}
            disabled={!isHighestLevel}
          />
        }
      />

      <BaseFormGroup
        label="Vị trí"
        isRequired={true}
        widthCustom={"500px"}
        error={errors["direction"]}
        component={
          <TextField
            {...register("direction", {
              required: "Direction is required",
            })}
            className={classes.inputFeild}
            error={!!errors["direction"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
            disabled={!isHighestLevel}
          />
        }
      />

      <BaseFormGroup
        label="Tên camera"
        isRequired={true}
        widthCustom={"500px"}
        error={errors["camName"]}
        component={
          <TextField
            {...register("camName", {
              required: "Place is required",
            })}
            className={classes.inputFeild}
            error={!!errors["camName"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
            disabled={!isHighestLevel}
          />
        }
      />

      <BaseFormGroup
        label="Hướng đi"
        isRequired={true}
        error={errors["direction"]}
        widthCustom={"500px"}
        component={
          <TextField
            {...register("direction", {
              required: "Direction is required",
            })}
            className={classes.inputFeild}
            error={!!errors["direction"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
            disabled={!isHighestLevel}
          />
        }
      />

      <BaseFormGroup
        label="Ghi chú"
        error={errors["note"]}
        widthCustom={"500px"}
        component={
          <TextField
            {...register("note")}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            size="small"
            disabled={!isHighestLevel}
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
    gap: "2px",
    border: "1px solid #d3d3d3",
    padding: "16px 20px",
    position: "relative",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    height: "480px",
  },
  inputFeild: {
    height: "32px",
    width: "100%",
    "& input": {
      height: "100%",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8px",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#939393",
      background: "#ebebeb",
    },
  },
  selectFeild: {
    height: "34px",
    "& .MuiOutlinedInput-input": {
      padding: "10px",
    },
    "&.MuiInputBase-root.Mui-disabled": {
      color: "#939393",
      background: "#ebebeb",
    },
  },
  plate: {
    position: "absolute",
    top: "40px",
    right: "30px",
    padding: "5px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    justifyContent: "center",
    border: "2px solid #000",
    "& p": {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "21px",
      lineHeight: 1.14,
    },
  },
});

export default SceneInfoForm;
