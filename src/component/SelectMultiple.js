import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { OpenDropIcon } from "../common/icons/OpenDropIcon";
import { DropdownIcon } from "../common/icons/DropdownIcon";
import { SearchIcon } from "../common/icons/SearchIcon";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
  btnDropdown: {
    padding: "14px 16px 13px",
    borderRadius: "4px",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "capitalize",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      fontWeight: "bold",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    zIndex: 50,
    border: "1px solid",
    width: "400px",
    padding: "10px",
    backgroundColor: "#fff",
  },
  listItem: {
    padding: "5px 0",
    lineHeight: "18.4px",
    color: "#000000",
    cursor: "pointer",
    fontSize: "16px",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "#fff1f2",
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
}) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSeleted] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [listFilter, setListFilter] = useState(list);

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
        if (!selected.includes(item.value)) {
          itemsArr.push(item.value);
        }
      });

      setSeleted(itemsArr);
      handleCheck(itemsArr);
    } else {
      setSeleted([]);
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
    setSeleted(itemsArr);
    handleCheck(itemsArr);
  };

  const handleChangeKeyword = (event) => {
    if (event.target.value.length < 255) {
      setTextSearch(event.target.value);

      setListFilter(
        [...list].filter((item) => item.label.includes(event.target.value))
      );
    }
  };

  const handleResetTextSearch = () => {
    setListFilter(list);
    setTextSearch("");
  };

  return (
    <Box style={{ width: width || "auto" }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <Button
            type="button"
            onClick={handleClick}
            variant="outlined"
            className={classes.btnDropdown}
            endIcon={isOpen ? <OpenDropIcon /> : <DropdownIcon />}
          >
            <Typography>{btnText}</Typography>
          </Button>
          {isOpen ? (
            <Box className={classes.dropdown} style={{ [positionDropDown]: 0 }}>
              <TextField
                id="input-with-icon-textfield"
                placeholder="Search by Group name, Camera name"
                variant="outlined"
                name="keyword"
                className={classes.input}
                value={textSearch}
                onChange={handleChangeKeyword}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon width={20} height={20} color="#EC1B2E" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    textSearch.length > 0 ? (
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
              <Box style={{ marginTop: "2px" }}>
                {titleDropdownText && listFilter.length > 0 && (
                  <label>
                    <MenuItem className={classes.listItem}>
                      <Typography>{titleDropdownText}</Typography>
                      <Checkbox
                        onChange={handleCheckAll}
                        checked={
                          listFilter && selected.length === listFilter.length
                        }
                      />
                    </MenuItem>
                  </label>
                )}
                {listFilter.map((item) => (
                  <label key={item.value}>
                    <MenuItem className={classes.listItem}>
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
                      <Checkbox
                        id={item.value}
                        value={item.value}
                        onChange={handleCheckItem}
                        checked={selected.includes(item.value)}
                      />
                    </MenuItem>
                  </label>
                ))}
              </Box>
            </Box>
          ) : null}
        </div>
      </ClickAwayListener>
    </Box>
  );
}
