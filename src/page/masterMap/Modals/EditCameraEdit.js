import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../../common/icons/SearchIcon";
import useDebounce from "../../../hooks/useDebounce";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { MasterMapContext } from "../MasterMap";
import { useMutation } from "@tanstack/react-query";
import { editMarker } from "../../../utils/api/map";

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
  zoom: 10,
};

const EditCameraMapModal = ({ place, handleClose }) => {
  const { setPlaces, markerList } = useContext(MasterMapContext);

  const classes = useStylesTableBodyGroup();

  const [searchValue, setSearchValue] = useState("");

  const [placeCustom, setPlaceCustom] = useState({
    name: place.name,
    lng: place.lng,
    lat: place.lat,
  });

  const keyword = useDebounce(searchValue, 1000);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setPlaceCustom({
      name: place.name,
      lng: place.lng,
      lat: place.lat,
    });
  }, [place]);

  const handleDragMarker = (event) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder
      .geocode({
        location: {
          lng: event.latLng.lng(),
          lat: event.latLng.lat(),
        },
      })
      .then(({ results }) => {
        setPlaceCustom({
          name: results[0].formatted_address,
          lng: event.latLng.lng(),
          lat: event.latLng.lat(),
        });
      });
  };

  const editMarkerApi = useMutation({
    mutationFn: async (param) => editMarker(param),
    onSuccess: () => {
      setPlaces((prev) =>
        prev.map((mark) => {
          if (mark.id === place.id) {
            return {
              ...mark,
              name: placeCustom.name,
              lng: placeCustom.lng,
              lat: placeCustom.lat,
            };
          } else {
            return { ...mark };
          }
        })
      );
      handleClose();
    },
    onError: () => {
      console.log("Error");
    },
  });

  useEffect(() => {
    if (keyword !== "") {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: keyword }, (results, status) => {
        if (status === "OK") {
          setPlaceCustom({
            name: results[0].formatted_address,
            lng: results[0].geometry.location.lng(),
            lat: results[0].geometry.location.lat(),
          });
        }
      });
    }
  }, [keyword]);

  const handleEditMarker = () => {
    let placeArr = [];

    markerList.data.map((m) => {
      if (m.id === "37012e00e59711ed879f024263d4df88") {
        m.deviceList.map((de) => {
          if (de.id === place.id) {
            placeArr = [
              ...placeArr,
              {
                ...de,
                lat: placeCustom.lat,
                lng: placeCustom.lng,
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
        <GoogleMap
          zoom={defaultProps.zoom}
          center={defaultProps.center}
          mapContainerClassName="map-container-edit"
          clickableIcons={false}
        >
          <Marker
            position={{
              lng: parseFloat(placeCustom.lng),
              lat: parseFloat(placeCustom.lat),
            }}
            draggable
            onDragEnd={handleDragMarker}
            icon={{
              url: require("../../../asset/carbon_location-company.png"),
            }}
          />
          <InfoWindow
            position={{
              lng: parseFloat(placeCustom.lng),
              lat: parseFloat(placeCustom.lat),
            }}
            options={{
              position: "relative",
              pixelOffset: { width: 0, height: -40 },
            }}
            className="infoWindow"
          >
            <Box padding={1}>
              <Typography style={{ color: "#fff" }}>
                {placeCustom.name}
              </Typography>
            </Box>
          </InfoWindow>
        </GoogleMap>
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

export default EditCameraMapModal;
