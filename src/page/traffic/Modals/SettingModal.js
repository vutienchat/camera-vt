import { useContext, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { jsonAddress } from "../../../jsonAddress";
import SelectForm from "../../../component/SelectForm";
import BaseFormGroup from "../component/BaseFormGroup";
import {
  settingArr,
  SPECIAL_CHARACTER_NUMBER,
  SPECIAL_CHARACTER_TEXT,
} from "../../../utils/traffic";
import yup from "../javacript/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateText } from "../javacript/common";
import { TrafficContext } from "../TrafficContent";

const schema = yup.object().shape({
  city: yup.string().required("Thành phố là trường bắt buộc"),
  province: yup.string().required("Địa chỉ quận huyện là trường bắt buộc"),
  address: yup.string().required("Địa chỉ chi tiết là trường bắt buộc"),
  unitHeads: yup.string().required("Tên thủ trường là trường bắt buộc"),
  manager: yup.string().required("Tên trưởng phòng là trường bắt buộc"),
  deputy: yup.string().required("Tên phó phòng là trường bắt buộc"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ"),
  email: yup.string().email("Email không hợp lệ"),
});
// const defaultValues = {
//   city: "", // Mã code Tỉnh/TP
//   province: "", // Mã code Quận/Huyện
//   address: "", // Địa chỉ chi tiết
//   headConfirmation: "01", // Ký thay Trưởng phòng
//   unitHeads: "", // Tên thủ trưởng
//   manager: "", // Tên Trưởng phòng
//   deputy: "", // Tên Phó phòng
//   phone: "", // Số điện thoại phòng
//   email: "", // Địa chỉ Email phòng
// };

const SettingModal = ({ handleCancel }) => {
  const { modelSetting } = useContext(TrafficContext);
  const methods = useForm({
    defaultValues: modelSetting,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const classes = useSettingStyle();

  const watchCityFields = watch(["city"]);

  const handleChangeSetting = (data) => {
    console.log(data);
  };

  const cities = useMemo(() => {
    if (!jsonAddress) return [];

    return jsonAddress.map((address) => ({
      label: address["Name"],
      value: address["Id"],
    }));
  }, []);

  const provinces = useMemo(() => {
    const citySelected = jsonAddress.find(
      (address) => address.Id === watchCityFields[0]
    );

    if (!citySelected) return [];

    return citySelected.Districts.map((address) => ({
      label: address["Name"],
      value: address["Id"],
    }));
  }, [watchCityFields]);

  return (
    <Box className={classes.root}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleChangeSetting)}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <BaseFormGroup
            label="Tỉnh/Thành phố"
            isRequired={true}
            showErrorMessage
            widthCustom={"400px"}
            error={errors["city"]}
            component={
              <SelectForm
                keyForm="city"
                list={cities}
                className={classes.selectField}
              />
            }
          />

          <BaseFormGroup
            label="Quận/Huyện"
            isRequired={true}
            showErrorMessage
            widthCustom={"400px"}
            error={errors["province"]}
            component={
              <SelectForm
                keyForm="province"
                list={provinces}
                disabled={provinces.length === 0}
                className={classes.selectField}
              />
            }
          />

          {settingArr.map((setting, index) => {
            // console.log(setting);
            if (setting.type === "text") {
              return (
                <Controller
                  name={setting.key}
                  control={control}
                  key={`${setting.key}_${index}`}
                  render={(props) => {
                    const { onChange, value, ref } = props.field;

                    return (
                      <BaseFormGroup
                        label={setting.label}
                        isRequired={setting.key !== "email"}
                        showErrorMessage
                        error={errors[setting.key]}
                        widthCustom={"400px"}
                        component={
                          <TextField
                            ref={ref}
                            {...register(setting.key)}
                            onChange={(e) => {
                              const { value } = e.target;
                              if (!setting.pattern) {
                                if (setting.key === "email") {
                                  onChange(validateText(value.trim()));
                                } else {
                                  onChange(validateText(value));
                                }
                              }

                              if (setting.key === "phone") {
                                if (!SPECIAL_CHARACTER_NUMBER.test(value))
                                  onChange(validateText(value));
                              } else if (setting.key === "address") {
                                if (
                                  setting.pattern &&
                                  setting.pattern.test(value)
                                )
                                  onChange(validateText(value));
                              } else {
                                if (
                                  !SPECIAL_CHARACTER_TEXT.test(value) &&
                                  setting.pattern &&
                                  setting.pattern.test(value)
                                )
                                  onChange(validateText(value));
                              }
                            }}
                            value={value}
                            inputProps={{ maxLength: setting.maxLength || 200 }}
                            fullWidth
                            variant="outlined"
                            size="small"
                            className={classes.inputField}
                            style={{ color: "black" }}
                          />
                        }
                      />
                    );
                  }}
                />
              );
            } else if (setting.type === "radio") {
              return (
                <BaseFormGroup
                  label={setting.label}
                  isRequired={true}
                  error={errors[setting.key]}
                  key={`${setting.key}_${index}`}
                  showErrorMessage
                  widthCustom={"400px"}
                  component={
                    <Controller
                      control={control}
                      name={setting.key}
                      render={({ field }) => {
                        return (
                          <RadioGroup row {...field}>
                            <FormControlLabel
                              value="01"
                              control={
                                <Radio
                                  className={
                                    field.value === "01"
                                      ? classes.radioField
                                      : ""
                                  }
                                />
                              }
                              label="Trưởng phòng"
                            />
                            <FormControlLabel
                              value="02"
                              control={
                                <Radio
                                  className={
                                    field.value === "02"
                                      ? classes.radioField
                                      : ""
                                  }
                                />
                              }
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
            <Button
              variant="outlined"
              className={`${classes.buttonCancel} ${classes.buttonCustom}`}
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="contained"
              type="submit"
              className={`${classes.buttonSubmit} ${classes.buttonCustom}`}
            >
              Lưu
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

const useSettingStyle = makeStyles({
  root: {
    marginTop: "32px",
    width: 559,
  },
  footer: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    gap: "32px",
  },
  inputField: {
    "& .MuiOutlinedInput-root": { height: "48px" },
    "& input": { height: "100%", padding: "0 12px" },
  },
  selectField: { height: "48px" },
  radioField: {
    "& div": { color: "#dd3d4b" },
  },
  buttonCustom: {
    minWidth: "150px",
    height: "48px",
    fontWeight: "bold",
    lineHeight: "normal",
    letterSpacing: "normal",
    textTransform: "unset",
    borderRadius: "4px",
    boxShadow: "none",
  },
  buttonCancel: { border: "solid 2px #000", backgroundColor: "white" },
  buttonSubmit: {
    background: "#dd3d4b",
    color: "white",
  },
});

export default SettingModal;
