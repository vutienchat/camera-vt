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
  isMulti,
  handleMultiSelect,
}) => {
  return (
    <>
      {isCamera && (
        <Box
          style={{ display: "flex", width: "344px", justifyContent: "center" }}
        >
          <Box
            style={{
              borderRight: "solid 1px #e5e5e5",
            }}
            className={`${classes.boxHead} ${
              selectType === "siteGroup" ? classes.active : ""
            }`}
            onClick={() => setSelectType("siteGroup")}
          >
            <Typography>Site Group</Typography>
          </Box>
          <Box
            className={`${classes.boxHead} ${
              selectType === "location" ? classes.active : ""
            }`}
            onClick={() => setSelectType("location")}
          >
            <Typography>Location</Typography>
          </Box>
        </Box>
      )}

      {isSearch && (
        <Box
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <TextField
            placeholder="Search"
            size="medium"
            variant="outlined"
            style={{ width: 320 }}
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
      
      {renderData(
        data,
        classes,
        handleShowPopupSelect,
        false,
        isMulti,
        handleMultiSelect
      )}
    </>
  );
};

export default React.memo(RenderDataSide);
