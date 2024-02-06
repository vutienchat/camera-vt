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
  const [searchKey, setSearchKey] = useState("");
  //   const [searchResult, setSearchResult] = useState("");
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  return (
    <Popover
      //   id={"simple-popper"}
      open={open}
      anchorEl={anchorEl}
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
              markerPosition={markerPosition}
              setMarkerPosition={setMarkerPosition}
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
                onClick={() => {}}
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
