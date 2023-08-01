import React from "react";
import { Box } from "@material-ui/core";
import BaseButton from "../BaseButton";
import { PrintIcon } from "../../Icons";
import DownloadIcon from "@material-ui/icons/GetApp";
import SendIcon from "../../Icons/SendIcon";
import { useStatusEventStyle } from "./styles";

const NoErrorReasonButton = () => {
  const classes = useStatusEventStyle();

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
      </Box>
      <Box className={classes.rightButtons}>
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

export default NoErrorReasonButton;
