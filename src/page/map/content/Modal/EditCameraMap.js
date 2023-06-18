import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSearchMap } from "../../../../hooks/useSearchMap";
import { SearchIcon } from "../../../../common/icons/SearchIcon";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../..";

const EditCameraMapModal = () => {
  const {
    currentMarkers,
    setCurrentMarkers,
    markers,
    setMarkers,
    idEditModal,
    setIdEditModal,
    setIsOpenEditModal,
  } = useContext(MapContext);
  const { vtmapgl, map, geocoderService } = useSearchMap();

  const [markersArr, setMarkersArr] = useState([]);
  const [idNewCamera, setIdNewCamera] = useState(0);

  function getPopupHtml(item) {
    return `
        <div style="font-weight: bold;border-bottom: solid 1px lightgray;padding: 8px 0;">${
          item.name == null ? "" : item.name
        }</div> 
        <div style="margin-top: 8px;">
            <span style="font-weight: bold">Địa chỉ: </span>
            <span>${item.address == null ? "N/A" : item.address}</span>
        </div>

        <div>
            <span style="font-weight: bold">Phone: </span>
            <span>${item.phone == null ? "N/A" : item.phone}</span>
        </div>

        <div>
            <span style="font-weight: bold">Email: </span>
            <span>${item.mail == null ? "N/A" : item.mail}</span>
        </div>
    `;
  }

  const handleClick = (index) => {
    setIdNewCamera(index);
  };

  const handleEditCameraPlace = () => {
    const cloneEl = currentMarkers.map((item) => {
      if (item.id === idEditModal) {
        return {
          ...item,
          location: [
            markersArr[idNewCamera].location.lng,
            markersArr[idNewCamera].location.lat,
          ],
        };
      } else {
        return item;
      }
    });

    let listPopup = document.querySelector(`.status-modal-${idEditModal}`);

    markers.forEach((item) => {
      if (item.lngLat.id === idEditModal) {
        item.marker.remove();
      }
    });

    setCurrentMarkers(cloneEl);
    setIdEditModal(-1);
    setIsOpenEditModal(false);
  };

  useEffect(() => {
    if (markersArr.length > 0) {
      markersArr.forEach((item, index) => {
        let markerEl = document.querySelector(`.icon-edit-${index}`);

        markerEl.addEventListener("click", () => handleClick(index));

        return () => {
          markerEl.removeEventListener("click", () => handleClick(index));
        };
      });
    }
  }, [vtmapgl, map, markersArr, currentMarkers, markers]);

  const handleChangeKeyword = (e) => {
    geocoderService.fetchTextToAddress(e.target.value, 0, 10, (result) => {
      let bounds;
      let items = result.items;
      let mar = [];

      if (items && items.length > 0) {
        bounds = new vtmapgl.LngLatBounds();

        items.forEach((item, index) => {
          const el = document.createElement("div");

          el.className = `icon-edit-${index}`;
          el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 37.5L9.45502 25.0638C9.30849 24.877 9.16349 24.6891 9.02002 24.5C7.21874 22.1272 6.24565 19.229 6.25001 16.25C6.25001 12.6033 7.69867 9.10591 10.2773 6.52728C12.8559 3.94866 16.3533 2.5 20 2.5C23.6467 2.5 27.1441 3.94866 29.7227 6.52728C32.3014 9.10591 33.75 12.6033 33.75 16.25C33.7544 19.2277 32.7817 22.1246 30.9813 24.4963L30.98 24.5C30.98 24.5 30.605 24.9925 30.5488 25.0588L20 37.5ZM11.015 22.9938C11.0175 22.9938 11.3075 23.3787 11.3738 23.4612L20 33.635L28.6375 23.4475C28.6925 23.3787 28.985 22.9913 28.9863 22.99C30.4577 21.0514 31.2529 18.6838 31.25 16.25C31.25 13.2663 30.0648 10.4048 27.955 8.29505C25.8452 6.18526 22.9837 5 20 5C17.0163 5 14.1548 6.18526 12.0451 8.29505C9.93528 10.4048 8.75001 13.2663 8.75001 16.25C8.74739 18.6853 9.54349 21.0543 11.0163 22.9938H11.015Z" fill="#FF0000"/>
            <path d="M26.25 22.5H23.75V12.5H16.25V22.5H13.75V12.5C13.7507 11.8372 14.0143 11.2017 14.483 10.733C14.9517 10.2643 15.5872 10.0007 16.25 10H23.75C24.4128 10.0007 25.0483 10.2643 25.517 10.733C25.9857 11.2017 26.2493 11.8372 26.25 12.5V22.5Z" fill="#FF0000"/>
            <path d="M18.75 20H21.25V22.5H18.75V20ZM18.75 15H21.25V17.5H18.75V15Z" fill="#FF0000"/>
            </svg>`;

          const coordinate = item.location;

          const marker = new vtmapgl.Marker(el);

          marker.setLngLat([coordinate.lng, coordinate.lat]);

          let popup = new vtmapgl.Popup().setHTML(getPopupHtml(item));

          marker.setPopup(popup);
          marker.addTo(map);

          mar.push(item);

          setMarkersArr(mar);
          bounds.extend([coordinate.lng, coordinate.lat]);
        });
      } else {
      }

      map.fitBounds(bounds, { padding: 50 });
    });
  };

  return (
    <Card
      style={{
        position: "absolute",
        width: "425px",
        background: "#FFFFFF",
        zIndex: 100,
        top: 20,
        right: 10,
        padding: "13px",
        borderRadius: "12px",
      }}
    >
      <Typography>Edit Location</Typography>
      <Typography>Lobby 1_ 380 LLQ</Typography>
      <Box>
        <div class="map match-parent" id="child-map"></div>
      </Box>
      <Box mt="20px">
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search by Group ID, Group Name, Address"
          variant="outlined"
          name="keyword"
          size="small"
          onChange={handleChangeKeyword}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon width={20} height={20} color="#EC1B2E" />
              </InputAdornment>
            ),
            //   endAdornment:
            //     textSearch.length > 0 ? (
            //       <InputAdornment position="end">
            //         <Box
            //           component="div"
            //           display="flex"
            //           alignContent="center"
            //           style={{
            //             cursor: "pointer",
            //           }}
            //         >
            //           <CloseIcon />
            //         </Box>
            //       </InputAdornment>
            //     ) : null,
          }}
        />
      </Box>
      <Box mt="20px">
        <Button onClick={handleEditCameraPlace}>Confirm</Button>
        <Button
          onClick={() => {
            setIdEditModal(-1);
            setIsOpenEditModal(false);
          }}
        >
          Cancel
        </Button>
      </Box>
    </Card>
  );
};

export default EditCameraMapModal;
