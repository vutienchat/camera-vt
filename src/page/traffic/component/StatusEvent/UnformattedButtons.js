import React, { useContext } from "react";
import { Box } from "@material-ui/core";

import BaseButton from "../BaseButton";
import { PrintIcon } from "../../Icons";
import SendIcon from "../../Icons/SendIcon";
import { ListTrafficModalContext } from "../../Modals/ListTrafficModal";
import { useStatusEventStyle } from "./styles";
import { TrafficContext } from "../../TrafficContent";

const UnformattedButtons = ({ status }) => {
  const classes = useStatusEventStyle();
  const {
    handleOpenHistoryModal,
    handleOpenReasonModal,
    handleUpdateStatusTrafficModal,
    handlePrintViolationImg
  } = useContext(ListTrafficModalContext);
  const { isHighestLevel } = useContext(TrafficContext);

  const onUpdateStatusTraffic = (status) => {
    handleUpdateStatusTrafficModal(status);
  };

  return (
    <Box
      className={classes.root}
      style={{ justifyContent: status === "VP" ? "space-between" : "unset" }}
    >
      <Box className={classes.leftButtons}>
        <BaseButton
          startIcon={<PrintIcon color="#fff" />}
          content="In hình ảnh vi phạm"
          typeStyle="contained"
          customStyle={{ minWidth: "206px" }}
          onClick={handlePrintViolationImg}
        />
        <BaseButton
          content="Lịch sử vi phạm"
          typeStyle="simple"
          customStyle={{ minWidth: "150px" }}
          onClick={handleOpenHistoryModal}
        />
      </Box>
      {status === "VP" && (
        <Box className={classes.rightButtons}>
          <BaseButton
            content="Chuyển không lỗi"
            customStyle={{ minWidth: "150px" }}
            onClick={() => handleOpenReasonModal(false)}
          />
          <BaseButton
            content="Gửi duyệt lỗi"
            typeStyle="contained"
            onClick={() =>
              onUpdateStatusTraffic(isHighestLevel ? "CDD" : "CDVP")
            }
            startIcon={<SendIcon color="#fff" />}
            customStyle={{ minWidth: "150px" }}
          />
        </Box>
      )}
      {status === "CDVP" && isHighestLevel && (
        <Box className={classes.rightButtons} style={{ width: "100%" }}>
          <BaseButton
            content="Duyệt không lỗi"
            customStyle={{
              minWidth: "150px",
              marginRight: "auto",
              marginLeft: "16px",
            }}
            onClick={() => handleOpenReasonModal(false)}
          />
          <BaseButton
            content="Duyệt lỗi"
            typeStyle="contained"
            startIcon={<SendIcon color="#fff" />}
            customStyle={{ minWidth: "150px" }}
            onClick={() => onUpdateStatusTraffic("CDD")}
          />
        </Box>
      )}
      {status === "CDKVP" && isHighestLevel && (
        <Box className={classes.rightButtons} style={{ width: "100%" }}>
          <BaseButton
            content="Duyệt lỗi"
            typeStyle="contained"
            startIcon={<SendIcon color="#fff" />}
            customStyle={{
              minWidth: "150px",
              marginRight: "auto",
              marginLeft: "16px",
            }}
            onClick={() => onUpdateStatusTraffic("CDD")}
          />
          <BaseButton
            content="Duyệt không lỗi"
            customStyle={{ minWidth: "150px" }}
            onClick={() => onUpdateStatusTraffic("KVP")}
          />
        </Box>
      )}
      {(status === "CDD" || status === "CDDD") && (
        <Box className={classes.rightButtons} style={{ width: "100%" }}>
          {isHighestLevel ? (
            <BaseButton
              content={"Chuyển không lỗi"}
              customStyle={{
                minWidth: "150px",
                marginRight: "auto",
                marginLeft: "16px",
              }}
              onClick={() => onUpdateStatusTraffic("KVP")}
            />
          ) : (
            <Box style={{ marginRight: "auto" }} />
          )}
          {isHighestLevel && status === "CDDD" && (
            <BaseButton
              content={"Từ chối định danh"}
              typeStyle="border"
              customStyle={{ minWidth: "150px" }}
              onClick={() => onUpdateStatusTraffic("CDD")}
            />
          )}
          <BaseButton
            content={isHighestLevel ? "Duyệt định danh" : "Gửi duyệt định danh"}
            typeStyle="contained"
            startIcon={<SendIcon color="#fff" />}
            customStyle={{ minWidth: "150px" }}
            onClick={() =>
              onUpdateStatusTraffic(isHighestLevel ? "DDD" : "CDDD")
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default UnformattedButtons;
