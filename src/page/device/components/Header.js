import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import SearchBar from "./SearchBar";
import { DeviceContext } from "./DeviceProvider";

const Header = () => {
  const { state, dispatch } = useContext(DeviceContext);
  const setDeviceNameKey = (newValue) => {
    dispatch({
      type: "SEARCH_DEVICE_NAME",
      deviceNameKey: newValue,
    });
  };
  return (
    <Box>
      <SearchBar
        searchKey={state.deviceNameKey}
        searchBarType="deviceName"
        setSearchKey={setDeviceNameKey}
      />
    </Box>
  );
};

export default Header;
