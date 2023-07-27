import { Button, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { TrafficContext } from "../../TrafficContent";
import { PrintIcon } from "../../Icons";
import { useState } from "react";
import DownloadIcon from "@material-ui/icons/GetApp";
import QuestionModal from "../../../../common/QuestionModal";
import CustomModal from "../../../../common/CustomModal";
import { PDFViewer } from "@react-pdf/renderer";
import DispatchNote from "../../Files/DispatchNotePdf/DispatchNotePdf";
import ViolationNotificationPdf from "../../Files/ViolationNotificationPdf/ViolationNotificationPdf";

const NotificationShowing = () => {
  const classes = useStyles();
  const { checkedItemList } = useContext(TrafficContext);

  const [isOpenNotiPrintModal, setIsOpenNotiPrintModal] = useState(false);
  const [isOpenSendModal, setIsOpenSendModal] = useState(false);

  const handlePrintNotification = () => {};

  const handlePrintInfo = () => {};

  return (
    <React.Fragment>
      <Button
        className={classes.btnDropdown}
        variant="contained"
        style={{
          backgroundColor: "rgba(221, 61, 75, 1)",
          minWidth: 180,
          opacity: checkedItemList.length === 0 ? "0.3" : "1",
        }}
        startIcon={<PrintIcon color="white" />}
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenNotiPrintModal(true);
        }}
      >
        <Typography
          style={{
            fontWeight: 700,
            color: "#fff",
          }}
        >
          In thông báo VP
        </Typography>
      </Button>
      <Button
        className={classes.btnDropdown}
        variant="outlined"
        style={{
          border: "1px solid rgba(221, 61, 75, 1)",
          minWidth: 180,
          opacity: checkedItemList.length === 0 ? "0.3" : "1",
        }}
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenSendModal(true);
        }}
        startIcon={<PrintIcon />}
      >
        <Typography
          style={{
            color: "rgba(221, 61, 75, 1)",
            fontWeight: 700,
          }}
        >
          In phiếu gửi
        </Typography>
      </Button>
      <Button
        className={classes.btnDropdown}
        variant="outlined"
        style={{
          border: "1px solid rgba(221, 61, 75, 1)",
          minWidth: 150,
          opacity: checkedItemList.length === 0 ? "0.3" : "1",
        }}
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenSendModal(true);
        }}
        startIcon={<DownloadIcon style={{ color: "rgba(221, 61, 75, 1)" }} />}
      >
        <Typography
          style={{
            color: "rgba(221, 61, 75, 1)",
            fontWeight: 700,
          }}
        >
          Tải xuống
        </Typography>
      </Button>
      {isOpenNotiPrintModal && (
        <CustomModal
          title="Xác nhận in thông báo vi phạm"
          handleClose={() => setIsOpenNotiPrintModal(false)}
          isOpen={isOpenNotiPrintModal}
        >
          <PDFViewer style={{ width: 700, height: 700 }} showToolbar={true}>
            <ViolationNotificationPdf checkedItemList={checkedItemList} />
          </PDFViewer>
        </CustomModal>
      )}
      {isOpenSendModal && (
        <CustomModal
          title="Xác nhận phiếu gửi"
          handleClose={() => setIsOpenSendModal(false)}
          isOpen={isOpenSendModal}
        >
          <PDFViewer style={{ width: 700, height: 700 }} showToolbar={true}>
            <DispatchNote checkedItemList={checkedItemList} />
          </PDFViewer>
        </CustomModal>
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

export default NotificationShowing;
