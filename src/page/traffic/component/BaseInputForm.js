import { TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { validateText } from "../javacript/common";
import {
  SPECIAL_CHARACTER,
  SPECIAL_CHARACTER_NUMBER,
  SPECIAL_CHARACTER_TEXT,
} from "../../../utils/traffic";

const BaseInputForm = ({
  name,
  isNoSpace = false,
  typeInput = "text",
  ...props
}) => {
  const { control } = useFormContext();
  let regex = SPECIAL_CHARACTER_TEXT;

  if (typeInput === "number") {
    regex = SPECIAL_CHARACTER_NUMBER;
  } else if (typeInput === "normal") {
    regex = SPECIAL_CHARACTER;
  }

  return (
    <Controller
      control={control}
      key={name}
      name={name}
      render={({ field }) => {
        const { onChange, value, ref } = field;
        return (
          <TextField
            {...props}
            value={value}
            onChange={(event) => {
              if (!regex.test(event.target.value)) {
                onChange(validateText(event.target.value, isNoSpace));
              }
            }}
            onKeyDown={(event) => {
              if (regex.test(event.target.value)) {
                event.preventDefault();
              }
            }}
            inputRef={ref}
          />
        );
      }}
    />
  );
};

export default BaseInputForm;
