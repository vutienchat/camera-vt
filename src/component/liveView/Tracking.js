import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import MasterMapContent from "../../page/masterMap/Content/MasterMapContent";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ImageIcon from "@material-ui/icons/Image";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import MasterMap from "../../page/masterMap/MasterMap";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { TRACKING_DATA } from "../../Constant/tracking";
import markerCurrent from "../../asset/marker-event-current.png";
import markerCurrentActive from "../../asset/marker-event-current-active.png";
import markerOther from "../../asset/marker-event-other.png";
import markerOtherActive from "../../asset/marker-event-other-active.png";

const VIET_NAM_BOUNDS = {
  north: 26.625282609530778,
  south: 7.403234941112085,
  west: 91.39500174206523,
  east: 119.49802908581523,
};

const defaultProps = {
  restriction: {
    latLngBounds: VIET_NAM_BOUNDS,
    strictBounds: false,
  },
  zoom: 14,
};

const currentDevice = "be1c0f60bb2811eeaf34baf7db86dba7";

const LIST_DIVICE = {
  be1c0f60bb2811eeaf34baf7db86dba7: {
    camName: "T1-Cau-Thang-5",
    lat: 21.01026009080891,
    lng: 105.78345984846601,
  },
  "93fdf8e0af9f11eea61bbaf7db86dba7": {
    camName: "T1-Cau-Thang-1",
    lat: 21.01928823777558,
    lng: 105.7924095129859,
  },
  "7cbdf9f0af9f11eebe6f3afdc3cd602b": {
    camName: "T1-Cau-Thang-3",
    lat: 21.03533950122483,
    lng: 105.79414170611877,
  },
};

function Tracking() {
  const [viewMarkerInfo, setViewMarkerInfo] = useState({});
  const [listTracking, setListTracking] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1h7E5EzaksXBAo0NCDnpNhOAL3xcsd_U",
  });
  console.log({ loadError });

  useEffect(() => {
    TRACKING_DATA.sort((a, b) => a.createDate - b.createDate);
    setListTracking(
      TRACKING_DATA.map((item) => ({ ...item, ...LIST_DIVICE[item.deviceId] }))
    );
  }, []);

  const handleOnLoadMaps = useCallback(
    (map) => {
      if (listTracking.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        listTracking.forEach((marker) => {
          bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
        });
        map.fitBounds(bounds);
      }
    },
    [listTracking]
  );

  const handleToggleViewInfo = (id) => {
    setViewMarkerInfo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getMarkerIcon = (id, deviceId) => {
    const isMarkerActive = viewMarkerInfo[id];
    const isCurrentDevice = deviceId === currentDevice;

    if (isMarkerActive && isCurrentDevice) {
      return markerCurrentActive;
    }
    if (isMarkerActive && !isCurrentDevice) {
      return markerOtherActive;
    }
    if (isCurrentDevice) {
      return markerCurrent;
    }
    if (!isCurrentDevice) {
      return markerOther;
    }
    return markerCurrent;
  };

  return (
    <Box sx={{ p: 1.5, height: "100%", boxSizing: "border-box" }}>
      {isLoaded && (
        <GoogleMap
          zoom={defaultProps.zoom}
          center={{ lat: 21.01026009080891, lng: 105.78345984846601 }}
          mapContainerClassName="map-container-events"
          clickableIcons={false}
          options={{
            streetViewControl: false,
            rotateControl: false,
            mapTypeControl: false,
            zoomControl: false,
            fullscreenControl: false,
          }}
          onLoad={handleOnLoadMaps}
        >
          {listTracking.map((tracking, index) => {
            const { lat, lng, id, deviceId } = tracking;
            return (
              <Marker
                key={index}
                position={{
                  lat,
                  lng,
                }}
                {...(!viewMarkerInfo[id] && {
                  label: {
                    text: String(index + 1),
                    className: "marker-event",
                  },
                })}
                icon={{
                  url: getMarkerIcon(id, deviceId),
                }}
                onClick={() => handleToggleViewInfo(id)}
              >
                {viewMarkerInfo[id] && (
                  <InfoWindowContent
                    id={id}
                    tracking={tracking}
                    onToggleViewInfo={handleToggleViewInfo}
                  />
                )}
              </Marker>
            );
          })}
          <Polyline
            options={{
              path: listTracking,
              strokeColor: "#DD3D4B",
              strokeWeight: 0,
              icons: [
                {
                  icon: {
                    path: "M 0,-1 0,0",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    scale: 4,
                  },
                  offset: "20px",
                  repeat: "15px",
                },
              ],
            }}
          />
        </GoogleMap>
      )}
    </Box>
  );
}

export default Tracking;

const InfoWindowContent = ({ onToggleViewInfo, id, tracking }) => {
  const [isShowImage, setIsShowImage] = useState(true);
  const videoRef = useRef(null);
  return (
    <InfoWindow
      position={{ lat: tracking.lat, lng: tracking.lng }}
      onCloseClick={() => onToggleViewInfo(tracking.id)}
      options={{ pixelOffset: { width: 0, height: -40 } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{tracking.camName}</Typography>
          <CloseIcon onClick={() => onToggleViewInfo(tracking.id)} />
        </Box>
        <Box sx={{ width: 568, height: 319 }}>
          {isShowImage ? (
            <img
              src="./image.png"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />
          ) : (
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                backgroundImage: 'url("./image.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              muted
              controls={true}
              autoPlay
              src={"/static/media/video1.74efbde570da071de4a9.mp4"}
            ></video>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            style={{ width: 32, height: 32, minWidth: "auto" }}
            variant="contained"
            onClick={() => setIsShowImage((prev) => !prev)}
          >
            {isShowImage ? <PlayArrowIcon /> : <ImageIcon />}
          </Button>
          <Typography>
            {new Date(tracking.createDate).toLocaleString("en-US", {
              timeZone: "UTC", // Hoặc sử dụng múi giờ của bạn
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Typography>
          <ArrowForwardIcon />
        </Box>
      </Box>
    </InfoWindow>
  );
};
