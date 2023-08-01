import React, { useContext } from "react";

import { Box } from "@material-ui/core";
import DownloadIcon from "@material-ui/icons/GetApp";

import { useStatusEventStyle } from "./styles";
import BaseButton from "../BaseButton";
import { PrintIcon } from "../../Icons";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";

const FormattedButtons = () => {
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
          startIcon={<DownloadIcon style={{ color: "#fff" }} />}
          content="Tải xuống"
          typeStyle="contained"
          customStyle={{ minWidth: "150px" }}
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
          startIcon={<PrintIcon color="#fff" />}
          content="In thông báo VP"
          typeStyle="contained"
          customStyle={{ minWidth: "206px" }}
        />
        <BaseButton
          startIcon={<PrintIcon color="#fff" />}
          content="In phiếu gửi"
          typeStyle="contained"
          customStyle={{ minWidth: "150px" }}
        />
      </Box>
    </Box>
  );
};

export default FormattedButtons;
