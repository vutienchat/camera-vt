import { Box } from "@material-ui/core";
import React from "react";
const Content = () => {
  return (
    <React.Fragment>
      <Box style={{ width: "80%" }}>H1</Box>
    </React.Fragment>
  );
};

export default React.memo(Content);
