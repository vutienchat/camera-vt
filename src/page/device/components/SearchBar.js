import React from "react";
import { Box, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { SearchIcon } from "../../../common/icons/SearchIcon";

const SEARCH_LENGTH = {
  deviceName: 255,
  addDevice: 255,
};
const SEARCH_PLACEHOLDER = {
  deviceName: "Search by Device Name",
  addDevice: "Search ...",
  group: "Search Group",
  aiFeature: "Search AI Feature",
  deviceType: "Search Device Type",
  featureType: "Search Feature Type",
  storagePlan: "Search Storage Plan",
};

const SearchBar = ({ searchKey, searchBarType, setSearchKey }) => {
  const classes = useStyles();

  const handleChangeKeyword = (event) => {
    if (searchBarType) {
      setSearchKey(event.target.value.slice(0, SEARCH_LENGTH[searchBarType]));
    } else {
      setSearchKey(event.target.value);
    }
  };

  const handleResetTextSearch = () => {
    setSearchKey("");
  };

  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder={SEARCH_PLACEHOLDER[searchBarType]}
      variant="outlined"
      name="keyword"
      className={classes.input}
      value={searchKey}
      onChange={handleChangeKeyword}
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon width={20} height={20} color="rgba(236, 27, 46, 1)" />
          </InputAdornment>
        ),
        endAdornment:
          searchKey.length > 0 ? (
            <InputAdornment position="end">
              <Box
                component="div"
                display="flex"
                alignContent="center"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleResetTextSearch}
              >
                <CloseIcon />
              </Box>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

const useStyles = makeStyles({
  input: {
    borderRadius: 4,
    fontSize: 16,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.10)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.10)",
      borderWidth: "1px",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.10)",
    },
  },
});

export default SearchBar;
