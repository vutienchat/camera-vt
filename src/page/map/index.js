import { Box } from "@material-ui/core";
import Content from "./content";
import { useVTMapGL } from "../../hooks/useVTMapGL";
import { createContext, useState } from "react";
import { fakeData } from "../../utils/common";

export const MapContext = createContext({});

const Map = () => {
  const { vtmapgl, map } = useVTMapGL();

  const [currentMarkers, setCurrentMarkers] = useState(fakeData);

  const data = {
    currentMarkers,
    vtmapgl,
    map,
    setCurrentMarkers
  };

  return (
    <MapContext.Provider value={data}>
      <Box>
        <Content />
      </Box>
    </MapContext.Provider>
  );
};

export default Map;
