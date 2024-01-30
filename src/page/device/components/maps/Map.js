import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "395px",
  height: "140px",
};

const center = {
  lat: 21.046215,
  lng: 105.785733,
};

function MapCustom() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB9DY4IW1r8VFoSxM-RglsTLUwjRVCGBfo",
  });
  const [isDragging, setIsDragging] = useState(false);

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ lat: 21.046215, lng: 105.785733 });


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const handleMarkerClick = () => {
    setIsDragging(!isDragging);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: markerPosition }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const addressComponents = results[0].address_components;
        let streetNumber = '';
        for (let i = 0; i < addressComponents.length; i++) {
          if (addressComponents[i].types.includes('street_number')) {
            streetNumber = addressComponents[i].short_name;
            break;
          }
        }
        console.log('Street Number:', streetNumber);
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  };

  const handleMarkerDragEnd = (e) => {
    setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
        onDragEnd={handleMarkerDragEnd}
      options={{
        streetViewControl: false,
        rotateControl: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
      }}
    >
     <Marker position={markerPosition} draggable={true} onDragEnd={(e) => console.log('Marker dragged to', e.latLng)} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapCustom);
