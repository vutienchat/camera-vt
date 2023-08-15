import React, { useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { jsonAddress } from "../../../jsonAddress";
import PopperAddress from "../../group/PopperAddress";
import { OpenDropIcon } from "../../../common/icons/OpenDropIcon";
import { DropdownIcon } from "../../../common/icons/DropdownIcon";

export const AddressSelectTab = () => {
  const classes = useStylesAddressTab();
  const [openPopper, setOpenPopper] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [idCitySelected, setIdCitySelected] = useState("");
  const [idDistrictSelected, setIdDistrictSelected] = useState("");
  const [idWardSelected, setIdWardSelected] = useState("");

  const citySelected = React.useMemo(() => {
    if (!idCitySelected) return;
    return jsonAddress.find((item) => item.Id === idCitySelected);
  }, [idCitySelected, jsonAddress]);
 
  const districtSelected = React.useMemo(() => {
    if (!(idDistrictSelected || citySelected)) return;
    return citySelected.Districts.find(
      (item) => item.Id === idDistrictSelected
    );
  }, [citySelected, idDistrictSelected]);

  const wardSelected = React.useMemo(() => {
    if (!(idWardSelected || districtSelected)) return;
    return (
      districtSelected &&
      districtSelected.Wards.find((item) => item.Id === idWardSelected)
    );
  }, [districtSelected, idWardSelected]);

  const handleClick = (event) => {
    setOpenPopper((prev) => !prev);
  };

  const onSearch = (list, textSearch) => {
    if (!textSearch.trim()) return list;
    return list.filter(
      (item) => item.Name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
    );
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpenPopper(false);
        setTextSearch("");
      }}
    >
      <Box style={{ position: "relative" }}>
        <Button
          onClick={handleClick}
          className={classes.btnDropdown}
          endIcon={
            openPopper ? (
              <OpenDropIcon color="#939393" />
            ) : (
              <DropdownIcon color="#939393" />
            )
          }
        >
          <Typography>
            {!(citySelected && districtSelected && wardSelected) ? (
              "Address"
            ) : (
              <span>
                {citySelected.Name} - {districtSelected.Name} -{" "}
                {wardSelected.Name}
              </span>
            )}
          </Typography>
        </Button>
        {openPopper && (
          <PopperAddress
            listDistrict={
              (citySelected
                ? onSearch(citySelected.Districts, textSearch)
                : []) || []
            }
            listWards={
              (districtSelected
                ? onSearch(districtSelected.Wards, textSearch)
                : []) || []
            }
            listCity={onSearch(jsonAddress, textSearch)}
            idCitySelected={idCitySelected}
            setIdCitySelected={setIdCitySelected}
            setIdDistrictSelected={setIdDistrictSelected}
            idDistrictSelected={idDistrictSelected}
            idWardSelected={idWardSelected}
            setIdWardSelected={setIdWardSelected}
            setTextSearch={setTextSearch}
            textSearch={textSearch}
            handleClose={() => setOpenPopper(false)}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
};

export const useStylesAddressTab = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    width: "200px",
    background: "#fff",
    border: "1px solid #939393",
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    padding: "15px 23px 15px 23px",
    textTransform: "capitalize",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#939393",
    },
  },
});
