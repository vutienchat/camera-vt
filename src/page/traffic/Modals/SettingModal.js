import { useMemo } from "react";
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
import { settingArr, SPECIAL_CHARACTER_TEXT } from "../../../utils/traffic";
import yup from "../javacript/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateText } from "../javacript/common";

const schema = yup.object().shape({
  direct: yup.string().required("Direct is required"),
  subDirect: yup.string().required("Sub Direct is required"),
  phone: yup.string().required("Phone is required").phone("Phone is invalid"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});
const SettingModal = () => {
  const defaultValues = {
    provinceId: "01", // Mã code Tỉnh/TP
    districtId: "001", // Mã code Quận/Huyện
    address: "string", // Địa chỉ chi tiết
    headConfirmation: "01", // Ký thay Trưởng phòng
    unitHeads: "string", // Tên thủ trưởng
    manager: "string", // Tên Trưởng phòng
    deputy: "string", // Tên Phó phòng
    phone: "string", // Số điện thoại phòng
    email: "string", // Địa chỉ Email phòng
  };
  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      name: "",
      signer: "01",
      direct: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
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
          onSubmit={handleSubmit(handleChangeSetting)}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <BaseFormGroup
            label="Tỉnh/Thành phố"
            isRequired={true}
            showErrorMessage
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
            if (setting.type === "text") {
              return (
                <Controller
                  name={setting.key}
                  control={control}
                  render={(props) => {
                    const { onChange, value, ref } = props.field;

                    return (
                      <BaseFormGroup
                        label={setting.label}
                        isRequired={setting.key !== "email"}
                        key={`${setting.key}_${index}`}
                        showErrorMessage
                        error={errors[setting.key]}
                        component={
                          <TextField
                            ref={ref}
                            {...register(setting.key)}
                            onChange={(e) => {
                              if (!setting.pattern)
                                onChange(validateText(e.target.value));

                              if (
                                !SPECIAL_CHARACTER_TEXT.test(e.target.value) &&
                                setting.pattern &&
                                setting.pattern.test(e.target.value)
                              ) {
                                onChange(validateText(e.target.value));
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
                  component={
                    <Controller
                      control={control}
                      name={setting.key}
                      render={({ field }) => {
                        console.log("field", field);
                        return (
                          <RadioGroup row {...field}>
                            <FormControlLabel
                              value="01"
                              control={
                                <Radio
                                  className={
                                    field.value === "01" && classes.radioField
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
                                    field.value === "02" && classes.radioField
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
