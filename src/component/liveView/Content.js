import { Box } from "@material-ui/core";
import React from "react";
const Content = () => {
  return (
    <React.Fragment>
      <Box style={{ width: "-webkit-fill-available" }}>H1</Box>
    </React.Fragment>
  );
};

export default React.memo(Content);
