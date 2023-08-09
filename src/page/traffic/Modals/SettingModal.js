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
import { settingArr } from "../../../utils/traffic";
import yup from "../javacript/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateText } from "../javacript/common";

const schema = yup.object().shape({
  // direct: yup.string().required("Direct is required"),
  // subDirect: yup.string().required("Sub Direct is required"),
  // phone: yup.string() .required("Phone is required")
  //   .phonenumber("Phone is invalid"),
  // email: yup.string().required("Email is required").email("Email is invalid"),
});
const SettingModal = () => {
  const methods = useForm({
    defaultValues: {
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
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <BaseFormGroup
            label="Tỉnh/Thành phố"
            isRequired={true}
            showErrorMessage
            component={<SelectForm keyForm="city" list={cities} />}
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
                        isRequired={true}
                        key={`${setting.key}_${index}`}
                        showErrorMessage
                        error={errors[setting.key]}
                        component={
                          <TextField
                            ref={ref}
                            onChange={(e) => {
                              if (!setting.pattern) {
                                onChange(validateText(e.target.value));
                              }

                              if (setting.pattern && !setting.pattern.test(e.target.value)) {
                                onChange(validateText(e.target.value));
                              }
                            }}
                            value={value}
                            inputProps={{ maxLength: setting.maxLength || 200 }}
                            fullWidth
                            variant="outlined"
                            size="small"
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
      </FormProvider>
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
