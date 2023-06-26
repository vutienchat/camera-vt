import React, { useCallback, useEffect, useState, memo } from "react";
import { Box } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { fakeData } from "../../../../utils/common";
import { CameraOnline, CameraOffline, ContentPopUpCamera } from "../component";

const Marker = memo(({ place }) => {
  const [isShowLive, setIsShowLive] = useState(false);

  return (
    <>
      <Box
        style={{
          borderRadius: "10px",
          height: "162px",
          width: "220px",
          border: `3px solid ${place.status ? "#08B44D" : "#DD3D4B"}`,
          position: "absolute",
          transform: "translateX(-50%)",
          bottom: "35px",
          background: "#fff",
          display: !isShowLive ? "block" : "none",
          zIndex: 2,
        }}
      >
        <ContentPopUpCamera place={place} />
      </Box>
      <div
        style={{
          width: "fit-content",
          height: "auto",
          borderRadius: "6px",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={() => console.log(place)}
      >
        {place.status ? <CameraOnline /> : <CameraOffline />}
      </div>
    </>
  );
});

const defaultProps = {
  center: { lat: 20.99835602, lng: 105.81502627 },
  zoom: 12,
};

const bootstrapURLKeys = {
  key: "AIzaSyBR-uY9uzbU_4XVTNhIPB0R2c7xZKKO_wg",
  language: "vn",
  region: "vn",
  libraries: ["places"],
};

const getListLocation = (searchPlace, request, createMaker) => {
  searchPlace.findPlaceFromQuery(request, (results, status) => {
    if (status === "OK") {
      const place = results[0];

      createMaker({
        name: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  });
};

const ContentMap = () => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [places, setPlaces] = useState([]);

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMap(map);
    setMapApi(maps);
  };

  const handleGetLocationDevice = useCallback((searchPlace, listDevice) => {
    listDevice.forEach((deviceItem) => {
      const request = {
        query: deviceItem.address,
        fields: ["name", "geometry"],
      };

      getListLocation(searchPlace, request, (maker) => {
        setPlaces((prev) => [...prev, { ...deviceItem, ...maker }]);
      });
    });
  }, []);

  useEffect(() => {
    if (!map || !mapApi || !mapApiLoaded) return;

    let searchPlace = new mapApi.places.PlacesService(map);
    handleGetLocationDevice(searchPlace, fakeData);

    return () => {
      mapApi.event.clearInstanceListeners(searchPlace);
      setPlaces([]);
    };
  }, [map, mapApi, mapApiLoaded, handleGetLocationDevice]);

  return (
    <Box style={{ width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        {places.length !== 0 &&
          places.map((place) => (
            <Marker
              key={place.id}
              lat={place.lat}
              lng={place.lng}
              //show={place.show}
              place={place}
            />
          ))}
      </GoogleMapReact>
    </Box>
  );
};

export default ContentMap;
