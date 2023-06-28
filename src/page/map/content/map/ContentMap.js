import React, { useCallback, useEffect, useState, memo, useRef } from "react";
import { Box } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { fakeData } from "../../../../utils/common";
import { CameraOnline, CameraOffline, ContentPopUpCamera } from "../component";

const Marker = memo(({ place, draggable, onDragEnd }) => {
  const [isShowLive, setIsShowLive] = useState(false);

  return (
    <>
      {isShowLive && (
        <Box
          style={{
            borderRadius: "10px",
            height: "162px",
            width: "220px",
            border: `3px solid ${place.status ? "#08B44D" : "#DD3D4B"}`,
            position: "absolute",
            transform: "translateX(-50%)",
            bottom: "30px",
            background: "#fff",
            zIndex: 2,
          }}
        >
          <ContentPopUpCamera place={place} />
        </Box>
      )}
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
        onClick={() => setIsShowLive((isShowPrev) => !isShowPrev)}
      >
        {place.status ? <CameraOnline /> : <CameraOffline />}
      </div>
    </>
  );
});

const VIET_NAM_BOUNDS = {
  north: 26.625282609530778,
  south: 7.403234941112085,
  west: 91.39500174206523,
  east: 119.49802908581523,
};

const defaultProps = {
  center: { lat: 21.0278, lng: 105.8342 },
  restriction: {
    latLngBounds: VIET_NAM_BOUNDS,
    strictBounds: false,
  },
  zoom: 13,
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
      console.log(place);
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
    if (!map || !mapApi) return;
    const handleZoomChanged = () => {
      console.log("Zoom level changed to", map.getZoom());
      // const bounds = map.getBounds();
      // const minLat = bounds.getSouthWest().lat();
      // const minLng = bounds.getSouthWest().lng();
      // const maxLat = bounds.getNorthEast().lat();
      // const maxLng = bounds.getNorthEast().lng();
    };

    mapApi.event.addListener(map, "zoom_changed", handleZoomChanged);

    return () => mapApi.event.clearListeners(map, "zoom_changed");
  }, [map, mapApi]);

  useEffect(() => {
    if (!map || !mapApi || !mapApiLoaded) return;

    // eslint-disable-next-line no-undef
    const geocoder = new mapApi.Geocoder();

    let searchPlace = new mapApi.places.PlacesService(map);
    handleGetLocationDevice(searchPlace, fakeData);

    geocoder.geocode(
      { address: "380 Đường Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội" },
      (results, status) => {
        console.log(results);
        if (status === "OK") {
          console.log(results[0]);
          //mapApi.setCenter({ lat, lng });
        } else {
          console.log(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      }
    );

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
        options={{
          restriction: {
            latLngBounds: VIET_NAM_BOUNDS,
            strictBounds: false,
          },
        }}
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
              // draggable={true}
              // onDragEnd={handleMarkerDrag}
            />
          ))}
      </GoogleMapReact>
    </Box>
  );
};

export default ContentMap;
