import { useEffect, useState } from "react";

export const useSearchMap = () => {
  const [vtmapgl, setVtmapgl] = useState();
  const [map, setMap] = useState();
  const [geocoderService, setGeocoderService] = useState();

  useEffect(() => {
    if (window.vtmapgl) {
      let vtmapgl = window.vtmapgl;
      vtmapgl.accessToken = "d382d314cf9a40df2d530c2e2644030b";

      // Khởi tạo bản đồ
      var map = new vtmapgl.Map({
        container: "child-map",
        style: vtmapgl.STYLES.VTRANS,
        center: [108.21182, 16.05976], // tọa độ trung tâm [lng, lat]
        zoom: 13, // mức zoom
        preserveDrawingBuffer: true,
      });

      const geocoderService = new vtmapgl.GeocoderAPIService({
        accessToken: vtmapgl.accessToken,
      });

      setMap(map);
      setVtmapgl(vtmapgl);
      setGeocoderService(geocoderService);
    }
  }, []);

  return {
    vtmapgl,
    map,
    geocoderService,
  };
};
