import { Button, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { TrafficContext } from "../../TrafficContent";
import { PrintIcon } from "../../Icons";
import { useState } from "react";
import DownloadIcon from "@material-ui/icons/GetApp";
import CustomModal from "../../component/CustomModal";
import { PDFViewer } from "@react-pdf/renderer";
import DispatchNote from "../../Files/DispatchNotePdf/DispatchNotePdf";
import ViolationNotificationPdf from "../../Files/ViolationNotificationPdf/ViolationNotificationPdf";
import BaseButton from "../../component/BaseButton";

const NotificationShowing = () => {
  const classes = useStyles();
  const { checkedItemList } = useContext(TrafficContext);

  const [isOpenNotiPrintModal, setIsOpenNotiPrintModal] = useState(false);
  const [isOpenSendModal, setIsOpenSendModal] = useState(false);

  const handlePrintNotification = () => {};

  const handlePrintInfo = () => {};

  return (
    <React.Fragment>
      <BaseButton
        content="In thông báo VP"
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenNotiPrintModal(true);
        }}
        typeStyle="contained"
        startIcon={
          <PrintIcon
            color={checkedItemList.length === 0 ? "#939393" : "#fff"}
          />
        }
        customStyle={{ minWidth: "180px" }}
      />
      <BaseButton
        content="In phiếu gửi"
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenSendModal(true);
        }}
        typeStyle="contained"
        startIcon={
          <PrintIcon
            color={checkedItemList.length === 0 ? "#939393" : "#fff"}
          />
        }
      />
      <BaseButton
        content="Tải xuống"
        disabled={checkedItemList.length === 0}
        onClick={() => {
          if (checkedItemList.length === 0) return;
          setIsOpenSendModal(true);
        }}
        typeStyle="contained"
        startIcon={
          <DownloadIcon
            style={{
              color: checkedItemList.length === 0 ? "#939393" : "#fff",
            }}
          />
        }
      />
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
