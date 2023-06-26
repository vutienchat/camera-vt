import React, { useEffect } from "react";

const SearchBoxComponent = ({ map, mapApi, request }) => {
  useEffect(() => {
    let searchPlace = new mapApi.places.PlacesService(map);
    const request = {
      query: "60 Hoàng Quốc Việt, Hà Nội",
      fields: ["name", "geometry"],
    };

    // searchPlace = new mapApi.places.PlacesService(map);
    searchPlace.findPlaceFromQuery(request, (results, status) => {
      if (status === "OK") {
        console.log(results[0].geometry);
        console.log("name", results[0].name);
        //console.log("tọa độ11");
        //console.log(results[0].geometry.viewport.Ha);
        // console.log(results[0].geometry.viewport.Va);
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        //place.geometry.location.lat()
      }
    });
    return () => mapApi.event.clearInstanceListeners(searchPlace);
  }, [map, mapApi]);

  return null;
};

export default SearchBoxComponent;
