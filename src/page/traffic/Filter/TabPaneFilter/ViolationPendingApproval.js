import { Button, Typography, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { TrafficContext } from "../../TrafficContent";
import SendIcon from "../../Icons/SendIcon";
import QuestionModal from "../../../../common/QuestionModal";

const ViolationPendingApproval = () => {
  const classes = useStyles();
  const { checkedItemList, setIsOpenReasonsModal } = useContext(TrafficContext);

  const [isOpenConfirErrormModal, setIsOpenConfirmErrorModal] = useState(false);

  const handleConfirmError = () => {};

  return (
    <React.Fragment>
      <Button
        className={classes.btnDropdown}
        variant="outlined"
        style={{
          border: "1px solid rgba(24, 106, 59, 1)",
          minWidth: 220,
          opacity: checkedItemList.length === 0 ? "0.3" : "1",
        }}
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenReasonsModal(true);
        }}
      >
        <Typography
          style={{
            color: "rgba(24, 106, 59, 1)",
            fontWeight: 700,
          }}
        >
          Gửi duyệt không lỗi
        </Typography>
      </Button>
      <Button
        className={classes.btnDropdown}
        variant="contained"
        style={{
          backgroundColor: "rgba(221, 61, 75, 1)",
          minWidth: 180,
          opacity: checkedItemList.length === 0 ? "0.3" : "1",
        }}
        startIcon={<SendIcon />}
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenConfirmErrorModal(true);
        }}
      >
        <Typography
          style={{
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Gửi duyệt lỗi
        </Typography>
      </Button>
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
