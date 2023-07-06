import { Box } from "@material-ui/core";
import { createContext, useState } from "react";
import useListMarkersData from "../../hooks/api/useListMarkers";
import SideBar from "./SideBar/SideBar";
import { useLoadScript } from "@react-google-maps/api";
import MasterMapContent from "./Content/MasterMapContent";

export const MasterMapContext = createContext({});

const MasterMap = () => {
  const markerList = useListMarkersData();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBR-uY9uzbU_4XVTNhIPB0R2c7xZKKO_wg",
  });

  const [deviceListSelected, setDeviceListSelected] = useState({});

  const data = {
    markerList,
    deviceListSelected,

    setDeviceListSelected,
  };

  if (!isLoaded || markerList.isLoading) {
    return <Box>Loading</Box>;
  }

  return (
    <MasterMapContext.Provider value={data}>
      <Box style={{ display: "flex" }}>
        <SideBar />
        <MasterMapContent />
      </Box>
    </MasterMapContext.Provider>
  );
};

export default MasterMap;
