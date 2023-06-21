import { useEffect, useState } from "react";

export const useVTMapGL = () => {
  const [vtmapgl, setVtmapgl] = useState();
  const [map, setMap] = useState();

  useEffect(() => {
    if (window.vtmapgl) {
      let vtmapgl = window.vtmapgl;
      vtmapgl.accessToken = "d382d314cf9a40df2d530c2e2644030b";
      // Khởi tạo bản đồ
      var map = new vtmapgl.Map({
        container: "map",
        style: vtmapgl.STYLES.VTRANS,
        center: [108.2022, 16.0544], // tọa độ trung tâm [lng, lat]
        zoom: 5, // mức zoom
      });

      setMap(map);
      setVtmapgl(vtmapgl);
    }
  }, []);

  return {
    vtmapgl,
    map,
  };
};
