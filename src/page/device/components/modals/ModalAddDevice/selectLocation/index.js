import React, { useRef, useState } from "react";
import {
  Box,
  Grid,
  Popover,
  Popper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import MapCustom, { API_KEY } from "../../../maps/Map";
import SearchBar from "../../../CommonSearchBar";
import BaseButton from "../../../BaseButton";
import {
  Autocomplete,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";
import { useFormContext } from "react-hook-form";
const placesLibrary = ["places"];

const SelectLocation = ({
  open,
  anchorEl,
  handleClose,
  location,
  setMarkerAddress,
  markerPosition,
  setMarkerPosition,
}) => {
  const classes = useStyles();
  const { setValue } = useFormContext();
  const [searchKey, setSearchKey] = useState("");
  //   const [searchResult, setSearchResult] = useState("");
  const [newMarkerPosition, setNewMarkerPosition] = useState({
    ...markerPosition,
  });
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  console.log("markerPosition", markerPosition);

  const getAddressMarker = async (position) => {
    const geocoder = new window.google.maps.Geocoder();
    await geocoder
      .geocode({
        location: {
          lng: position.lng,
          lat: position.lat,
        },
      })
      .then(({ results }) => {
        setMarkerAddress(results[0].formatted_address);
        return results[0].formatted_address;
      });
  };

  return (
    <Popover
      //   id={"simple-popper"}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      className={classes.paper}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box style={{ width: 420, height: "400" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, fontSize: 14 }}>
              Select Location
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MapCustom
              location={location}
              setMarkerAddress={setMarkerAddress}
              markerPosition={newMarkerPosition}
              setMarkerPosition={setNewMarkerPosition}
              isDrag={true}
              map={map}
              setMaps={setMap}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <Autocomplete
                onPlaceChanged={onPlaceChanged}
                onLoad={onAutocompleteLoad}
              > */}
            <SearchBar
              setSearchKey={setSearchKey}
              searchKey={searchKey}
              searchBarType={"addDevice"}
            />
            {/* <TextField ref={inputRef} /> */}
            {/* </Autocomplete> */}
          </Grid>
          <Grid item xs={12} container spacing={1} justifyContent="center">
            <Grid item xs={4}>
              <BaseButton
                label={"Confirm"}
                type={"redBackground"}
                onClick={() => {
                  setNewMarkerPosition(newMarkerPosition);
                  if (
                    newMarkerPosition &&
                    Object.keys(newMarkerPosition).length
                  ) {
                    Object.keys(newMarkerPosition).forEach((it) => {
                      setValue(it, newMarkerPosition[it]);
                    });
                  }
                  getAddressMarker(newMarkerPosition);
                  handleClose();
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <BaseButton
                label={"Cancel"}
                type={"normal"}
                onClick={handleClose}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    "& .MuiPopover-paper": {
      minHeight: 250,
      border: "1px solid #d5d5d7",
      padding: 10,
    },
  },
}));

export default SelectLocation;
