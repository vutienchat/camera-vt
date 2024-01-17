import React from "react";
import DeviceContainer from "./components/DeviceContainer";
import DeviceProvider from "./components/DeviceProvider";
import Reducer from "./reducers";
import ModalDeleteDevice from "./components/modals/ModalDeleteDevice";
import ModalImport from "./components/modals/ModalImport";

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
