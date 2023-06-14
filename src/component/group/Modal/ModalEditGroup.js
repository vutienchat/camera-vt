import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PopperAddress from "../PopperAddress";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { jsonAddress } from "../../../jsonAddress";
import DropdownCustom from "../DropdownCustom";
import { GroupTypes, typeErrForm } from "../../../until/type";
import { emailRegex, nameGroupRegex, phoneRegex } from "../../../until/regex";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { editGroupApi } from "../../../until/api";
import { onSearchAddress, onSearchTypes } from "../../../until/common";
import { footerModalStyle } from "../../../until/style-common";

export const useStylesModalCreate = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "12px",
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
    cursor: "pointer",
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
  labelInput: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    paddingBottom: "5px",
  },
});

const ModalEditGroup = ({ open, handleClose, dataGroup }) => {
  const footerClass = footerModalStyle();
  const classes = useStylesModalCreate();
  const [openPopper, setOpenPopper] = useState(false);
  const [openGroupType, setOpenGroupType] = useState(false);
  const [isParentGroup, setIsParentGroup] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [provinceSelected, setProvinceSelected] = useState();
  const [districtSelected, setDistrictSelected] = useState();
  const [wardSelected, setWardSelected] = useState();
  const [typeGroup, setTypeGroup] = useState();
  const [dataSubmit, setDataSubmit] = useState({ ...dataGroup });
  const [messErr, setMessErr] = useState({
    groupErr: "",
    addressErr: "",
    addressDetailErr: "",
    phoneErr: "",
    emailErr: "",
    typeGroupErr: "",
    accessKey: "",
    secretKey: "",
  });

  const disableBtn = React.useMemo(() => {
    let disable = true;
    if (
      Object.keys(dataSubmit).length &&
      dataSubmit.name &&
      dataSubmit.districtId &&
      dataSubmit.wardId &&
      dataSubmit.provinceId &&
      dataSubmit.phone &&
      dataSubmit.type
    ) {
      if (
        !messErr.groupErr &&
        !messErr.addressErr &&
        !messErr.addressDetailErr &&
        !messErr.phoneErr &&
        !messErr.emailErr &&
        !messErr.typeGroupErr
      ) {
        disable = false;
      }
      if (dataSubmit.type === 20 && !dataSubmit.cameraLimited) {
        disable = true;
      }
    }
    return disable;
  }, [dataSubmit, messErr]);

  useEffect(() => {
    if (dataSubmit.provinceId && dataSubmit.districtId && dataSubmit.wardId) {
      const provinceSelected = jsonAddress.find(
        (item) => item.Id === dataSubmit.provinceId
      );
      const districtSelected = provinceSelected.Districts.find(
        (item) => item.Id === dataSubmit.districtId
      );
      const wardSelected = districtSelected.Wards.find(
        (it) => it.Id === dataSubmit.wardId
      );
      setProvinceSelected(provinceSelected);
      setDistrictSelected(districtSelected);
      setWardSelected(wardSelected);
    }
  }, [dataSubmit.provinceId, dataSubmit.districtId, dataSubmit.wardId]);

  useEffect(() => {
    if (dataSubmit.type) {
      const typeSelected = Object.values(GroupTypes).find(
        (it) => it.id === String(dataSubmit.type)
      );
      setTypeGroup(typeSelected);
    }
  }, [dataSubmit.type]);

  const changMessErr = (key, value) => {
    setMessErr((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeDataSubmit = (value, key) => {
    setDataSubmit((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  // blur form
  const onBlurGroupName = (value) => {
    let groupErr = "";
    if (!(value || value.trim())) groupErr = typeErrForm["emptyNameGroup"];
    if (value && !nameGroupRegex.test(value))
      groupErr = typeErrForm["invalidGroup"];
    changMessErr("groupErr", groupErr);
  };

  const onBlurAddress = (dataSubmit) => {
    let addressErr = "";
    if (!dataSubmit.provinceId || !dataSubmit.districtId || !dataSubmit.wardId)
      addressErr = typeErrForm["emptyAddress"];

    changMessErr("addressErr", addressErr);
  };

  const onBlurPhone = (value) => {
    let phoneErr = "";
    if (!(value || value.trim())) phoneErr = typeErrForm["emptyPhone"];
    if (value && !phoneRegex.test(value))
      phoneErr = typeErrForm["invalidPhone"];
    changMessErr("phoneErr", phoneErr);
  };

  const onBlurEmail = (value) => {
    let emailErr = "";
    if (!(value || value.trim())) emailErr = typeErrForm["emptyEmail"];

    if (value && !emailRegex.test(value))
      emailErr = typeErrForm["invalidEmail"];

    changMessErr("emailErr", emailErr);
  };

  const onBlurAddressDetail = (value) => {
    let addressDetailErr = "";
    if (!(value || value.trim()))
      addressDetailErr = typeErrForm["emptyAddressDetail"];

    if (value && value.length < 6)
      addressDetailErr = typeErrForm["addressDetailInvalid"];
    changMessErr("addressDetailErr", addressDetailErr);
  };

  const onBlurGroupType = (value) => {
    let typeGroupErr = "";
    if (!value) typeGroupErr = typeErrForm["emptyTypeGroup"];
    changMessErr("typeGroupErr", typeGroupErr);
  };

  //onchange address
  const changeProvince = (province) => {
    setProvinceSelected(province);
    onChangeDataSubmit(province.Id, "provinceId");
    onChangeDataSubmit("", "districtId");
    setDistrictSelected(undefined);
  };

  const changeDistrict = (district) => {
    setDistrictSelected(district);
    onChangeDataSubmit(district.Id, "districtId");
    onChangeDataSubmit("", "wardId");
    setWardSelected(undefined);
  };

  const changeWard = (ward) => {
    setWardSelected(ward);
    onChangeDataSubmit(ward.Id, "wardId");
    onBlurAddress({ ...dataSubmit, wardId: ward.Id });
  };

  const handleClick = (event) => {
    setOpenPopper((prev) => !prev);
  };

  const handleSelectTypeGroup = (value) => {
    setTypeGroup(value);
    setOpenGroupType(false);
    onChangeDataSubmit(Number(value.id), "type");
    onBlurGroupType(value.id);
  };

  // api
  const editGroup = useMutation((data) => editGroupApi(data.id, data));

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
          <Typography style={{ fontWeight: 800 }}> Edit Group</Typography>
        </Box>
        <Box style={{ height: "auto", padding: "8px 24px" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Group Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  value={dataSubmit.name}
                  onChange={(e) => {
                    onBlurGroupName(e.target.value);
                    onChangeDataSubmit(e.target.value, "name");
                  }}
                  onBlur={(e) => onBlurGroupName(e.target.value)}
                  error={messErr.groupErr !== ""}
                />
                {messErr.groupErr && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {messErr.groupErr}
                  </span>
                )}
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>Phone</Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  value={dataSubmit.phone}
                  onChange={(e) => {
                    onBlurPhone(e.target.value);
                    onChangeDataSubmit(e.target.value, "phone");
                  }}
                  onBlur={(e) => onBlurPhone(e.target.value)}
                  error={messErr.phoneErr !== ""}
                />
                {messErr.phoneErr && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {messErr.phoneErr}
                  </span>
                )}
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Address <span style={{ color: "red" }}>*</span>
                </Typography>
                <ClickAwayListener
                  onClickAway={() => {
                    if (openPopper) onBlurAddress(dataSubmit);
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
                        {!(
                          provinceSelected &&
                          districtSelected &&
                          wardSelected
                        ) ? (
                          "Province/City, District, Ward"
                        ) : (
                          <span>
                            {provinceSelected.Name} - {districtSelected.Name} -{" "}
                            {wardSelected.Name}
                          </span>
                        )}
                      </Typography>
                      <ArrowDropDownIcon
                        style={{ color: "#939393", fontSize: "30px" }}
                      />
                    </button>
                    {openPopper && (
                      <PopperAddress
                        listDistrict={
                          provinceSelected
                            ? onSearchAddress(
                                provinceSelected.Districts,
                                textSearch
                              )
                            : []
                        }
                        listWards={
                          districtSelected
                            ? onSearchAddress(
                                districtSelected.Wards,
                                textSearch
                              )
                            : []
                        }
                        listCity={onSearchAddress(jsonAddress, textSearch)}
                        setProvinceSelected={changeProvince}
                        setDistrictSelected={changeDistrict}
                        provinceSelected={provinceSelected}
                        districtSelected={districtSelected}
                        wardSelected={wardSelected}
                        setWardSelected={changeWard}
                        setTextSearch={setTextSearch}
                        textSearch={textSearch}
                        handleClose={() => setOpenPopper(false)}
                      />
                    )}
                  </Box>
                </ClickAwayListener>
                {messErr.addressErr && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {messErr.addressErr}
                  </span>
                )}
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>Email</Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  value={dataSubmit.email}
                  onChange={(e) => {
                    onBlurEmail(e.target.value);
                    onChangeDataSubmit(e.target.value, "email");
                  }}
                  onBlur={(e) => onBlurEmail(e.target.value)}
                  error={messErr.emailErr !== ""}
                />
                {messErr.emailErr && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {messErr.emailErr}
                  </span>
                )}
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Address Detail <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  value={dataSubmit.addressDetail}
                  onChange={(e) => {
                    onBlurAddressDetail(e.target.value);
                    onChangeDataSubmit(e.target.value, "addressDetail");
                  }}
                  onBlur={(e) => {
                    onBlurAddressDetail(e.target.value);
                  }}
                  error={messErr.addressDetailErr !== ""}
                />
                {messErr.addressDetailErr && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {messErr.addressDetailErr}
                  </span>
                )}
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Access Key <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  value={dataSubmit.accessKey}
                />
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Group Type <span style={{ color: "red" }}>*</span>
                </Typography>
                <ClickAwayListener
                  onClickAway={() => {
                    setOpenGroupType(false);
                    setTextSearch("");
                    if (openGroupType) onBlurGroupType(dataSubmit.type);
                  }}
                >
                  <Box style={{ position: "relative" }}>
                    <button
                      onClick={() => {
                        setOpenGroupType((prev) => {
                          if (prev) onBlurGroupType(dataSubmit.type);
                          return !prev;
                        });
                      }}
                      className={classes.btnDropdown}
                    >
                      <Typography>
                        {typeGroup ? (
                          <span>{GroupTypes[typeGroup.id].label}</span>
                        ) : (
                          "Type Group"
                        )}
                      </Typography>
                      <ArrowDropDownIcon
                        style={{ color: "#939393", fontSize: "30px" }}
                      />
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
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Secret Key <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  style={{ width: 450 }}
                  variant="outlined"
                  size="small"
                  value={dataSubmit.secretKey}
                />
              </Box>
            </Box>
            <Box className={classes.Row}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: 450,
                }}
              >
                {typeGroup && typeGroup.id === "20" && (
                  <React.Fragment>
                    <Typography className={classes.labelInput}>
                      Camera Limited <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <TextField
                      className={classes.TextFieldCenter}
                      variant="outlined"
                      size="small"
                      value={dataSubmit.cameraLimited}
                      error={
                        typeGroup &&
                        typeGroup.id === "20" &&
                        !dataSubmit.cameraLimited
                      }
                      onChange={(e) => {
                        if (_.isInteger(Number(e.target.value))) {
                          onChangeDataSubmit(
                            Number(e.target.value),
                            "cameraLimited"
                          );
                        }
                      }}
                    />
                  </React.Fragment>
                )}
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography className={classes.labelInput}>
                  Parent Group
                </Typography>
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
                      <ArrowDropDownIcon
                        style={{ color: "#939393", fontSize: "30px" }}
                      />
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
            </Box>
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
              editGroup.mutate(dataSubmit);
            }}
            className={footerClass.btnSubmit}
            disabled={disableBtn}
          >
            Save
          </Button>
          <Button onClick={handleClose} className={footerClass.btnCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalEditGroup);
