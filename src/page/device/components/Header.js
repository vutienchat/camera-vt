import React, { useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { DeviceContext } from "./DeviceProvider";
import SelectMultiple from "./SelectMultiple";
import { headerDeviceFilterArr } from "../utils";
import Select from "./Select";
import SearchBar from "./CommonSearchBar";
import { ReloadIcon, SettingIcon } from "../Icon";

const Header = () => {
  const { state, dispatch } = useContext(DeviceContext);
  const classes = useStyles();
  const setDeviceNameKey = (newValue) => {
    dispatch({
      type: "SEARCH_DEVICE_NAME",
      deviceNameKey: newValue,
    });
  };
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <Box className={classes.root} style={{ flex: 1 }}>
        <SearchBar
          searchKey={state.deviceNameKey}
          searchBarType="deviceName"
          setSearchKey={setDeviceNameKey}
        />
      </Box>
      <Box className={classes.root}>
        {headerDeviceFilterArr.map((item) => {
          if (item.type === "select_multiple")
            return (
              <SelectMultiple
                key={item.key}
                list={item.list}
                width={item.width}
                btnText={item.btnText}
                titleDropdownText={item.titleDropdownText}
                searchBarType={item.key}
              />
            );
          else
            return (
              <Select
                key={item.key}
                list={item.list}
                width={item.width}
                btnText={item.btnText}
                titleDropdownText={item.titleDropdownText}
                listObject={item.listObject}
                searchBarType={item.key}
              />
            );
        })}
        <Box className={classes.icon}>
          <ReloadIcon width={20} height={20} color="#858585" />
        </Box>
        <Box className={classes.icon}>
          <SettingIcon width={20} height={20} color="#858585" />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "16px",
  },
  icon: {
    minWidth: "40px",
    height: "40px",
    display: "flex",
    border: "1px solid #939393",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
});

export default Header;
