import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import ModalCustomResolution from "./modals/ModalCustomResolution";
import { DropDownIcon, UpIcon } from "../../../../Icon";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  btnDropdown: {
    position: "absolute",
    padding: "0 16px 0 24px",
    borderRadius: "4px",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "none",
    cursor: "pointer",
    color: "#222",
    fontWeight: 500,
    border: "1px solid rgba(0, 0, 0, 0.10)",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      fontWeight: "normal",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    zIndex: 50,
    width: "280px",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  listItem: {
    padding: "8px 12px 8px 16px",
    color: "#000000",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    // justifyContent: "space-between",
    gap: 15,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#f6f4f5",
    },
  },
  isChecked: { backgroundColor: "#f6f4f5", "& p": { fontWeight: 600 } },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "#b3b3b3" },
  },
  checked: {
    "& svg": { color: "#dd3d4b !important" },
  },
  menu: {
    "&::-webkit-scrollbar": {
      width: "5px",
    },

    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
}));

export default function SelectCustom({
  width,
  btnText,
  titleDropdownText,
  list,
  positionDropDown = "left",
  listObject,
  searchBarType,
  dropdownWidth,
  name,
  height,
  minHeight,
  type,
}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const { setValue, watch } = useFormContext();
  const [openModalCustom, setOpenModalCustom] = useState({
    type: "",
    open: false,
  });

  useEffect(() => {
    const dataSelect = watch(name);
    if (dataSelect) {
      setSelected([dataSelect]);
    }
  }, []);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const valueBtn = useMemo(() => {
    if (selected.length === 1) {
      if (Object.keys(listObject).includes(selected[0])) {
        return listObject[selected[0]].label;
      }
      return "Custom";
    }
    return btnText;
  }, [btnText, selected, listObject, titleDropdownText]);

  const handleChooseObject = (value) => {
    let itemsArr = [];
    itemsArr.push(value);
    setSelected(itemsArr);
    setValue(name, itemsArr[0]);
  };

  const handleAddCustom = (data) => {
    console.log("data", data);
    setValue(name, `${data.width}x${data.height}`);
  };

  return (
    <Box
      style={{
        minWidth: width || "auto",
        minHeight: minHeight || 40,
        height: height || 40,
      }}
      key={searchBarType}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <Button
            type="button"
            onClick={handleClick}
            variant="outlined"
            className={classes.btnDropdown}
            style={{
              height: height || 40,
            }}
            endIcon={
              isOpen ? (
                <UpIcon color="#939393" />
              ) : (
                <DropDownIcon color="#939393" />
              )
            }
          >
            <Typography>{valueBtn}</Typography>
          </Button>
          {isOpen ? (
            <Box
              className={classes.dropdown}
              style={{ [positionDropDown]: 0, width: dropdownWidth || "280px" }}
            >
              <Box
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  marginTop: 10,
                }}
                className={classes.menu}
              >
                {list.length > 0 ? (
                  list.map((item) => {
                    const isChecked = selected.includes(item.value);
                    return (
                      <Box key={item.value}>
                        <label
                          key={item.value}
                          className={`${classes.listItem} ${
                            isChecked && classes.isChecked
                          }`}
                          onClick={() => {
                            handleChooseObject(item.value);
                          }}
                        >
                          <Typography
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              flex: 1,
                              overflow: "hidden",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </label>
                        <Divider style={{ width: "100%" }} />
                      </Box>
                    );
                  })
                ) : (
                  <Box>
                    <Typography style={{ paddingLeft: 16, fontSize: 16 }}>
                      No result
                    </Typography>
                  </Box>
                )}
                <Box key={"custom"}>
                  <label
                    key={"custom"}
                    className={`${classes.listItem} ${
                      selected.includes("custom") && classes.isChecked
                    }`}
                    onClick={() => {
                      setOpenModalCustom((prev) => ({
                        ...prev,
                        open: true,
                        type: type,
                      }));
                      //   handleChooseObject();
                    }}
                  >
                    <Typography
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                        overflow: "hidden",
                      }}
                    >
                      Custom
                    </Typography>
                  </label>
                  <Divider style={{ width: "100%" }} />
                </Box>
              </Box>
            </Box>
          ) : null}
        </div>
      </ClickAwayListener>
      {openModalCustom.open && (
        <ModalCustomResolution
          open={openModalCustom.open}
          handleClose={() => {
            setOpenModalCustom((prev) => ({ ...prev, open: false }));
          }}
          type={type}
          handleSubmit={handleAddCustom}
        />
      )}
    </Box>
  );
}
