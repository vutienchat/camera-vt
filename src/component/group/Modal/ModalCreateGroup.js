import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Switch,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import PopperAddress from "../PopperAddress";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { jsonAddress } from "../../../jsonAddress";
import DropdownCustom from "../DropdownCustom";
import { GroupTypes } from "../../../until/type";
import CreateUser from "../CreateUser";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addGroup } from "../../../until/api";

export const useStylesModalCreate = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    width: 450,
    border: "solid 1px #bababb",
    background: "#fff",
    height: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    paddingLeft: 20,
    "& p": {
      color: "#bababb",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& span": {
      color: "#333",
    },
  },
  Row: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "20px",
  },
  TextFieldCenter: {
    width: 140,
    "& .MuiOutlinedInput-inputMarginDense": {
      textAlign: "center",
    },
  },
  Description: {
    fontSize: 12,
    paddingTop: 5,
    fontStyle: "italic",
  },
});

const ModalCreateGroup = ({ open, handleClose }) => {
  const classes = useStylesModalCreate();
  const [openPopper, setOpenPopper] = useState(false);
  const [openGroupType, setOpenGroupType] = useState(false);
  const [isParentGroup, setIsParentGroup] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [idCitySelected, setIdCitySelected] = useState("");
  const [idDistrictSelected, setIdDistrictSelected] = useState("");
  const [idWardSelected, setIdWardSelected] = useState("");
  const [typeGroup, setTypeGroup] = useState();
  const [isCheckedCreateUser, setIsCheckedCreateUser] = useState(false);
  const [userType, setUserType] = useState();
  const [userRole, setUserRole] = useState();
  const [dataSubmit, setDataSubmit] = useState();

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

  const onSearchTypes = (list, textSearch) => {
    if (!textSearch.trim()) return list;
    return list.filter(
      (item) =>
        item.label.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
    );
  };

  const handleSelectTypeGroup = (value) => {
    setTypeGroup(value);
    setOpenGroupType(false);
    setDataSubmit({ ...dataSubmit, type: Number(value.id) });
  };

  const onChangeDataSubmit = (value, key) => {
    setDataSubmit((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  //api

  const handleCreateGroup = useMutation((formData) => addGroup(formData));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth="xl"
      className={classes.root}
    >
      <Box
        style={{
          width: 1000,
          height: "auto",
          overflowY: "auto",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}> Create New Group</Typography>
        </Box>
        <Box style={{ height: "auto", padding: "8px 24px" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  Group Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  onChange={(e) => onChangeDataSubmit(e.target.value, "name")}
                />
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>Phone</Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  onChange={(e) => onChangeDataSubmit(e.target.value, "phone")}
                />
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  Address <span style={{ color: "red" }}>*</span>
                </Typography>
                <ClickAwayListener
                  onClickAway={() => {
                    setOpenPopper(false);
                    setTextSearch("");
                  }}
                >
                  <Box style={{ position: "relative" }}>
                    <button
                      onClick={handleClick}
                      className={classes.btnDropdown}
                    >
                      <Typography>
                        {!(citySelected && districtSelected && wardSelected) ? (
                          "Province/City, District, Ward"
                        ) : (
                          <span>
                            {citySelected.Name} - {districtSelected.Name} -{" "}
                            {wardSelected.Name}
                          </span>
                        )}
                      </Typography>
                      <ArrowDropDownIcon />
                    </button>
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
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>Email</Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  onChange={(e) => onChangeDataSubmit(e.target.value, "email")}
                />
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  Address Detail <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  onChange={(e) =>
                    onChangeDataSubmit(e.target.value, "addressDetail")
                  }
                />
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  Group Type <span style={{ color: "red" }}>*</span>
                </Typography>
                <ClickAwayListener
                  onClickAway={() => {
                    setOpenGroupType(false);
                    setTextSearch("");
                  }}
                >
                  <Box style={{ position: "relative" }}>
                    <button
                      onClick={() => setOpenGroupType((prev) => !prev)}
                      className={classes.btnDropdown}
                    >
                      <Typography>
                        {typeGroup ? (
                          <span>{GroupTypes[typeGroup.id].label}</span>
                        ) : (
                          "Type Group"
                        )}
                      </Typography>
                      <ArrowDropDownIcon />
                    </button>
                    {openGroupType && (
                      <DropdownCustom
                        listData={onSearchTypes(
                          Object.values(GroupTypes),
                          textSearch
                        )}
                        setTypeSelected={handleSelectTypeGroup}
                        setTextSearch={setTextSearch}
                        typeSelected={typeGroup}
                        textSearch={textSearch}
                      />
                    )}
                  </Box>
                </ClickAwayListener>
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography>Parent Group</Typography>
                <ClickAwayListener onClickAway={() => setIsParentGroup(false)}>
                  <Box style={{ position: "relative" }}>
                    <button
                      onClick={() => setIsParentGroup((prev) => !prev)}
                      className={classes.btnDropdown}
                    >
                      <Typography>
                        {typeGroup ? (
                          <span>{GroupTypes[typeGroup.id].label}</span>
                        ) : (
                          "Type Group"
                        )}
                      </Typography>
                      <ArrowDropDownIcon />
                    </button>
                    {isParentGroup && (
                      <DropdownCustom
                        listData={onSearchTypes(
                          Object.values(GroupTypes),
                          textSearch
                        )}
                        setTypeSelected={setTypeGroup}
                        setTextSearch={setTextSearch}
                        typeSelected={typeGroup}
                        textSearch={textSearch}
                      />
                    )}
                  </Box>
                </ClickAwayListener>
                <Typography className={classes.Description}>
                  Skip if you create a level 1 group
                </Typography>
              </Box>
              {typeGroup && typeGroup.id === "20" && (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: 450,
                  }}
                >
                  <Typography>
                    Camera Limited <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    className={classes.TextFieldCenter}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              )}
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Switch
                  onChange={(e) => setIsCheckedCreateUser(e.target.checked)}
                />
                <Typography>Create User account</Typography>
              </Box>
            </Box>
            {isCheckedCreateUser && (
              <CreateUser
                onSearchTypes={onSearchTypes}
                setUserType={setUserType}
                userType={userType}
                setUserRole={setUserRole}
                userRole={userRole}
                setDataSubmit={setDataSubmit}
                onChangeDataSubmit={onChangeDataSubmit}
              />
            )}
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 24px 0",
          }}
        >
          <Button
            onClick={() => {
              handleCreateGroup.mutate({
                ...dataSubmit,
                address: {
                  province: citySelected.Id,
                  district: districtSelected.Id,
                  ward: wardSelected.Id,
                },
                parentId: "",
              });
            }}
            style={{
              width: "120px",
              height: "35px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
              marginRight: 10,
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            style={{
              width: "120px",
              height: "35px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
              marginLeft: 10,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalCreateGroup);
