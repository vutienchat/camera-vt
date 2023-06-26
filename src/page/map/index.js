import { Box } from "@material-ui/core";
import Content from "./content";
import { useVTMapGL } from "../../hooks/useVTMapGL";
import { createContext, useState } from "react";
import { fakeData } from "../../utils/common";

export const MapContext = createContext({});

const Map = () => {
  // const { vtmapgl, map } = useVTMapGL();

  // const [currentMarkers, setCurrentMarkers] = useState(fakeData);
  // const [markers, setMarkers] = useState([]);
  // const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  // const [idEditModal, setIdEditModal] = useState(-1);

  const data = {
    // currentMarkers,
    // vtmapgl,
    // markers,
    // isOpenEditModal,
    // idEditModal,
    // map,
    // setMarkers,
    // setCurrentMarkers,
    // setIdEditModal,
    // setIsOpenEditModal,
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
