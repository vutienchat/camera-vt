import { useEffect, useState } from "react";
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

const EditCameraMapModal = ({ place, handleClose }) => {
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

  const [statusDragStart, setStatusDragStart] = useState(false);

  const classes = useStylesTableBodyGroup();

  const apiHasLoaded = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      icon: {
        url: require("../../../../asset/carbon_location-company.png"),
      },
      draggable: true,
    });

    setMarker(marker);
    setMapContent(map);
    setMapApi(maps);

    marker.addListener("dragstart", () => {
      setStatusDragStart(true);
    });

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
          setPlaceCustom({
            name: results[0].formatted_address,
            lng: marker.getPosition().lng(),
            lat: marker.getPosition().lat(),
          });
          setStatusDragStart(false);
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
          //mapApi.setCenter({ lat, lng });
        } else {
        }
      });
    }
  }, [keyword, mapApi, mapContent, place, marker]);

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
      <Typography>{place.title}</Typography>
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
        >
          <Box
            lat={placeCustom.lat}
            lng={placeCustom.lng}
            style={{ display: statusDragStart ? "none" : "block" }}
          >
            <Box
              style={{
                position: "absolute",
                top: "-100px",
                padding: "10px",
                transform: "translateX(-50%)",
                left: "50%",
                backgroundColor: "rgba(221, 61, 75, 1)",
                width: "200px",
              }}
            >
              <Typography
                style={{
                  color: "#fff",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: 180,
                  margin: "auto",
                  fontSize: "12px",
                }}
              >
                {placeCustom.name}
              </Typography>
              <Box
                style={{
                  position: "absolute",
                  top: "100%",
                  width: 0,
                  height: 0,
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: `14px solid #DD3D4B`,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </Box>
          </Box>
        </GoogleMapReact>
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
        <Button style={{ background: "#dd3d4b", color: "#fff" }}>
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

export default EditCameraMapModal;
