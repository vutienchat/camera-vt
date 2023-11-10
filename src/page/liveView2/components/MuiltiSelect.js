import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckIcon from "@mui/icons-material/Check";
import { MenuItem } from "@material-ui/core";
const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];
export default function MultiSelect() {
  return (
    <Autocomplete
      sx={{ m: 1, width: 500 }}
      multiple
      options={names}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Multiple Autocomplete"
          placeholder="Multiple Autocomplete"
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: "space-between" }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
}
