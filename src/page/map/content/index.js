import { Box } from "@material-ui/core";
import MapContent from "./map";
import SideBar from "./side-bar";
import EditCameraMapModal from "./Modal/EditCameraMap";

const Content = () => {
  return (
    <Box style={{ display: "flex" }}>
      <SideBar />
      <MapContent />
      <EditCameraMapModal />
    </Box>
  );
};

export default Content;
