import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import useDebounce from "../../../../hooks/useDebounce";
import { SearchIcon } from "../../../../common/icons/SearchIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMarker } from "../../../../utils/api/map";
import { MapContext } from "../../Map";
import { QUERY_KEYS } from "../../../../utils/keys";
import { getPopUpHtml } from "../../../../utils/common";

const bootstrapURLKeys = {
  key: "AIzaSyBR-uY9uzbU_4XVTNhIPB0R2c7xZKKO_wg",
  language: "vn",
  region: "vn",
  libraries: ["places"],
};

const VIET_NAM_BOUNDS = {
  north: 26.625282609530778,
  south: 7.403234941112085,
  west: 91.39500174206523,
  east: 119.49802908581523,
};

const defaultProps = {
  restriction: {
    latLngBounds: VIET_NAM_BOUNDS,
    strictBounds: false,
  },
  zoom: 13,
};

const EditCameraMapModal = ({
  places,
  listMarker,
  place,
  handleClose,
  mapParent,
  markerList,
  mapApiContent,
}) => {
  const queryClient = useQueryClient();
  const [placeCustom, setPlaceCustom] = useState({
    name: place.name,
    lng: place.lng,
    lat: place.lat,
  });

  const [mapContent, setMapContent] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const keyword = useDebounce(searchValue, 1000);

  const [infoWindowState, setInfoWindowState] = useState();
  const classes = useStylesTableBodyGroup();
  console.log(place.id, listMarker);

  const editMarkerApi = useMutation({
    mutationFn: async (param) => editMarker(param),
    onSuccess: () => {
      const marker = new mapApiContent.Marker({
        position: { lat: place.lat, lng: place.lng },
        mapParent,
        icon: {
          url: require(place.status === "ONLINE"
            ? "../../../../asset/camera-online.png"
            : "../../../../asset/camera-offline.png"),
        },
      });

      const infoWindowDetail = new mapApiContent.InfoWindow({
        content: getPopUpHtml(place),
      });

      infoWindowDetail.open(mapParent, marker);

      queryClient.invalidateQueries([QUERY_KEYS.MARKERS_LIST]);
    },
    onError: () => {
      console.log("Error");
    },
  });

  const apiHasLoaded = (map, maps) => {
    const marker = new maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      icon: {
        url: require("../../../../asset/carbon_location-company.png"),
      },
      draggable: true,
    });

    const infowindow = new maps.InfoWindow({
      content: `<div class="pop-up-edit"><p>${place.name}</p></div>`,
    });

    infowindow.open(map, marker);

    setInfoWindowState(infowindow);
    setMarker(marker);
    setMapContent(map);
    setMapApi(maps);

    marker.addListener("dragend", () => {
      const geocoder = new maps.Geocoder();

      geocoder
        .geocode({
          location: {
            lng: marker.getPosition().lng(),
            lat: marker.getPosition().lat(),
          },
        })
        .then(({ results }) => {
          infowindow.setContent(
            `<div class="pop-up-edit"><p>${results[0].formatted_address}</p></div>`
          );
          setPlaceCustom({
            name: results[0].formatted_address,
            lng: marker.getPosition().lng(),
            lat: marker.getPosition().lat(),
          });
        });
    });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (keyword === "" && marker) {
      setPlaceCustom({
        name: place.name,
        lng: place.lng,
        lat: place.lat,
      });
      marker.setPosition({
        lng: place.lng,
        lat: place.lat,
      });
    }

    if (mapApi && mapContent && keyword !== "" && marker) {
      const geocoder = new mapApi.Geocoder();

      geocoder.geocode({ address: keyword }, (results, status) => {
        if (status === "OK") {
          marker.setPosition({
            lng: results[0].geometry.location.lng(),
            lat: results[0].geometry.location.lat(),
          });
          setPlaceCustom({
            name: results[0].formatted_address,
            lng: results[0].geometry.location.lng(),
            lat: results[0].geometry.location.lat(),
          });
          infoWindowState.setContent(
            `<div class="pop-up-edit"><p>${results[0].formatted_address}</p></div>`
          );
        }
      });
    }
  }, [keyword, mapApi, mapContent, place, marker]);

  const handleEditMarker = () => {
    let placeArr = [];

    markerList.map((m) => {
      if (m.id === "37012e00e59711ed879f024263d4df88") {
        m.deviceList.map((de) => {
          if (de.id === place.id) {
            placeArr = [
              ...placeArr,
              {
                ...de,
                lat: placeCustom.lat,
                lng: placeCustom.lng,
                name: placeCustom.name,
                address: placeCustom.name,
              },
            ];
          } else {
            placeArr = [
              ...placeArr,
              {
                ...de,
              },
            ];
          }
        });
      }
    });

    const params = {
      id: "37012e00e59711ed879f024263d4df88",
      parentId: "f0cd4870e59011ed879f024263d4df88",
      label: "MeLinh-IN",
      groupType: 13,
      deviceList: placeArr,
    };

    editMarkerApi.mutate(params);
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
      className="edit-modal"
    >
      <Typography>Edit Location</Typography>
      <Typography>{place.name}</Typography>
      <Box style={{ width: "100%", height: 200 }}>
        <GoogleMapReact
          bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={{ lat: place.lat, lng: place.lng }}
          defaultZoom={defaultProps.zoom}
          center={{ lat: placeCustom.lat, lng: placeCustom.lng }}
          yesIWantToUseGoogleMapApiInternals
          options={{
            zoomControl: false,
            fullscreenControl: false,
          }}
          draggable
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        />
      </Box>
      <Box mt="20px">
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search by Group ID, Group Name, Address"
          variant="outlined"
          name="keyword"
          size="small"
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
          onChange={handleSearch}
        />
      </Box>
      <Box className={classes.actionButton}>
        <Button
          style={{ background: "#dd3d4b", color: "#fff" }}
          onClick={handleEditMarker}
          disabled={placeCustom.name === place.name}
        >
          <Typography>Confirm</Typography>
        </Button>
        <Button
          onClick={handleClose}
          style={{
            background: "#fff",
            color: "#000",
            border: "1.5px solid #000",
          }}
        >
          <Typography>Cancel</Typography>
        </Button>
      </Box>
    </Card>
  );
};

const useStylesTableBodyGroup = makeStyles({
  actionButton: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    padding: "20px 0 0 0",
    "& button": {
      width: "125px",
      height: "40px",
    },
    "& p": {
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
});

export default React.memo(EditCameraMapModal);
