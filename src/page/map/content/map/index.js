import { useContext, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import {
  getCurrentMarkerPopup,
  getPopupContent,
  getStatusModal,
} from "../../../../utils/common";
import { MapContext } from "../..";

const MapContent = () => {
  const [infoModal, setInfoModal] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const { vtmapgl, map, currentMarkers, markers, setMarkers } =
    useContext(MapContext);

  useEffect(() => {
    if (markers.length > 0) {
      let infoModalClone = [...infoModal];

      for (let i = 0; i <= currentMarkers.length - 1; i++) {
        let listPopup = document.querySelector(
          `.status-modal-${currentMarkers[i].id}`
        );

        let popupContent = document.querySelector(
          `.popup-content-${currentMarkers[i].id}`
        );

        if (listPopup) {
          // eslint-disable-next-line no-loop-func
          listPopup.addEventListener("click", (e) => {
            e.stopPropagation();

            if (!infoModalClone.includes(currentMarkers[i].id)) {
              infoModalClone.push(currentMarkers[i].id);
            } else {
              infoModalClone = infoModalClone.filter(
                (prevId) => prevId !== currentMarkers[i].id
              );
            }

            listPopup.innerHTML = getStatusModal(
              infoModalClone.includes(currentMarkers[i].id)
            );

            popupContent.innerHTML = getPopupContent(
              markers[i].lngLat,
              infoModalClone.includes(currentMarkers[i].id)
            );

            setInfoModal(infoModalClone);
          });
        }
      }
    }
  }, [openPopup, currentMarkers, markers]);

  useEffect(() => {
    if (vtmapgl) {
      const marketSet = new Set();

      currentMarkers.forEach((lngLat) => {
        const { el, popup } = getCurrentMarkerPopup(lngLat, infoModal, vtmapgl);

        const marker = new vtmapgl.Marker(el)
          .setLngLat(lngLat.location)
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener("click", (e) => {
          e.stopPropagation();
          setOpenPopup((prev) => !prev);
          marker.togglePopup();
        });

        marketSet.add({
          lngLat,
          marker,
        });
      });

      setMarkers(Array.from(marketSet));
    }
  }, [vtmapgl, map, infoModal, currentMarkers]);

  return (
    <Box style={{ flex: 1, position: "relative" }}>
      <div id="map"></div>
    </Box>
  );
};

export default MapContent;
