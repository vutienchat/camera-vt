import React, { useMemo } from "react";
import DeviceContainer from "./components/DeviceContainer";
import DeviceProvider from "./components/DeviceProvider";
import Reducer from "./reducers";
import ModalDeleteDevice from "./components/modals/ModalDeleteDevice";
import ModalImport from "./components/modals/ModalImport";
import ModalAddDevice from "./components/modals/ModalAddDevice";
import ModalConfiguration from "./components/modals/ModalConfiguration/ModalConfiguration";
import ModalDeviceStatus from "./components/modals/ModalDeviceStatus";
import { Feature, tableData } from "./utils";

const Device = () => {
  const { state, dispatch } = Reducer();

  const handleCheckData = (data) => {
    dispatch({
      type: "CHECKED_ITEM_LIST",
      checkedItemList: data,
    });
  };
  const handleChangePagination = (pag) => {
    dispatch({
      type: "PAGINATION",
      pagination: {
        page: pag.page,
        rowPerPage: pag.rowPerPage,
      },
    });
  };
  const handleCloseModalDelete = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalDelete: false,
      },
    });
  };
  const handleCloseModalDeviceStatus = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalDeviceStatus: false,
      },
    });
    dispatch({
      type: "CHOOSE_DEVICE",
      chooseDevice: {},
    });
  };

  const dataListShow = useMemo(() => {
    if (!tableData) return [];
    const deviceData = tableData.map((trafficItem, index) => ({
      ...trafficItem,
      stt: index + 1,
    }));
    return {
      length: deviceData.length,
      data: deviceData.slice(
        state.pagination.page * (state.pagination.rowPerPage + 1),
        state.pagination.page * (state.pagination.rowPerPage + 1) +
          (state.pagination.rowPerPage + 1)
      ),
    };
  }, [tableData, state.pagination]);

  const handleDeleteDevice = () => {
    handleCheckData([]);
    handleCloseModalDelete();
  };

  const value = {
    state,
    dispatch,
    dataListShow,
    handleCheckData,
    handleChangePagination,
    handleCloseModalDelete,
    handleCloseModalDeviceStatus,
    handleDeleteDevice,
  };

  return (
    <DeviceProvider value={value}>
      <DeviceContainer />
      {state.openModal.openModalDelete && <ModalDeleteDevice />}
      {state.openModal.openModalAddDevice && (
        <ModalAddDevice
          open={state.openModal.openModalAddDevice}
          handleClose={() =>
            dispatch({
              type: "OPEN_MODAL",
              openModal: { openModalAddDevice: false },
            })
          }
        />
      )}
      {state.openModal.openModalImport && <ModalImport />}
      {state.openModal.openModaleConfiguration && <ModalConfiguration />}
      {state.openModal.openModalDeviceStatus && <ModalDeviceStatus />}
    </DeviceProvider>
  );
};

export default Device;
