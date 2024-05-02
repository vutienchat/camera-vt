import "leaflet/dist/leaflet.css";
import { Box } from "@material-ui/core";
import SideBar from "./SideBar/SideBar";
import { CameraOnMapProvider } from "./Provider/CameraOnMapMngt";
import CameraOnMapsContent from "./Components/CameraOnMapsContent";

async function fetchCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Failed to fetch coordinates", error);
    throw error;
  }
}

const MasterMapLeaf = () => {
  return (
    <CameraOnMapProvider>
      <Box style={{ display: "flex" }}>
        <SideBar />
        <CameraOnMapsContent />
      </Box>
    </CameraOnMapProvider>
  );
};

export default MasterMapLeaf;
