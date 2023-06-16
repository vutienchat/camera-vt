import { Box } from "@material-ui/core";
import SearchTab from "./search-tab";
import { fakeData } from "../../../../utils/common";
import CameraItem from "./item";

const SideBar = () => {
  return (
    <Box style={{ width: "280px", height: "900px", padding: "10px" }}>
      <SearchTab />
      <Box style={{ marginTop: "10px" }}>
        {fakeData.map((data) => (
          <CameraItem camera_detail={data} key={data.id} />
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
