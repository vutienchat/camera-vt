import React from "react";
import DeviceContainer from "./components/DeviceContainer";
import DeviceProvider from "./components/DeviceProvider";
import Reducer from "./reducers";

const Device = () => {
  const { state, dispatch } = Reducer();

  const value = {
    state,
    dispatch,
  };

  return (
    <DeviceProvider value={value}>
      <DeviceContainer />
    </DeviceProvider>
  );
};

export default Device;
