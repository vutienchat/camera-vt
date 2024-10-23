import React, { useEffect } from "react";
import * as yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import FormGroup from "@material-ui/core/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { useForm } from "react-hook-form";

import FormLabel from "../FormLabel";
import Form from "../../../../component/Form";
import BaseButton from "../../../device/components/BaseButton";
import FormTextField from "../../../../component/liveView/Form/FormTextField";
import FormSelect from "../../../../component/liveView/Form/FormSelect";

const schema = yup.object().shape({
  holidayName: yup.string().required().default(""),
  HolidayDate: yup.string().required().default(""),
});

const useStyles = makeStyles((theme) => ({
  formGroup: {
    "& + &": {
      marginTop: 24,
    },
  },
}));

const generateTimeOptions = () => {
  const times = [];
  let hour = 0;
  let minute = 30;

  while (hour < 24 || (hour === 23 && minute <= 30)) {
    const timeLabel = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    times.push(timeLabel);
    minute += 30;
    if (minute >= 60) {
      minute = 0;
      hour += 1;
    }
  }

  return times;
};

const ModalHolidays = (props) => {
  const classes = useStyles();
  const { onClose, open, initialDataEdit } = props;
  const form = useForm({
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleSubmit = (data) => console.log(data);

  const handleClose = () => {
    onClose();
    form.reset(schema.getDefault());
  };

  useEffect(() => {
    if (!initialDataEdit) return;
    form.reset(initialDataEdit);
  }, [initialDataEdit, form]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
    >
      <Box
        sx={{
          width: 687,
          padding: "23px  32px 32px",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ paddingBottom: 32 }}>
          <Typography
            style={{ textAlign: "center", fontSize: 21, fontWeight: "bold" }}
          >
            {initialDataEdit ? "Edit Holiday" : "Add Holiday"}
          </Typography>
          <IconButton
            size="small"
            style={{ position: "absolute", top: 16, right: 16 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Form form={form} onFinish={handleSubmit}>
          <FormSelect
            name="startTime"
            label="Start Time"
            options={generateTimeOptions()}
            renderLabel={(option) => option}
            renderValue={(option) => option}
            variant="outlined"
            required
          />

          <FormGroup className={classes.formGroup}>
            <FormLabel
              name="holidayName"
              required
              title="Holiday Name"
            ></FormLabel>
            <FormTextField name="holidayName" variant="outlined" fullWidth />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <FormLabel
              name="HolidayDate"
              required
              title="Holiday Date"
            ></FormLabel>
            <FormTextField name="HolidayDate" variant="outlined" fullWidth />
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              marginTop: 32,
            }}
          >
            <BaseButton
              label={"Cancel"}
              type={"normal"}
              onClick={handleClose}
            />
            <BaseButton
              submitType="submit"
              label={"Submit"}
              type={"redBackground"}
            />
          </Box>
        </Form>
      </Box>
    </Dialog>
  );
};

export default ModalHolidays;
