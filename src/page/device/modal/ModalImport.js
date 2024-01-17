import React from "react";
import { Box, Dialog, Typography, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import TrashIconImportModal from "../Icon/TrashIconImportModal";
import UploadIcon from "../Icon/UploadIcon";
import { DeviceContext } from "../components/DeviceProvider";
import BaseButton from "../components/BaseButton";
const ModalImport = () => {
  const classes = useSettingStyle();
  const { state, dispatch } = useContext(DeviceContext);
  const handleCloseImportModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalImport: false,
      },
    });
  };
  console.log("hell", state.openModal.openModalImport);
  return (
    <Dialog
      open={state.openModal.openModalImport}
      onClose={handleCloseImportModal}
      aria-labelledby="draggable-dialog-title"
      className={classes.dialog}
    >
      <Box className={classes.root}>
        <Typography
          className={classes.text}
          style={{
            fontWeight: 700,
            textAlign: "center",
            flex: 1,
            lineHeight: "30.8px",
            fontSize: 22,
          }}
        >
          Import Devices
        </Typography>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginInline: "24px",
            border: "1px dashed rgba(56, 78, 183, 0.3)",
            height: 202,
            borderRadius: 4,
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <UploadIcon />
            <Typography className={classes.text} style={{ paddingTop: 20 }}>
              Drag & Drop File or{" "}
              <span style={{ color: "rgba(221, 61, 75, 1)", paddingRight: 5 }}>
                Browse ...
              </span>
            </Typography>
          </Box>
          <Typography
            className={classes.text}
            style={{
              paddingTop: 10,
              fontWeight: 400,
              fontSize: 12,
              color: "rgba(103, 103, 103, 1)",
              fontStyle: "italic",
            }}
          >
            Download:{" "}
            <span
              style={{
                color: "rgba(0, 71, 255, 1)",
                fontWeight: 500,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Import_Template.xlsx
            </span>
          </Typography>
        </Box>
        <Box
          style={{
            width: "96%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid rgba(206, 206, 206, 1)",
            borderRadius: 4,
            padding: "5px 10px",
          }}
        >
          <Typography>image-name-goes-here.xlsx</Typography>
          <Box
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 243, 243, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <TrashIconImportModal />
          </Box>
        </Box>
        <BaseButton label={"Import"} type={"redBackground"} width={"100%"} />
      </Box>
    </Dialog>
  );
};

const useSettingStyle = makeStyles({
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      width: 500,
    },
  },
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 18,
    borderRadius: 12,
    padding: "20px 30px",
  },
  text: {
    // fontFamily: "FS Magistral",
    fontSize: 16,
    textAlign: "center",
    fontWeight: 700,
    lineHeight: "24px",
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    padding: " 0px 16px 0px 16px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(221, 61, 75, 1)",
    textTransform: "none",
    "& .MuiButton-label": {
      gap: 16,
    },
  },
});
export default ModalImport;
