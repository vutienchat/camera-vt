import React from "react";
import DeviceContainer from "./components/DeviceContainer";
import DeviceProvider from "./components/DeviceProvider";
import Reducer from "./reducers";
import ModalDeleteDevice from "./modal/ModalDeleteDevice";
import ModalAddDevice from "./components/modals/ModalAddDevice";

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
      {state.openModal.openModalAdd && (
        <ModalAddDevice
          open={state.openModal.openModalAdd}
          handleClose={() =>
            dispatch({
              type: "OPEN_MODAL",
              openModal: { openModalAdd: false },
            })
          }
        />
      )}
    </DeviceProvider>
  );
};

export default Device;
