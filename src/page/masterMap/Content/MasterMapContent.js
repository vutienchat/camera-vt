import { useContext, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

import { MasterMapContext } from "../MasterMap";
import MarkerItem from "./MarkerItem";

const latDefault = 21.0677385;
const lngDefault = 105.8114404;

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

const MasterMapContent = () => {
  const { markerList } = useContext(MasterMapContext);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!markerList.data) return;

    let list = [];

    markerList.data.forEach((marker) => {
      marker.deviceList.forEach((device) => {
        if (device.lng && device.lat) {
          list = [...list, device];
        } else {
          list = [
            ...list,
            {
              ...device,
              lat: latDefault,
              lng: lngDefault,
            },
          ];
        }
      });
    });

    setPlaces(list);
  }, [markerList.data]);

  return (
    <GoogleMap
      zoom={defaultProps.zoom}
      center={defaultProps.center}
      mapContainerClassName="map-container"
    >
      {places.map((place) => {
        return <MarkerItem key={place.id} place={place} />;
      })}
    </GoogleMap>
  );
};

export default MasterMapContent;
