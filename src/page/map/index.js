import { Box } from "@material-ui/core";
import Content from "./content";
import { useVTMapGL } from "../../hooks/useVTMapGL";
import { createContext } from "react";

export const MapContext = createContext({});

const Map = () => {
  const { vtmapgl, map } = useVTMapGL();

  const data = {
    vtmapgl,
    map,
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
