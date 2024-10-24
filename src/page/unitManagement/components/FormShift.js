import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import InputAdornment from "@material-ui/core/InputAdornment";

import TimeIcon from "../icons/TimeIcon";
import FormSelect from "../../../component/liveView/Form/FormSelect";
import FormLabel from "./FormLabel";
import FormTextField from "../../../component/liveView/Form/FormTextField";
import BaseButton from "../../device/components/BaseButton";
import Form from "../../../component/Form";

const schema = yup.object().shape({
  shiftName: yup.string().required().default(""),
  startTime: yup.string().required().default(""),
  endTime: yup
    .string()
    .required()
    .default("")
    .test("is-greater", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      if (value && startTime) {
        // Chuyển đổi thời gian thành phút
        const startMinutes =
          parseInt(startTime.split(":")[0]) * 60 +
          parseInt(startTime.split(":")[1]);
        const endMinutes =
          parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1]);
        return endMinutes > startMinutes; // Kiểm tra endTime có lớn hơn startTime không
      }
      return true; // Nếu không có giá trị, không kiểm tra
    }),
  breakTime: yup
    .string()
    .default("")
    .required("Trường này là bắt buộc") // Kiểm tra bắt buộc
    .matches(/^[1-9]\d*$/, "Chỉ cho phép số nguyên dương") // Chỉ cho phép số nguyên dương
    .max(255, "Độ dài tối đa là 255 ký tự"), // Giới hạn độ dài tối đa
});

const generateTimeOptions = () => {
  const times = [];
  let hour = 0;
  let minute = 0;

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

const useStyles = makeStyles((theme) => ({
  formGroup: {
    "& + &": {
      marginTop: 24,
    },
  },
}));

const FormShift = () => {
  const classes = useStyles();
  const form = useForm({
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleSubmit = (data) => console.log(data);
  const handleClose = () => {
    form.reset(schema.getDefault());
  };

  return (
    <Box>
      <Box
        sx={{
          width: 553,
          margin: "0 auto",
          marginTop: 26,
          borderRadius: 8,
          border: "1.5px solid #D3D3D3",
          padding: "24px 24px 32px 24px",
          height: "auto",
          boxSizing: "border-box",
        }}
      >
        <Form form={form} onFinish={handleSubmit}>
          <FormGroup className={classes.formGroup}>
            <FormLabel name="shiftName" required title="Shift name"></FormLabel>
            <FormTextField name="shiftName" variant="outlined" fullWidth />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <FormSelect
              name="startTime"
              label="Start time"
              options={generateTimeOptions()}
              renderLabel={(option) => option}
              renderValue={(option) => option}
              required
              IconComponent={TimeIcon}
              onSelect={() => {
                form.trigger("endTime");
              }}
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <FormSelect
              name="endTime"
              label="End time"
              options={generateTimeOptions()}
              renderLabel={(option) => option}
              renderValue={(option) => option}
              required
              IconComponent={TimeIcon}
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <FormLabel name="breakTime" required title="Break time"></FormLabel>
            <FormTextField
              name="breakTime"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Mn(s)</InputAdornment>
                ),
              }}
            />
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
    </Box>
  );
};

export default FormShift;
