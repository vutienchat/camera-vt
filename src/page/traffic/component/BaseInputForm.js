import { TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

const BaseInputForm = ({ name }) => {
  const { control } = useFormContext();

  return <Controller control={control} render={() => <TextField />} />;
};

export default BaseInputForm;
