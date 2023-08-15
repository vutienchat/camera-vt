import {
  Box,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import BaseFormGroup from "../BaseFormGroup";
import { useContext } from "react";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";
import BaseDatePickerForm from "../BaseDatePickerForm";
import { AddressSelectTab } from "../../../../component/HeaderAction/select-tab/address";

const ViolationInfoForm = () => {
  const classes = useSceneInfoFormStyle();
  const methods = useFormContext();
  const { plates, isHighestLevel } = useContext(ListTrafficModalContext);

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
          <TextField
            {...register("fullName", {
              required: "Full Name is required",
            })}
            className={classes.inputFeild}
            error={!!errors["fullName"]}
            style={{ width: "350px" }}
            variant="outlined"
            disabled={!isHighestLevel}
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
            disabled={!isHighestLevel}
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
          <TextField
            {...register("cccd", {
              required: "Vui lòng nhâp CMND/ CCCD",
            })}
            className={classes.inputFeild}
            error={!!errors["cccd"]}
            style={{ width: "350px" }}
            variant="outlined"
            disabled={!isHighestLevel}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Số điện thoại"
        isRequired={true}
        error={errors["phoneNumber"]}
        component={
          <TextField
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            error={!!errors["phoneNumber"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            disabled={!isHighestLevel}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Địa chỉ chi tiết"
        isRequired={true}
        error={errors["address"]}
        component={
          <TextField
            {...register("address", {
              required: "Địa chỉ chi tiết is required",
            })}
            error={!!errors["addressDetail"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            disabled={!isHighestLevel}
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Địa chỉ"
        isRequired={true}
        error={errors["addressType"]}
        component={
          <AddressSelectTab />
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
            {...register("infoNumber", {
              required: "Địa chỉ chi tiết is required",
            })}
            error={!!errors["infoNumber"]}
            style={{ width: "100%" }}
            className={classes.inputFeild}
            variant="outlined"
            size="small"
            disabled
          />
        }
      />

      <Grid container justifyContent="space-between">
        <Grid item xs={6} lg={6}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography style={{ fontSize: "14px" }}>
                Thông báo gửi lần 1
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <BaseDatePickerForm
                name="send1"
                format="DD/MM/YYYY"
                disabled={!isHighestLevel}
                width="94%"
                endIcon
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} lg={6} style={{ paddingLeft: "5px" }}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography style={{ fontSize: "14px" }}>
                Thông báo gửi lần 2
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <BaseDatePickerForm
                name="send2"
                format="DD/MM/YYYY"
                disabled={!isHighestLevel}
                width="94%"
                endIcon
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: "5px", marginBottom: "5px" }}
      >
        <Grid item xs={6} lg={6}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography style={{ fontSize: "14px" }}>
                Thông báo gửi sở GTVT
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <BaseDatePickerForm
                name="sendGTVT"
                format="DD/MM/YYYY"
                disabled={!isHighestLevel}
                width="94%"
                endIcon
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} lg={6} style={{ paddingLeft: "5px" }}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography style={{ fontSize: "14px" }}>
                Thông báo hoàn lại
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <BaseDatePickerForm
                name="infoReturn"
                format="DD/MM/YYYY"
                disabled={!isHighestLevel}
                width="94%"
                endIcon
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <BaseFormGroup
        label="Ngày giờ hẹn"
        isRequired={true}
        error={errors["appointmentDate"]}
        component={
          <BaseDatePickerForm
            name="appointmentDate"
            format="DD/MM/YYYY"
            disabled={!isHighestLevel}
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
          <TextField
            {...register("infoSactionNote", {
              required: "Vui lòng nhâp chú thích",
            })}
            error={!!errors["infoSactionNote"]}
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
    padding: "10px",
    position: "relative",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    height: "480px",
  },
  inputFeild: {
    height: "32px",
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
