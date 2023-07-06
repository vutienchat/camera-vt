import { Box } from "@material-ui/core";
import { InfoWindow, Marker } from "@react-google-maps/api";
import ContentPopUpCamera from "./ContentPopUpCamera";
import { useContext } from "react";
import { MasterMapContext } from "../MasterMap";

const MarkerItem = ({ place, handleOpenEditModal }) => {
  const { listPopUpCameraOpen, setListPopUpCameraOpen } =
    useContext(MasterMapContext);

  const handleOnClick = () => {
    setListPopUpCameraOpen((prev) => ({
      ...prev,
      [place.id]: !prev[place.id],
    }));
  };

  return (
    <Box style={{ position: "relative" }}>
      <Marker
        key={place.id}
        position={{
          lat: place.lat,
          lng: place.lng,
        }}
        icon={{
          url: require(place.status === "ONLINE"
            ? "../../../asset/camera-online.png"
            : "../../../asset/camera-offline.png"),
        }}
        onClick={handleOnClick}
      />
      {listPopUpCameraOpen[place.id] && (
        <InfoWindow
          position={{
            lat: place.lat,
            lng: place.lng,
          }}
          options={{
            position: "relative",
            pixelOffset: { width: 0, height: -50 },
          }}
          className="infoWindow"
        >
          <ContentPopUpCamera
            place={place}
            handleOpenEditModal={handleOpenEditModal}
          />
        </InfoWindow>
      )}
    </Box>
  );
};

export default MarkerItem;
