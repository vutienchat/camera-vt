import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Tooltip,
  Typography,
} from "@material-ui/core";

import UpIcon from "../Icon/UpIcon";
import DropDownIcon from "../Icon/DropDownIcon";
import { lowerCaseStringCustom } from "../utils";
import SearchBar from "./CommonSearchBar";

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
    width: "360px",
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

export default function SelectMultiple({
  width,
  btnText,
  titleDropdownText,
  list,
  handleCheckData,
  positionDropDown = "left",
  searchBarType,
}) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [listFilter, setListFilter] = useState(list);
  useEffect(() => {
    if (textSearch) {
      setListFilter(
        [...list].filter((item) => item.label.includes(textSearch))
      );
    } else {
      setListFilter(list);
    }
  }, [textSearch, list]);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const handleCheck = useCallback(
    (arr) => {
      if (handleCheckData) {
        handleCheckData(arr);
      }
    },
    [handleCheckData]
  );

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      let itemsArr = [...selected];
      list.forEach((item) => {
        if (!selected.includes(String(item.value))) {
          itemsArr.push(String(item.value));
        }
      });

      setSelected(itemsArr);
      handleCheck(itemsArr);
    } else {
      setSelected([]);
      handleCheck([]);
    }
  };

  const handleCheckItem = (event) => {
    let itemsArr = [...selected];
    if (event.target.checked) {
      itemsArr.push(event.target.value);
    } else {
      itemsArr = [...itemsArr].filter((item) => item !== event.target.value);
    }
    setSelected(itemsArr);
    handleCheck(itemsArr);
  };

  const valueBtn = useMemo(() => {
    if (selected.length === listFilter.length) {
      return lowerCaseStringCustom(0, btnText);
    }
    if (selected.length === 1) {
      return selected[0];
    }
    if (selected.length) return lowerCaseStringCustom(selected.length, btnText);
    return btnText;
  }, [btnText, selected, listFilter]);

  return (
    <Box style={{ minWidth: width || "auto" }} key={searchBarType}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <Button
            type="button"
            onClick={handleClick}
            variant="outlined"
            className={classes.btnDropdown}
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
            <Box className={classes.dropdown} style={{ [positionDropDown]: 0 }}>
              <SearchBar
                searchKey={textSearch}
                searchBarType={searchBarType}
                setSearchKey={setTextSearch}
              />
              <Box
                style={{
                  marginTop: "12px",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
                className={classes.menu}
              >
                {titleDropdownText && listFilter.length > 0 && (
                  <React.Fragment>
                    <label className={classes.listItem}>
                      <Checkbox
                        onChange={handleCheckAll}
                        className={`${classes.checkBoxed} ${
                          listFilter &&
                          selected.length === listFilter.length &&
                          classes.checked
                        }`}
                        checked={
                          listFilter && selected.length === listFilter.length
                        }
                        style={{ padding: 0 }}
                      />
                      <Typography>{titleDropdownText}</Typography>
                    </label>
                    <Divider style={{ width: "100%" }} />
                  </React.Fragment>
                )}
                {listFilter.length > 0 ? (
                  listFilter.map((item) => {
                    const isChecked = selected.includes(String(item.value));
                    return (
                      <Box key={item.value}>
                        <label
                          key={item.value}
                          className={`${classes.listItem} ${
                            isChecked && classes.isChecked
                          }`}
                        >
                          <Checkbox
                            id={String(item.value)}
                            value={String(item.value)}
                            onChange={handleCheckItem}
                            checked={isChecked}
                            className={`${classes.checkBoxed} ${
                              isChecked && classes.checked
                            }`}
                          />
                          <Tooltip title={item.label}>
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
                          </Tooltip>
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
              </Box>
            </Box>
          ) : null}
        </div>
      </ClickAwayListener>
    </Box>
  );
}
