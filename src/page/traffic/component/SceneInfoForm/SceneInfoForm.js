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
import DatePicker, { DateObject } from "react-multi-date-picker";
import BaseFormGroup from "../BaseFormGroup";
import SelectForm from "../../../../component/SelectForm";
import {
  plateCarsColor,
  vehicleColor,
  vehicles,
  violationError,
} from "../../../../utils/traffic";
import React, { useContext, useMemo } from "react";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";
import BaseInputForm from "../BaseInputForm";

const checkDisableTab1 = (statusEvent, isHighestLevel) => {
  switch (statusEvent) {
    case "VP":
      return false;
    case "CDVP":
    case "CDKVP":
      return !isHighestLevel;
    case "CDD":
    case "CDDD":
    case "DDD":
    case "KVP":
    default:
      return true;
  }
};

const SceneInfoForm = () => {
  const methods = useFormContext();
  const { plates, isHighestLevel, selectedItem } = useContext(
    ListTrafficModalContext
  );

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const classes = useSceneInfoFormStyle();

  const isDisableTab1 = useMemo(() => {
    const statusEvent = selectedItem.statusEvent;
    return {
      numberPlate: () => checkDisableTab1(statusEvent, isHighestLevel),
      fineAmount: () => checkDisableTab1(statusEvent, isHighestLevel),
      holdGPLX: () => checkDisableTab1(statusEvent, isHighestLevel),
      vehicleType: () => checkDisableTab1(statusEvent, isHighestLevel),
      colorPlate: () => checkDisableTab1(statusEvent, isHighestLevel),
      violationDate: true,
      color: () => checkDisableTab1(statusEvent, isHighestLevel),
      violationError: () => checkDisableTab1(statusEvent, isHighestLevel),
      direction: true,
      camName: true,
      location: true,
      note: () => checkDisableTab1(statusEvent, isHighestLevel),
    };
  }, [selectedItem, isHighestLevel]);

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
          <BaseInputForm
            name="numberPlate"
            className={classes.inputField}
            error={errors["numberPlate"]}
            style={{ width: "360px" }}
            variant="outlined"
            typeInput="normal"
            isNoSpace={true}
            size="small"
            disabled={isDisableTab1.numberPlate()}
          />
        }
      />

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
                {...register("fineAmount")}
                variant="outlined"
                className={classes.inputField}
                style={{ width: "auto" }}
                error={errors["fineAmount"]}
                size="small"
                disabled={isDisableTab1.fineAmount()}
              />
              <Typography style={{ fontWeight: 700, fontSize: "14px" }}>
                VNĐ
              </Typography>
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
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    disabled={isDisableTab1.holdGPLX()}
                    value={"0"}
                    control={<Radio className={classes.radioBtn} />}
                    label="Giữ GPLX"
                  />
                  <FormControlLabel
                    value={"1"}
                    disabled={isDisableTab1.holdGPLX()}
                    control={<Radio className={classes.radioBtn} />}
                    label="Không giữ GPLX"
                  />
                </RadioGroup>
              )}
            />
          }
        />
      </React.Fragment>

      <BaseFormGroup
        label="Phương tiện"
        isRequired={true}
        error={errors["vehicleType"]}
        widthCustom={"500px"}
        component={
          <SelectForm
            className={classes.selectField}
            keyForm="vehicleType"
            list={vehicles}
            disabled={isDisableTab1.vehicleType()}
            customStyle={{
              width: !isHighestLevel ? "500px" : "100%",
            }}
          />
        }
      />

      <Box style={{ display: "flex" }}>
        <BaseFormGroup
          label="Màu biển"
          isRequired={true}
          error={errors["colorPlate"]}
          widthCustom={"50%"}
          width={"265px"}
          customStyle={{ width: "320px", marginRight: "auto" }}
          component={
            <SelectForm
              className={classes.selectField}
              keyForm="colorPlate"
              list={plateCarsColor}
              disabled={isDisableTab1.colorPlate()}
              customStyle={{ width: "180px" }}
            />
          }
        />
        <BaseFormGroup
          label="Màu xe"
          isRequired={true}
          error={errors["color"]}
          widthCustom={"auto"}
          width={"260px"}
          customStyle={{ justifyContent: "unset" }}
          component={
            <SelectForm
              className={classes.selectField}
              keyForm="color"
              list={vehicleColor}
              disabled={isDisableTab1.color()}
              customStyle={{
                marginLeft: "15px",
                width: "180px",
              }}
            />
          }
        />
      </Box>

      <BaseFormGroup
        label="Thời gian vi phạm"
        isRequired={true}
        error={errors["violationDate"]}
        widthCustom={"500px"}
        component={
          <Controller
            control={control}
            name="violationDate"
            render={({ field: { onChange, value, ref } }) => {
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
                  ref={ref}
                  format="HH:mm:ss DD/MM/YYYY"
                  style={{
                    width: "487px",
                    height: "32px",
                    backgroundColor: isDisableTab1.violationDate
                      ? "#ebebeb"
                      : "transparent",
                    color: isDisableTab1.violationDate ? "#939393" : "#000",
                  }}
                  disabled={isDisableTab1.violationDate}
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
            className={classes.selectField}
            keyForm="violationError"
            list={violationError}
            disabled={isDisableTab1.violationError()}
          />
        }
      />

      <BaseFormGroup
        label="Vị trí"
        isRequired={true}
        widthCustom={"500px"}
        error={errors["location"]}
        component={
          <TextField
            {...register("location")}
            className={classes.inputField}
            error={!!errors["location"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
            disabled={isDisableTab1.location}
          />
        }
      />

      <BaseFormGroup
        label="Tên camera"
        isRequired={true}
        widthCustom={"500px"}
        error={errors["camName"]}
        component={
          <BaseInputForm
            name="camName"
            typeInput="normal"
            className={classes.inputField}
            error={!!errors["camName"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
            disabled={isDisableTab1.camName}
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
            {...register("direction")}
            className={classes.inputField}
            error={!!errors["direction"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
            disabled={isDisableTab1.direction}
          />
        }
      />

      <BaseFormGroup
        label="Ghi chú"
        error={errors["note"]}
        widthCustom={"500px"}
        component={
          <BaseInputForm
            name="note"
            typeInput="normal"
            style={{ width: "100%" }}
            className={classes.inputField}
            variant="outlined"
            size="small"
            disabled={isDisableTab1.note()}
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
    minHeight: "485px",
  },
  inputField: {
    height: "32px",
    width: "100%",
    "& input": { height: "100%" },
    "& .MuiOutlinedInput-inputMarginDense": { padding: "8px" },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#939393",
      background: "#ebebeb",
    },
  },
  selectField: {
    height: "34px",
    "& .MuiOutlinedInput-input": { padding: "10px" },
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
  radioBtn: {
    "& .MuiSvgIcon-root": {
      fontSize: 28,
      color: "rgba(221, 61, 75, 1)",
      "&.Mui-checked": {
        color: "rgba(221, 61, 75, 1)",
      },
    },
  },
});

export default SceneInfoForm;
