import React, { useContext } from "react";
import { Status } from "../utils";
import { DeviceContext } from "./DeviceProvider";
import ModalDeviceStatus from "./modals/ModalDeviceStatus";

const DeviceStatus = ({ data }) => {
  const { state, dispatch } = useContext(DeviceContext);
  const selectStatus = Status[data.status];
  const handleOpenModalDeviceStatus = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalDeviceStatus: true,
      },
    });
  };
  const setChooseDevice = (data) => {
    dispatch({
      type: "CHOOSE_DEVICE",
      chooseDevice: data,
    });
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          handleOpenModalDeviceStatus();
          setChooseDevice(data);
        }}
      >
        <selectStatus.component />
        <p>{selectStatus.label}</p>
      </div>
    </React.Fragment>
  );
};

export default DeviceStatus;
