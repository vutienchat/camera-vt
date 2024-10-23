import { FormGroup, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { Fragment } from "react";

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

const FormSelectTimeRange30Minutes = () => {
  const [selectedTime, setSelectedTime] = React.useState("");

  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <FormGroup>
      <InputLabel id="time-select-label">Select Time</InputLabel>
      <Select
        labelId="time-select-label"
        value={selectedTime}
        onChange={handleChange}
        label="Select Time"
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          getContentAnchorEl: null,
        }}
      >
        {generateTimeOptions().map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
    </FormGroup>
  );
};

export default FormSelectTimeRange30Minutes;
