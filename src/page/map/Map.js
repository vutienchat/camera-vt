import { Box } from "@material-ui/core";
import Content from "./content";
import { createContext } from "react";
import useListMarkersData from "../../hooks/api/useListMarkers";

export const MapContext = createContext({});

const Map = () => {
  // const { vtmapgl, map } = useVTMapGL();
  const markerList = useListMarkersData();

  // const [currentMarkers, setCurrentMarkers] = useState(fakeData);
  // const [markers, setMarkers] = useState([]);
  // const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  // const [idEditModal, setIdEditModal] = useState(-1);

  const data = {
    markerList,
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
