import { Box } from "@material-ui/core";
import MapContent from "./map";
import SideBar from "./side-bar";
import EditCameraMapModal from "./Modal/EditCameraMap";
import { useContext } from "react";
import { MapContext } from "..";

const Content = () => {
  const { isOpenEditModal, idEditModal } = useContext(MapContext);

  return (
    <Box style={{ display: "flex" }}>
      <SideBar />
      <MapContent />
      {isOpenEditModal && idEditModal !== -1 && <EditCameraMapModal />}
    </Box>
  );
};

export default Content;
