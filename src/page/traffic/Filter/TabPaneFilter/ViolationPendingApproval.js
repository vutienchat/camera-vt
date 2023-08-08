import { Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SendIcon from "../../Icons/SendIcon";
import BaseButton from "../../component/BaseButton";
import QuestionModal from "../../component/QuestionModal";
import { TrafficContext } from "../../TrafficContent";
import { convertToAbbreviation } from "../../../../utils/traffic";
import extendedDayJs from "../../../../utils/dayjs";

const ViolationPendingApproval = () => {
  const { checkedItemList, handleUpdateStatusTraffic, isHighestLevel } =
    useContext(TrafficContext);

  const [isOpenConfirmErrorModal, setIsOpenConfirmErrorModal] = useState(false);
  const disabled = checkedItemList.length === 0;

  const handleConfirmError = () => {
    const label1 = `dieuhanh_${convertToAbbreviation(
      "Phạm Ngọc Mai Lâm"
    )} - ${extendedDayJs(new Date()).format("HH:mm:ss DD/MM/YYYY")}`;

    handleUpdateStatusTraffic(
      checkedItemList.map((trafficItem) => {
        const { id, label2, typeNotError } = trafficItem;
        return {
          id,
          label2,
          typeNotError,
          statusEvent: "CDVP",
          label1,
        };
      })
    );
  };

  return (
    <React.Fragment>
      <BaseButton
        content={isHighestLevel ? "Duyệt lỗi" : "Gửi duyệt lỗi"}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setIsOpenConfirmErrorModal(true);
        }}
        typeStyle="contained"
        startIcon={<SendIcon color={disabled ? "#939393" : "#fff"} />}
      />
      {isOpenConfirmErrorModal && (
        <QuestionModal
          title="Xác nhận gửi duyệt lỗi"
          handleClose={() => setIsOpenConfirmErrorModal(false)}
          confirmText="Xác nhận"
          isOpen={isOpenConfirmErrorModal}
          handleConfirm={handleConfirmError}
        >
          <Typography style={{ textAlign: "center" }}>
            Bạn chắc chắn muốn gửi duyệt lỗi các vi phạm này?
          </Typography>
        </QuestionModal>
      )}
    </React.Fragment>
  );
};

export default ViolationPendingApproval;
