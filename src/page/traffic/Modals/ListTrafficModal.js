/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {
  useContext,
  createContext,
  memo,
  useMemo,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Box, Modal, Typography, makeStyles } from "@material-ui/core";

import { NextIcon, PreviousIcon } from "../Icons";
import {
  colorStatusErrEvent,
  listSceneTab,
  statusErrEvent,
} from "../../../utils/traffic";
import ViolationInfoForm from "../component/ViolationInfoForm/ViolationInfoForm";
import SceneInfoForm from "../component/SceneInfoForm/SceneInfoForm";
import BaseTabCommon from "../component/BaseTabCommon";
import { TrafficContext } from "../TrafficContent";
import { StatusEventComponent } from "../javacript/common";

export const ListTrafficModalContext = createContext({});

const ListTrafficModal = ({
  isOpen,
  handleClose,
  trafficList,
  setSelectedItem,
  handleOpenHistoryModal,
  handleOpenReasonModal,
}) => {
  const { isHighestLevel, selectedItem } = useContext(TrafficContext);

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      numberPlate: selectedItem.description.licencePlate,
      note: selectedItem.note,
      camName: selectedItem.camName,
      violationError: selectedItem.typeError,
      fineAmount: selectedItem.fineAmount,
      holdGPLX: String(selectedItem.holdGPLX),
      colorPlate: selectedItem.description.colorPlate,
      vehicleType: selectedItem.description.vehicleType,
      direction: selectedItem.description.direction,
      violationDate: selectedItem.violationDate,

      fullName: selectedItem.vehicleOwner.fullName,
      address: selectedItem.vehicleOwner.address,
      cccd: selectedItem.vehicleOwner.cccd,
      phoneNumber: selectedItem.vehicleOwner.phoneNumber,
      birthday: selectedItem.vehicleOwner.birthday,
      infoNumber: selectedItem.infoSanction.infoNumber,
      send1: selectedItem.infoSanction.send1.split(" ")[1],
      send2: selectedItem.infoSanction.send2.split(" ")[1],
      sendGTVT: selectedItem.infoSanction.sendGTVT.split(" ")[1],
      infoReturn: selectedItem.infoSanction.infoReturn.split(" ")[1],
      appointmentDate: selectedItem.infoSanction.appointmentDate.split(" ")[1],
      infoSactionNote: selectedItem.infoSanction.note,
    },
  });

  const classes = useListTrafficModalStyle();

  const [tabPane, setTabPane] = useState(listSceneTab[0].value);

  const itemId = useMemo(() => {
    return trafficList.findIndex((element) => element.id === selectedItem.id);
  }, [trafficList, selectedItem]);

  const plates = useMemo(() => {
    if (!selectedItem.description.licencePlate) return [];

    return selectedItem.description.licencePlate.split("-");
  }, [selectedItem]);

  const handleResetDataForm = (index) => {
    methods.reset({
      numberPlate: trafficList[index].description.licencePlate,
      note: trafficList[index].note,
      camName: trafficList[index].camName,
      violationError: trafficList[index].typeError,
      fineAmount: trafficList[index].fineAmount,
      holdGPLX: String(trafficList[index].holdGPLX),
      colorPlate: trafficList[index].description.colorPlate,
      vehicleType: trafficList[index].description.vehicleType,
      direction: trafficList[index].description.direction,
      violationDate: trafficList[index].violationDate,

      fullName: trafficList[index].vehicleOwner.fullName,
      address: trafficList[index].vehicleOwner.address,
      cccd: trafficList[index].vehicleOwner.cccd,
      phoneNumber: trafficList[index].vehicleOwner.phoneNumber,
      birthday: trafficList[index].vehicleOwner.birthday,
      infoNumber: trafficList[index].infoSanction.infoNumber,
      send1: trafficList[index].infoSanction.send1.split(" ")[1],
      send2: trafficList[index].infoSanction.send2.split(" ")[1],
      sendGTVT: trafficList[index].infoSanction.sendGTVT.split(" ")[1],
      infoReturn: trafficList[index].infoSanction.infoReturn.split(" ")[1],
      appointmentDate:
        trafficList[index].infoSanction.appointmentDate.split(" ")[1],
      infoSactionNote: trafficList[index].infoSanction.note,
    });
  };

  const handlePrevious = () => {
    if (itemId > 0) {
      setSelectedItem(trafficList[itemId - 1]);
      handleResetDataForm(itemId - 1);
    }
  };

  const handleNext = () => {
    if (itemId < trafficList.length) {
      setSelectedItem(trafficList[itemId + 1]);
      handleResetDataForm(itemId + 1);
    } else {
      setSelectedItem(trafficList[0]);
      handleResetDataForm(0);
    }
  };

  const handleChangeTabPane = (value) => {
    setTabPane(value);
  };

  const handleUpdateScene = (data) => {
    console.log(data);
  };

  const data = {
    selectedItem,
    plates,
    isHighestLevel,
    handleOpenHistoryModal,
    handleOpenReasonModal,
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className={classes.root}>
      <FormProvider {...methods}>
        <ListTrafficModalContext.Provider value={data}>
          <form onSubmit={methods.handleSubmit(handleUpdateScene)}>
            <Box className={classes.content}>
              <Box className={classes.header}>
                <Typography className={classes.titlePlace}>
                  {selectedItem.description.licencePlate}
                </Typography>
                <Box
                  className={classes.info}
                  style={{
                    backgroundColor:
                      colorStatusErrEvent[selectedItem.statusEvent]
                        .backgroundColor,
                    padding: "0 30px",
                    height: "32px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    style={{
                      color:
                        colorStatusErrEvent[selectedItem.statusEvent].color,
                      fontWeight: "bold",
                      lineHeight: "normal",
                      letterSpacing: "normal",
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
                  marginTop: "24px",
                }}
              >
                <Box className={classes.infoImage}>
                  <Box>
                    <TransformWrapper>
                      <TransformComponent>
                        <img src="./image.png" alt="Image" />
                      </TransformComponent>
                    </TransformWrapper>
                  </Box>
                  <Box>
                    <TransformWrapper>
                      <TransformComponent>
                        <img src="./image.png" alt="Image" />
                      </TransformComponent>
                    </TransformWrapper>
                  </Box>
                  <Box>
                    <TransformWrapper>
                      <TransformComponent>
                        <img src="./image.png" alt="Image" />
                      </TransformComponent>
                    </TransformWrapper>
                  </Box>
                </Box>
                <Box style={{ width: "49.5%", marginTop: "10px" }}>
                  <video
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      backgroundImage: 'url("./image.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    controls={false}
                    autoPlay
                  >
                    <source src={""} type="video/mp4" />
                  </video>
                </Box>
                <Box style={{ width: "49.5%", marginTop: "10px" }}>
                  <BaseTabCommon
                    width="100%"
                    list={listSceneTab}
                    selectedTab={tabPane}
                    handleChangeSelectedTab={handleChangeTabPane}
                    statusEvent={selectedItem.statusEvent}
                    customStyle={{
                      borderTopRightRadius: "8px",
                      borderTopLeftRadius: "8px",
                    }}
                  />
                  {tabPane === "scence_info" ? (
                    <SceneInfoForm />
                  ) : (
                    <ViolationInfoForm />
                  )}
                </Box>
              </Box>
              {StatusEventComponent(selectedItem.statusEvent)}
              <Box
                className={classes.icon}
                style={{ left: "-90px" }}
                onClick={handlePrevious}
              >
                <PreviousIcon />
              </Box>
              <Box
                className={classes.icon}
                style={{ right: "-90px" }}
                onClick={handleNext}
              >
                <NextIcon />
              </Box>
            </Box>
          </form>
        </ListTrafficModalContext.Provider>
      </FormProvider>
    </Modal>
  );
};

const useListTrafficModalStyle = makeStyles({
  root: { padding: "0px" },
  content: {
    position: "absolute",
    padding: "24px",
    width: "1420px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "10px",
  },

  titlePlace: {
    fontSize: "21px",
    fontWeight: "bold",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    alignItems: "center",
  },
  infoImage: {
    width: "100%",
    display: "flex",
    gap: "14px",
    marginBottom: "8px",
    "& img": { width: "100%", objectFit: "cover", cursor: "move" },
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
