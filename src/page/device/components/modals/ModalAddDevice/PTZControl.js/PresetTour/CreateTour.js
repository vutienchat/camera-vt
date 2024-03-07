import { Box, TextField } from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { SaveIcon } from "../../../../../Icon";

const CreateTour = React.memo(() => {
  return (
    <Box style={{ width: "100%" }}>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <TextField />
        <AddIcon />
        <SaveIcon />
        <DeleteOutlineIcon />
      </Box>
    </Box>
  );
});

export default CreateTour;
