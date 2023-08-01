import { Typography, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SendIcon from "../../Icons/SendIcon";
import BaseButton from "../../component/BaseButton";
import QuestionModal from "../../component/QuestionModal";
import { TrafficContext } from "../../TrafficContent";

const ViolationPendingApproval = () => {
  const { checkedItemList, isHighestLevel } = useContext(TrafficContext);

  const [isOpenConfirErrormModal, setIsOpenConfirmErrorModal] = useState(false);
  const disabled = checkedItemList.length === 0 || !isHighestLevel;

  const handleConfirmError = () => {};

  return (
    <React.Fragment>
      <BaseButton
        content="Gửi duyệt lỗi"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setIsOpenConfirmErrorModal(true);
        }}
        typeStyle="contained"
        startIcon={<SendIcon color={disabled ? "#939393" : "#fff"} />}
      />
      {isOpenConfirErrormModal && (
        <QuestionModal
          title="Xác nhận gửi duyệt lỗi"
          handleClose={() => setIsOpenConfirmErrorModal(false)}
          confirmText="Xác nhận"
          isOpen={isOpenConfirErrormModal}
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

const useStyles = makeStyles({
  btnDropdown: {
    background: "#fff",
    border: "1px solid #939393",
    height: "40px",
    borderRadius: "4px",
    textTransform: "unset",
    cursor: "pointer",
    "& p": {
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#939393",
    },
  },
});

export default ViolationPendingApproval;
