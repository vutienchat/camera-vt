import { Fragment } from "react";
import TableNotifications from "./Table";
import Header from "../device/components/Header";
import DeviceProvider from "../device/components/DeviceProvider";
import { Box } from "@material-ui/core";
import useFilters from "./utils/filters";

const Notificaions = () => {
  const value = {
    state: {
      listDeviceSelected: [],
      deviceNameKey: "",
      openModal: {
        openModalDelete: false,
        openModalAdd: false,
        openModalImport: false,
        openModalAddDevice: true,
        openModaleConfiguration: false,
        openModalDeviceStatus: false,
        openModalEditSchedule: false,
      },
      pagination: {
        page: 0,
        rowPerPage: 9,
        length: 0,
      },
      paginationDeviceStatus: {
        page: 0,
        rowPerPage: 9,
        length: 0,
      },
      checkedItemList: [],
      listFeatureType: [],
      listAiFeature: [],
      chooseDevice: {},
      switchState: {
        recording: false,
      },
      chooseSchedule: {},
    },
    dispatch: () => {},
  };

  const { filters, onPageChange, onPageSizeChange } = useFilters();
  return (
    <Fragment>
      <DeviceProvider value={value}>
        <Box sx={{ padding: "20px 0" }}>
          <Header />
        </Box>
        <TableNotifications
          filters={filters}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </DeviceProvider>
    </Fragment>
  );
};

export default Notificaions;
