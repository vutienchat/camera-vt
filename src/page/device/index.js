import React from "react";
import DeviceContainer from "./components/DeviceContainer";
import DeviceProvider from "./components/DeviceProvider";
import Reducer from "./reducers";
import ModalDeleteDevice from "./modal/ModalDeleteDevice";

const Device = () => {
  const { state, dispatch } = Reducer();
  const value = {
    state,
    dispatch,
  };
  return (
    <DeviceProvider value={value}>
      <DeviceContainer />
      {state.openModal.openModalDelete && <ModalDeleteDevice />}
    </DeviceProvider>
  );
};

export default Device;
