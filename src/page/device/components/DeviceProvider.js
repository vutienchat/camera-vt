import React from "react";

export const DeviceContext = React.createContext();

const DeviceProvider = React.memo(({ children, value }) => {
  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
});

export default DeviceProvider;
