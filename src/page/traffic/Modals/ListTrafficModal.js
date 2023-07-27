/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo, useMemo, useState } from "react";
import { Box, Button, Modal, Typography, makeStyles } from "@material-ui/core";
import { NextIcon, PreviousIcon, PrintIcon } from "../Icons";
import {
  colorStatusErrEvent,
  listSceneTab,
  statusErrEvent,
} from "../../../utils/traffic";
import ViolationInfoForm from "../component/ViolationInfoForm/ViolationInfoForm";
import SceneInfoForm from "../component/SceneInfoForm/SceneInfoForm";
import DownloadIcon from "@material-ui/icons/GetApp";
import BaseTabCommon from "../component/BaseTabCommon";
import SendIcon from "../Icons/SendIcon";
import { FormProvider, useForm } from "react-hook-form";

const ListTrafficModal = ({
  isOpen,
  handleClose,
  trafficList,
  selectedItem,
  setSeletedItem,
  handleOpenViolationModal,
  handleOpenHistoryModal,
  handleOpenReasonModal,
}) => {
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit } = methods;

  const classes = useListTrafficModalStyle();
  const [tabPane, setTabPane] = useState(listSceneTab[0].value);

  const itemId = useMemo(() => {
    return trafficList.findIndex((element) => element.id === selectedItem.id);
  }, [trafficList, selectedItem]);

  const handlePrevious = () => {
    if (itemId > 0) {
      setSeletedItem(trafficList[itemId - 1]);
    }
  };

  const handleNext = () => {
    if (itemId < trafficList.length) {
      setSeletedItem(trafficList[itemId + 1]);
    }
  };

  const handleChangeTabPane = (value) => {
    setTabPane(value);
  };

  const handleUpdateScene = (data) => {
    console.log(data);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className={classes.root}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleUpdateScene)}>
          <Box className={classes.content}>
            <Box className={classes.header}>
              <Typography style={{ fontWeight: 700, fontSize: 18 }}>
                {selectedItem.description.licencePlate}
              </Typography>
              <Box
                className={classes.info}
                style={{
                  backgroundColor:
                    colorStatusErrEvent[selectedItem.statusEvent]
                      .backgroundColor,
                  width: "fit-content",
                  padding: "1px 8px 1px 8px",
                  borderRadius: "4px",
                }}
              >
                <Box
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "100px",
                    backgroundColor:
                      colorStatusErrEvent[selectedItem.statusEvent].color,
                  }}
                ></Box>
                <Typography
                  style={{
                    color: colorStatusErrEvent[selectedItem.statusEvent].color,
                  }}
                >
                  {statusErrEvent[selectedItem.statusEvent]}
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              <Box style={{ width: "33%" }}>
                <img
                  src="./image.png"
                  alt="Image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box style={{ width: "33%" }}>
                <img
                  src="./image.png"
                  alt="Image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box style={{ width: "33%" }}>
                <img
                  src="./image.png"
                  alt="Image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box style={{ width: "49.5%" }}>
                <img
                  src="./image.png"
                  alt="Image"
                  style={{ width: "100%", objectFit: "cover", height: "100%" }}
                />
              </Box>
              <Box style={{ width: "49.5%" }}>
                <BaseTabCommon
                  width="100%"
                  list={listSceneTab}
                  selectedTab={tabPane}
                  handleChangeSelectedTab={handleChangeTabPane}
                />
                {tabPane === "scence_info" ? (
                  <SceneInfoForm />
                ) : (
                  <ViolationInfoForm />
                )}
              </Box>
            </Box>
            <Box
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <Button
                  className={classes.btnContent}
                  startIcon={<PrintIcon />}
                  variant="outlined"
                  onClick={handleOpenViolationModal}
                >
                  <Typography>In hình ảnh vi phạm</Typography>
                </Button>
                <Button
                  className={classes.btnContent}
                  startIcon={
                    <DownloadIcon style={{ color: "rgba(221, 61, 75, 1)" }} />
                  }
                  variant="outlined"
                >
                  <Typography>Tải xuống</Typography>
                </Button>
                <Typography
                  component="div"
                  style={{
                    textDecoration: "underline",
                    fontSize: 12,
                    color: "rgba(221, 61, 75, 1)",
                    fontStyle: "italic",
                  }}
                  onClick={handleOpenHistoryModal}
                >
                  Lịch sử vi phạm
                </Typography>
                <Button
                  className={classes.btnContentType}
                  variant="outlined"
                  onClick={handleOpenReasonModal}
                >
                  <Typography>Chuyển không lỗi</Typography>
                </Button>
              </Box>
              <Box>
                <Button
                  className={classes.btnContentContained}
                  startIcon={<SendIcon />}
                  variant="contained"
                  type="submit"
                >
                  <Typography>Gửi duyệt định dạng</Typography>
                </Button>
              </Box>
            </Box>
            <Box
              className={classes.icon}
              style={{
                left: "-70px",
              }}
              onClick={handlePrevious}
            >
              <PreviousIcon />
            </Box>
            <Box
              className={classes.icon}
              style={{
                right: "-70px",
              }}
              onClick={handleNext}
            >
              <NextIcon />
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Modal>
  );
};

const useListTrafficModalStyle = makeStyles({
  content: {
    position: "absolute",
    padding: "10px",
    width: "1450px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
  },
  info: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& p": {
      lineHeight: "21.4px",
    },
  },
  btnContent: {
    border: "1px solid rgba(221, 61, 75, 1)",
    "& p": {
      color: "rgba(221, 61, 75, 1)",
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  btnContentType: {
    border: "1px solid rgba(24, 106, 59, 1)",
    "& p": {
      color: "rgba(24, 106, 59, 1)",
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  btnContentContained: {
    boxShadow: "none",
    backgroundColor: "rgba(221, 61, 75, 1)",
    "& p": {
      color: "#fff",
      textTransform: "none",
      fontWeight: "bold",
    },
  },
});

export default memo(ListTrafficModal);
