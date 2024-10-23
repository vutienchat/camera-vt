import { Box } from "@material-ui/core";
import { createContext, useState } from "react";
import useListMarkersData from "../../hooks/api/useListMarkers";
import SideBar from "./SideBar/SideBar";
import { useJsApiLoader } from "@react-google-maps/api";
import MasterMapContent from "./Content/MasterMapContent";

export const MasterMapContext = createContext({});

const MasterMap = () => {
  const markerList = useListMarkersData();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1h7E5EzaksXBAo0NCDnpNhOAL3xcsd_U",
  });

  const [listPopUpCameraOpen, setListPopUpCameraOpen] = useState({});
  const [places, setPlaces] = useState([]);

  const data = {
    places,
    markerList,
    listPopUpCameraOpen,
    loadError,

    setPlaces,
    setListPopUpCameraOpen,
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
