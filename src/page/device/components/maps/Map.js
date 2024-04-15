import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core";
import { useFormContext } from "react-hook-form";

const containerStyle = {
  minWidth: "395px",
  height: "140px",
};

const center = {
  lat: 21.046215,
  lng: 105.785733,
};

export const API_KEY = "AIzaSyB9DY4IW1r8VFoSxM-RglsTLUwjRVCGBfo";

function MapCustom({
  location,
  setMarkerAddress,
  markerPosition,
  setMarkerPosition,
  isDrag,
  setMaps,
}) {
  const classes = mapStyle();
  const { setValue } = useFormContext();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [open, setOpen] = useState(true);
  const [map, setMap] = useState();
  // const [positionMark, setPositionMark] = useState(markerPosition);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
    setMaps(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMouseMove = (e) => {};

  const handleMarkerClick = () => {
    setIsDragging(!isDragging);
  };

  const handleMarkerDragEnd = (e) => {
    const newMarkerPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newMarkerPosition);
    setOpen(true);
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
      onMouseMove={handleMouseMove}
      onClick={handleMarkerClick}
      options={{
        streetViewControl: false,
        rotateControl: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
      }}
      mapContainerClassName={classes.root}
    >
      <Marker
        position={markerPosition}
        draggable={!!isDrag}
        onDragEnd={handleMarkerDragEnd}
      >
        {open && (
          <InfoWindow onCloseClick={() => setOpen(false)}>
            <p style={{ color: "#fff", fontWeight: 500 }}>
              Address: {location || "60 Hoàng Quốc Việt"}
            </p>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}

const mapStyle = makeStyles({
  root: {
    "& .gm-style .gm-style-iw-c": {
      backgroundColor: "#DD3D4B",
      borderRadius: "8px",
      boxShadow: "0 2px 7px 1px rgba(0,0,0,0.3)",
      padding: "10px !important",
    },
    "& .gm-style-iw-d": {
      overflow: "unset !important",
    },
    "& .gm-style-iw-tc:after ": {
      backgroundColor: "#DD3D4B",
    },
  },
});

export default React.memo(MapCustom);
