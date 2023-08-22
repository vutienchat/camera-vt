import React from "react";
import { Box } from "@material-ui/core";
import BaseButton from "../BaseButton";
import SendIcon from "../../Icons/SendIcon";
import { useStatusEventStyle } from "./styles";

const SubmitAndResetButton = () => {
  const classes = useStatusEventStyle();

  return (
    <Box className={classes.root}>
      <Box className={classes.leftButtons}></Box>
      <Box className={classes.rightButtons}>
        <BaseButton
          content="Lưu thông tin"
          typeStyle="borderStyle2"
          startIcon={<SendIcon color="rgb(221, 61, 75)" />}
          customStyle={{ minWidth: "150px" }}
        />
        <BaseButton
          content="Quay về mặc định"
          typeStyle="border"
          startIcon={<SendIcon color="black" />}
          type="submit"
          customStyle={{ minWidth: "150px" }}
        />
      </Box>
    </Box>
  );
};

export default SubmitAndResetButton;
