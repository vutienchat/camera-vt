import { Box, Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import BaseButton from "../component/BaseButton";
import { editServerArr } from "../../../utils/traffic";
import { FormProvider, useForm } from "react-hook-form";
import BaseInputForm from "../component/BaseInputForm";
import BaseFormGroup from "../component/BaseFormGroup";

const EditServerRecordModal = () => {
  const methods = useForm({});
  const {
    register,
    control,
    formState: { errors },
  } = methods;
  const classes = styles();
  return (
    <Box className={classes.root}>
      <FormProvider {...methods}>
        <Box
          style={{
            height: 400,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box>
            {editServerArr.slice(0, 5).map((item) => (
              <Box className={classes.rowWrapper} key={item.key}>
                <Typography className={classes.label}>
                  {item.label}:{" "}
                </Typography>
                <Box>
                  <BaseFormGroup
                    component={
                      <BaseInputForm
                        name={item.label}
                        isNoSpace={true}
                        style={{ width: "350px" }}
                        variant="outlined"
                        size="small"
                      />
                    }
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            {editServerArr.slice(5, 10).map((item) => (
              <Box className={classes.rowWrapper} key={item.key}>
                <Typography className={classes.label}>
                  {item.label}:{" "}
                </Typography>
                <Box>
                  <BaseFormGroup
                    component={
                      <BaseInputForm
                        name={item.label}
                        isNoSpace={true}
                        style={{ width: "350px" }}
                        variant="outlined"
                        size="small"
                      />
                    }
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Divider
          style={{
            width: "1080px",
            height: "1px",
            backgroundColor: "#d3d3d3",
          }}
          variant="middle"
        />
        <Box className={classes.footer} style={{ marginTop: 24 }}>
          <Box style={{ paddingRight: 12 }}>
            <BaseButton content={"Cancel"} typeStyle={"border"} />
          </Box>
          <Box style={{ paddingLeft: 12 }}>
            <BaseButton content={"Save"} typeStyle={"contained"} />
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

const styles = makeStyles({
  root: { width: 1128 },
  label: { width: 150 },
  inputWrapper: {width: 350},
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EditServerRecordModal;
