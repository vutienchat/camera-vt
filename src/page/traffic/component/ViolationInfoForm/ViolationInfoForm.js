import {
  Box,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import BaseFormGroup from "../BaseFormGroup";
import SelectForm from "../../../../component/SelectForm";
import { vehicles } from "../../../../utils/traffic";

const ViolationInfoForm = () => {
  const classes = useSceneInfoFormStyle();
  const methods = useFormContext();

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <Box className={classes.form}>
      <Grid container justifyContent="space-between">
        <Grid item xs={3} lg={3}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <Typography style={{ lineHeight: "10px" }}>
              Chủ phương tiện (*)
            </Typography>
            <Typography>Ngày sinh</Typography>
            <Typography style={{ lineHeight: "10px" }}>CMND/CCCD</Typography>
          </Box>
        </Grid>
        <Grid item xs={9} lg={9} style={{ display: "flex" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              flex: 1,
            }}
          >
            <TextField size="small" variant="outlined" fullWidth />
            <TextField size="small" variant="outlined" fullWidth />
            <TextField size="small" variant="outlined" fullWidth />
          </Box>
          <Box style={{ width: "150px", height: "100%" }}></Box>
        </Grid>
      </Grid>

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
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Địa chỉ chi tiết"
        isRequired={true}
        error={errors["addressDetail"]}
        component={
          <TextField
            {...register("addressDetail", {
              required: "Địa chỉ chi tiết is required",
            })}
            error={!!errors["addressDetail"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Phương tiện"
        isRequired={true}
        error={errors["vehicles"]}
        component={<SelectForm keyForm="vehicles" list={vehicles} />}
      />

      <Typography>Thông tin thông báo xử phạt</Typography>

      <BaseFormGroup
        label="Sô thông báo"
        isRequired={true}
        error={errors["addressDetail"]}
        component={
          <TextField
            {...register("addressDetail", {
              required: "Địa chỉ chi tiết is required",
            })}
            error={!!errors["addressDetail"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <Grid container justifyContent="space-between">
        <Grid item xs={6} lg={6}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography>Thông báo gửi lần 1</Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField variant="outlined" size="small" fullWidth />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} lg={6} style={{ paddingLeft: "5px" }}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography>Thông báo gửi lần 2</Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField variant="outlined" size="small" fullWidth />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item xs={6} lg={6}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography>Thông báo gửi sở GTVT</Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField variant="outlined" size="small" fullWidth />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} lg={6} style={{ paddingLeft: "5px" }}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={6}>
              <Typography>Thông báo hoàn lại</Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField variant="outlined" size="small" fullWidth />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <BaseFormGroup
        label="Ngày giờ hẹn"
        isRequired={true}
        error={errors["time"]}
        component={
          <TextField
            {...register("time", {
              required: "Địa chỉ chi tiết is required",
            })}
            error={!!errors["time"]}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          />
        }
      />

      <BaseFormGroup
        label="Ghi chú"
        isRequired={true}
        error={errors["note"]}
        component={
          <TextField
            {...register("note", {
              required: "Note is required",
            })}
            error={!!errors["addressDetail"]}
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
    gap: "3px",
    border: "3px solid rgba(221, 61, 75, 1)",
    padding: "3px",
    overflowX: "hidden",
  },
});

export default ViolationInfoForm;
