import { Box } from "@material-ui/core";
import MapContent from "./map";
import SideBar from "./side-bar";

const Content = () => {
  return (
    <Box style={{ display: "flex" }}>
      <SideBar />
      <MapContent />
    </Box>
  );
};

export default Content;
