import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import BaseButton from "../BaseButton";
import SendIcon from "../../Icons/SendIcon";
import { useStatusEventStyle } from "./styles";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";

const SubmitAndResetButton = () => {
  const classes = useStatusEventStyle();

  const { handleResetFormData } = useContext(ListTrafficModalContext);

  return (
    <Box className={classes.root}>
      <Box className={classes.leftButtons}></Box>
      <Box className={classes.rightButtons}>
        <BaseButton
          content="Lưu thông tin"
          typeStyle="borderStyle2"
          type="submit"
          startIcon={<SendIcon color="rgb(221, 61, 75)" />}
          customStyle={{ minWidth: "150px" }}
        />
        <BaseButton
          content="Quay về mặc định"
          typeStyle="border"
          startIcon={<SendIcon color="black" />}
          customStyle={{ minWidth: "150px" }}
          onClick={handleResetFormData}
        />
      </Box>
    </Box>
  );
};

export default SubmitAndResetButton;
