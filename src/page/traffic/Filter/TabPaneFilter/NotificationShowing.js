import { Button, Typography, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useContext } from "react";
import { TrafficContext } from "../../TrafficContent";
import { PrintIcon } from "../../Icons";
import { useState } from "react";
import DownloadIcon from "@material-ui/icons/GetApp";
import BaseButton from "../../component/BaseButton";
import { useReactToPrint } from "react-to-print";
import DispatchNote from "../../PrintFiles/DispatchNotePdf/DispatchNotePdf";
import { notificationShowingArr } from "../../../../utils/traffic";
const NotificationShowing = () => {
  const { checkedItemList, handlePrintDispatch, handlePrintNoti } = useContext(TrafficContext);
  const classes = useStyles();


  const handleDownload = () => {};
  return (
    <React.Fragment>
      {notificationShowingArr.map((item, index) => {
        if (item.type === "print") {
          return (
            <BaseButton
              content={item.label}
              disabled={checkedItemList.length === 0}
              onClick={() => {
                if (item.key === "dispatch") {
                  handlePrintDispatch();
                } else if (item.key === "noti") {
                  handlePrintNoti();
                }
              }}
              typeStyle="contained"
              startIcon={
                <PrintIcon
                  color={checkedItemList.length === 0 ? "#939393" : "#fff"}
                />
              }
              customStyle={{ minWidth: "180px" }}
            />
          );
        } else if (item.type === "download") {
          return (
            <BaseButton
              content={item.label}
              disabled={checkedItemList.length === 0}
              onClick={handleDownload}
              typeStyle="contained"
              startIcon={
                <DownloadIcon
                  style={{
                    color: checkedItemList.length === 0 ? "#939393" : "#fff",
                  }}
                />
              }
            />
          );
        }
      })}
      
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
