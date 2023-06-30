import React, {
  useCallback,
  useEffect,
  useState,
  memo,
  useContext,
} from "react";
import { Box } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { CameraOnline, CameraOffline, ContentPopUpCamera } from "../component";
import EditCameraMapModal from "../Modal/EditCameraMap";
import { MapContext } from "../../Map";

const Marker = memo(({ place, setPlaceSelected, setIsOpenEditModal }) => {
  const [isShowLive, setIsShowLive] = useState(false);

  return (
    <>
      {isShowLive && (
        <Box
          className="marker"
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
          <ContentPopUpCamera
            place={place}
            handleOpenEditModal={() => {
              setIsOpenEditModal(true);
              setPlaceSelected(place);
            }}
          />
        </Box>
      )}
      <div
        className="marker"
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
  const { markerList } = useContext(MapContext);

  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [isOpenEditCamera, setIsOpenEditModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [placeSelected, setPlaceSelected] = useState();

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMap(map);
    setMapApi(maps);
  };

  const handleGetLocationDevice = useCallback((searchPlace, listDevice) => {
    listDevice.forEach((deviceItem) => {
      let request;
      if (deviceItem.address) {
        request = {
          query: deviceItem.address,
          fields: ["name", "geometry"],
        };
      } else {
        request = {
          query: "380 Đường Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội",
          fields: ["name", "geometry"],
        };
      }

      getListLocation(searchPlace, request, (maker) => {
        setPlaces((prev) => [...prev, { ...deviceItem, ...maker }]);
      });
    });
  }, []);

  const handleZoomChanged = () => {
    console.log("Zoom level changed to", map.getZoom());
    // const bounds = map.getBounds();
    // const minLat = bounds.getSouthWest().lat();
    // const minLng = bounds.getSouthWest().lng();
    // const maxLat = bounds.getNorthEast().lat();
    // const maxLng = bounds.getNorthEast().lng();
  };

  const handleDragEnd = () => {
    const markers = document.querySelectorAll(".marker");

    markers.forEach((marker) => {
      marker.style.display = "none";
      marker.style.scale = 0;
    });
    setTimeout(() => {
      markers.forEach((marker) => {
        marker.style.display = "block";
        marker.style.scale = 1;
        marker.style.transition = "all 0.2s ease-in-out";
      });
    }, 300);
  };

  useEffect(() => {
    if (
      !map ||
      !mapApi ||
      !mapApiLoaded ||
      !markerList.data ||
      markerList.isLoading
    )
      return;
    // eslint-disable-next-line no-undef
    const geocoder = new mapApi.Geocoder();

    let searchPlace = new mapApi.places.PlacesService(map);

    markerList.data.forEach((mrk) => {
      handleGetLocationDevice(searchPlace, mrk.deviceList);
    });

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
  }, [map, mapApi, mapApiLoaded]);

  return (
    <Box style={{ width: "100%", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        debounced
        onZoomAnimationEnd={handleZoomChanged}
        options={{
          restriction: {
            latLngBounds: VIET_NAM_BOUNDS,
            strictBounds: false,
          },
        }}
        onDragEnd={handleDragEnd}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        {places &&
          places.map((place) => (
            <Marker
              key={place.id}
              lat={place.lat}
              lng={place.lng}
              place={place}
              setPlaceSelected={setPlaceSelected}
              setIsOpenEditModal={setIsOpenEditModal}
            />
          ))}
      </GoogleMapReact>
      {isOpenEditCamera && (
        <EditCameraMapModal
          place={placeSelected}
          handleClose={() => setIsOpenEditModal(false)}
        />
      )}
    </Box>
  );
};

export default ContentMap;
