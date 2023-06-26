import { useEffect, useState } from "react";

const useLocationPlace = (map, mapApi, device) => {
  const [location, setLocation] = useState({});

  //console.log(map, device);

  useEffect(() => {
    if (!map || !mapApi) return;

    let searchPlace = new mapApi.places.PlacesService(map);
    const request = {
      query: "60 Hoàng Quốc Việt, Hà Nội",
      fields: ["name", "geometry"],
    };

    setLocation(
      //deviceList.map((deviceItem) => {
      searchPlace.findPlaceFromQuery(request, (results, status) => {
        if (status === "OK") {
          console.log("12345");
          const place = results[0];
          return {
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
        }
        return {};
      })
      //})
    );

    return () => mapApi.event.clearInstanceListeners(searchPlace);
  }, [map, mapApi, device]);
  console.log(location);

  return location;
};

export default useLocationPlace;
