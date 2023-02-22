import { Box, InputAdornment, TextField, Typography } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const RenderDataSide = ({
  renderData,
  data,
  classes,
  selectType,
  setSelectType,
  isCamera,
  isSearch,
  handleShowPopupSelect,
}) => {
  return (
    <>
      {isCamera && (
        <Box style={{ display: "flex", width: "400px", marginLeft: "-17px" }}>
          <Box
            style={{
              borderRight: "solid 1px #e5e5e5",
            }}
            className={`${classes.boxHead} ${
              selectType === "siteGroup" ? classes.active : ""
            }`}
            onClick={() => setSelectType("siteGroup")}
          >
            <LocationOnOutlinedIcon />
            <Typography style={{ marginRight: 25 }}>Site Group</Typography>
          </Box>
          <Box
            className={`${classes.boxHead} ${
              selectType === "location" ? classes.active : ""
            }`}
            onClick={() => setSelectType("location")}
          >
            <LocationOnOutlinedIcon />
            <Typography style={{ marginRight: 25 }}>Location</Typography>
          </Box>
        </Box>
      )}

      {isSearch && (
        <Box style={{ marginTop: 20 }}>
          <TextField
            placeholder="Search"
            size="small"
            variant="outlined"
            style={{ width: 365 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "red" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      {renderData(data, classes, handleShowPopupSelect)}
    </>
  );
};

export default React.memo(RenderDataSide);
