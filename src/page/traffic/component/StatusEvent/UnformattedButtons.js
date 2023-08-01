import React, { useContext } from "react";
import { Box } from "@material-ui/core";

import BaseButton from "../BaseButton";
import { PrintIcon } from "../../Icons";
import SendIcon from "../../Icons/SendIcon";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";
import { useStatusEventStyle } from "./styles";

const UnformattedButtons = () => {
  const classes = useStatusEventStyle();
  const { handleOpenHistoryModal, handleOpenReasonModal } = useContext(
    ListTrafficModalContext
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.leftButtons}>
        <BaseButton
          startIcon={<PrintIcon color="#fff" />}
          content="In hình ảnh vi phạm"
          typeStyle="contained"
          customStyle={{ minWidth: "206px" }}
        />
        <BaseButton
          content="Lịch sử vi phạm"
          typeStyle="simple"
          customStyle={{ minWidth: "150px" }}
          onClick={handleOpenHistoryModal}
        />
      </Box>
      <Box className={classes.rightButtons}>
        <BaseButton
          content="Chuyển không lỗi"
          customStyle={{ minWidth: "150px" }}
          onClick={handleOpenReasonModal}
        />
        <BaseButton
          content="Gửi duyệt lỗi"
          typeStyle="contained"
          type="submit"
          startIcon={<SendIcon color="#fff" />}
          customStyle={{ minWidth: "150px" }}
        />
      </Box>
    </Box>
  );
};

export default UnformattedButtons;
