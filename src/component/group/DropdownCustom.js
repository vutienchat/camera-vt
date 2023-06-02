import {
  AppBar,
  Popper,
  Tab,
  Tabs,
  Typography,
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    "& .MuiTabScrollButton-root": {
      display: "none",
    },
    "& .MuiTabs-flexContainer ": {
      justifyContent: "center",
      "& button": {
        minWidth: 140,
      },
    },
  },
  listItem: {
    width: "auto",
    height: "40px",
    marginRight: 10,
    marginBlock: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fff1f2",
    },
  },
  list: {
    maxHeight: 300,
    overflowY: "auto",

    "& .active": {
      backgroundColor: "#fff1f2",
      fontWeight: "bold",
    },
  },
});

const ListItemAddress = ({ data, handleSelect, className, isActive }) => (
  <ListItem
    key={data.id}
    onClick={handleSelect}
    className={`${className} ${isActive ? "active" : ""}`}
  >
    {data.label}
  </ListItem>
);

const DropdownCustom = React.memo(
  ({
    listData,
    typeSelected,
    setTypeSelected,
    textPlaceholder,
    setTextSearch,
    textSearch,
  }) => {
    const { root, listItem, list } = useStyles();

    return (
      <Box
        style={{
          zIndex: 1500,
          maxWidth: 450,
          width: 450,
          // padding: 10,
          border: "solid 1px #bababb",
          position: "absolute",
        }}
      >
        <Box style={{ padding: 10, background: "#fff" }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: 20 }}
            placeholder={textPlaceholder || "search"}
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />

          <List className={list}>
            {listData.map((item) => (
              <ListItemAddress
                key={item.id}
                isActive={typeSelected && typeSelected.id === item.id}
                data={item}
                className={listItem}
                handleSelect={() => setTypeSelected(item)}
              />
            ))}
          </List>
        </Box>
      </Box>
    );
  }
);

export default DropdownCustom;
