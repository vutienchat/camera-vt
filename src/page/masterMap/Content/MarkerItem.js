import { Box } from "@material-ui/core";
import { InfoWindow, Marker } from "@react-google-maps/api";
import ContentPopUpCamera from "./ContentPopUpCamera";
import { useState } from "react";

const MarkerItem = ({ place }) => {
  const [isPopUpCameraOpen, setIsPopUpCameraOpen] = useState(false);

  console.log(place);
  const handleOnClick = () => {
    setIsPopUpCameraOpen((prev) => !prev);
  };

  return (
    <Box style={{ position: "relative" }}>
      <Marker
        key={place.id}
        position={{
          lat: place.lat,
          lng: place.lng,
        }}
        onClick={handleOnClick}
      />
      {isPopUpCameraOpen && (
        <InfoWindow
          position={{
            lat: place.lat,
            lng: place.lng,
          }}
          options={{
            position: "relative",
          }}
          className="infoWindow"
        >
          <ContentPopUpCamera place={place} />
        </InfoWindow>
      )}
    </Box>
  );
};

export default MarkerItem;
