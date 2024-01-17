import React from "react";
import DeviceContainer from "./components/DeviceContainer";
import DeviceProvider from "./components/DeviceProvider";
import Reducer from "./reducers";
import ModalDeleteDevice from "./modal/ModalDeleteDevice";
import ModalImport from "./modal/ModalImport";

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
      {state.openModal.openModalImport && <ModalImport/>}
    </DeviceProvider>
  );
};

export default Device;
