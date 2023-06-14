import {
  AppBar,
  Tab,
  Tabs,
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
    overflowY: "scroll",

    "& .active": {
      backgroundColor: "#fff1f2",
      fontWeight: "bold",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ListItemAddress = ({ data, handleSelect, className, isActive }) => (
  <ListItem
    key={data.Id}
    onClick={handleSelect}
    className={`${className} ${isActive ? "active" : ""}`}
  >
    {data.Name}
  </ListItem>
);

const PopperAddress = React.memo(
  ({
    listDistrict,
    listWards,
    provinceSelected,
    setProvinceSelected,
    setDistrictSelected,
    districtSelected,
    wardSelected,
    setWardSelected,
    listCity,
    textSearch,
    setTextSearch,
    handleClose,
  }) => {
    const { root, listItem, list } = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
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
            placeholder="Province/City, District, Ward"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              className={root}
            >
              <Tab label="Provider/City" />
              <Tab label="District" disabled={!provinceSelected} />
              <Tab label="Ward" disabled={!districtSelected} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <List className={list}>
              {listCity.map((item, index) => {
                return (
                  <ListItemAddress
                    key={item.Id}
                    handleSelect={() => {
                      setProvinceSelected(item);
                      setValue(1);
                      setTextSearch("");
                    }}
                    data={item}
                    className={listItem}
                    isActive={
                      provinceSelected && item.Id === provinceSelected.Id
                    }
                  />
                );
              })}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List className={list}>
              {listDistrict.map((item) => (
                <ListItemAddress
                  key={item.Id}
                  handleSelect={() => {
                    setDistrictSelected(item);
                    setValue(2);
                    setTextSearch("");
                  }}
                  data={item}
                  className={listItem}
                  isActive={districtSelected && item.Id === districtSelected.Id}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <List className={list}>
              {listWards.map((item) => (
                <ListItemAddress
                  key={item.Id}
                  handleSelect={() => {
                    setWardSelected(item);
                    handleClose();
                  }}
                  data={item}
                  className={listItem}
                  isActive={wardSelected && item.Id === wardSelected.Id}
                />
              ))}
            </List>
          </TabPanel>
        </Box>
      </Box>
    );
  }
);

export default PopperAddress;
