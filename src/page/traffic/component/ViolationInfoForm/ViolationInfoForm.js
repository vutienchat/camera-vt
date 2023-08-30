import { Box, TextField, Typography, makeStyles } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import BaseFormGroup from "../BaseFormGroup";
import { useContext } from "react";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";
import BaseDatePickerForm from "../BaseDatePickerForm";
import { AddressSelectTab } from "../../../../component/HeaderAction/select-tab/address";
import BaseInputForm from "../BaseInputForm";

const checkDisableTab2 = (statusEvent, isHighestLevel) => {
  switch (statusEvent) {
    case "CDD":
      return false;
    case "CDDD":
      return !isHighestLevel;
    case "DDD":
    case "KVP":
    default:
      return true;
  }
};

const ViolationInfoForm = () => {
  const classes = useSceneInfoFormStyle();
  const methods = useFormContext();
  const { plates, isHighestLevel, selectedItem } = useContext(
    ListTrafficModalContext
  );
  const statusEvent = selectedItem.statusEvent;
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <Box className={classes.form}>
      <Typography style={{ fontWeight: 600 }}>
        Thông tin chủ phương tiện
      </Typography>

      <Box className={classes.plate}>
        {plates.map((plate, index) => (
          <Typography key={`${plate}_${index}`}>{plate}</Typography>
        ))}
      </Box>

      <BaseFormGroup
        label="Chủ phương tiện"
        isRequired={true}
        error={errors["fullName"]}
        component={
          <BaseInputForm
            name="fullName"
            className={classes.inputFeild}
            error={!!errors["fullName"]}
            style={{ width: "350px" }}
            variant="outlined"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Ngày sinh"
        isRequired={true}
        error={errors["birthday"]}
        component={
          <BaseDatePickerForm
            name="birthday"
            format="DD/MM/YYYY"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
            width="340px"
            endIcon
          />
        }
      />

      <BaseFormGroup
        label="CMND/ CCCD"
        isRequired={true}
        error={errors["cccd"]}
        component={
          <BaseInputForm
            name="cccd"
            isNoSpace={true}
            typeInput="number"
            className={classes.inputFeild}
            error={!!errors["cccd"]}
            style={{ width: "350px" }}
            variant="outlined"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Số điện thoại"
        isRequired={true}
        error={errors["phoneNumber"]}
        component={
          <BaseInputForm
            name="phoneNumber"
            isNoSpace={true}
            error={!!errors["phoneNumber"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Địa chỉ chi tiết"
        isRequired={true}
        error={errors["address"]}
        component={
          <BaseInputForm
            name="address"
            typeInput="normal"
            error={!!errors["address"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Địa chỉ"
        isRequired={true}
        error={errors["addressType"]}
        component={
          <AddressSelectTab
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
          />
        }
      />

      <Typography style={{ fontWeight: 600 }}>
        Thông tin thông báo xử phạt
      </Typography>

      <BaseFormGroup
        label="Số thông báo"
        isRequired={true}
        error={errors["infoNumber"]}
        component={
          <TextField
            {...register("infoNumber")}
            error={!!errors["infoNumber"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            size="small"
            disabled
          />
        }
      />

      <Box style={{ display: "flex" }}>
        <Box style={{ display: "flex", marginRight: "auto" }}>
          <Box style={{ margin: "auto", width: "180px" }}>
            <Typography style={{ fontSize: "14px" }}>
              Thông báo gửi lần 1
            </Typography>
          </Box>
          <Box>
            <BaseDatePickerForm
              name="send1"
              format="DD/MM/YYYY"
              disabled={checkDisableTab2(statusEvent, isHighestLevel)}
              width="124px"
              endIcon
            />
          </Box>
        </Box>
        <Box style={{ width: "300px", display: "flex" }}>
          <Box style={{ margin: "auto", marginLeft: 0 }}>
            <Typography style={{ fontSize: "14px" }}>
              Thông báo gửi lần 2
            </Typography>
          </Box>
          <Box>
            <BaseDatePickerForm
              name="send2"
              format="DD/MM/YYYY"
              disabled={checkDisableTab2(statusEvent, isHighestLevel)}
              width="124px"
              endIcon
            />
          </Box>
        </Box>
      </Box>

      <Box style={{ marginTop: "5px", marginBottom: "5px", display: "flex" }}>
        <Box style={{ display: "flex", marginRight: "auto" }}>
          <Box style={{ margin: "auto", width: "180px" }}>
            <Typography style={{ fontSize: "14px" }}>
              Thông báo gửi sở GTVT
            </Typography>
          </Box>
          <Box>
            <BaseDatePickerForm
              name="sendGTVT"
              format="DD/MM/YYYY"
              disabled={checkDisableTab2(statusEvent, isHighestLevel)}
              width="124px"
              endIcon
            />
          </Box>
        </Box>
        <Box style={{ width: "300px", display: "flex" }}>
          <Box style={{ margin: "auto", marginLeft: 0 }}>
            <Typography style={{ fontSize: "14px" }}>
              Thông báo hoàn lại
            </Typography>
          </Box>
          <Box>
            <BaseDatePickerForm
              name="infoReturn"
              format="DD/MM/YYYY"
              disabled={checkDisableTab2(statusEvent, isHighestLevel)}
              width="124px"
              endIcon
            />
          </Box>
        </Box>
      </Box>

      <BaseFormGroup
        label="Ngày giờ hẹn"
        isRequired={true}
        error={errors["appointmentDate"]}
        component={
          <BaseDatePickerForm
            name="appointmentDate"
            format="DD/MM/YYYY"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
            width="100%"
            endIcon
          />
        }
      />

      <BaseFormGroup
        label="Ghi chú"
        isRequired={true}
        error={errors["infoSactionNote"]}
        component={
          <BaseInputForm
            name="infoSactionNote"
            typeInput="normal"
            error={!!errors["infoSactionNote"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            size="small"
            disabled={checkDisableTab2(statusEvent, isHighestLevel)}
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
    padding: "10px",
    position: "relative",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    minHeight: "495px",
  },
  inputFeild: {
    height: "32px",
    "& input": { height: "100%" },
    "& .MuiOutlinedInput-inputMarginDense": { padding: "8px" },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#939393",
      background: "#ebebeb",
    },
  },
  selectFeild: {
    height: "34px",
    "& .MuiOutlinedInput-input": { padding: "10px" },
    "&.MuiInputBase-root.Mui-disabled": {
      color: "#939393",
      background: "#ebebeb",
    },
  },
  plate: {
    position: "absolute",
    top: "60px",
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

export default ViolationInfoForm;
