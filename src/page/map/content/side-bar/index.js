import { Box } from "@material-ui/core";
import Search from "./search";
import { fakeData } from "../../../../utils/common";
import CameraItem from "./item";
import { useContext } from "react";
import { MapContext } from "../../Map";

const SideBar = () => {
  const { markerList } = useContext(MapContext);

  return (
    <Box style={{ width: "280px", height: "900px", padding: "10px" }}>
      <Search />
      <Box style={{ marginTop: "10px" }}>
        {markerList.data.map((data) => (
          <CameraItem camera_detail={data} key={data.id} />
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
