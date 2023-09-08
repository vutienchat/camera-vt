import { Box, Grid, makeStyles } from "@material-ui/core";

import BaseFormGroup from "../component/BaseFormGroup";
import SelectForm from "../../../component/SelectForm";
import { active, serverArr } from "../../../utils/traffic";
import { FormProvider, useForm } from "react-hook-form";
import BaseSearchForm from "../component/BaseSearchForm";
import BaseButton from "../component/BaseButton";
import SelectMultiple from "../../../component/SelectMultiple";

const StreamingServer001 = ({ isOpen, handleClose }) => {
  const methods = useForm({});
  const {
    register,
    control,
    formState: { errors },
  } = methods;
  const classes = style();

  return (
    <Box className={classes.root}>
      <FormProvider {...methods}>
        <Grid container>
          <Grid item xs={6}>
            <BaseSearchForm placeholder={"Search by device name, device ID"} />
          </Grid>
          <Grid item xs={2}>
            <SelectMultiple 
            placeholderContent={serverArr.placeholderContent}
            list={serverArr.list}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <BaseButton content={"Export Data"} />
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};

const style = makeStyles({
  root: {
    padding: 20,
    width: 1241,
    height: 760,
    borderRadius: 10,
    backgroundColor: "white",
  },
  rowWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default StreamingServer001;
