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

export const useStylesAddressTab = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    border: "solid 1px #bababb",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

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
          fullWidth
          endIcon={openPopper ? <OpenDropIcon /> : <DropdownIcon />}
        >
          {!(citySelected && districtSelected && wardSelected) ? (
            "Address"
          ) : (
            <span>
              {citySelected.Name} - {districtSelected.Name} -{" "}
              {wardSelected.Name}
            </span>
          )}
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
