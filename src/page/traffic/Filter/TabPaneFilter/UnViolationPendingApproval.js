import React, { useContext } from "react";
import BaseButton from "../../component/BaseButton";
import { TrafficContext } from "../../TrafficContent";

const UnViolationPendingApproval = () => {
  const { checkedItemList, handleOpenReasonModal, isHighestLevel } =
    useContext(TrafficContext);

  const disabled = checkedItemList.length === 0;

  return (
    <React.Fragment>
      <BaseButton
        content={isHighestLevel ? "Duyệt không lỗi" : "Gửi duyệt không lỗi"}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          handleOpenReasonModal(true);
        }}
        typeStyle="borderStyle2"
        customStyle={{ marginRight: "16px" }}
      />
    </React.Fragment>
  );
};

export default UnViolationPendingApproval;
