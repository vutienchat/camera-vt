import {
  Box,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyledComponent } from "./StyledComponent";

export const HeaderAction = () => {
  const [open, setOpen] = useState(false);

  const [listCustomerType, setListCustomerType] = useState([]);
  const [listCustomerTypeValue, setListCustomerTypeValue] = useState([]);
  const [dataSend, setDataSend] = useState({});

  const getCustomerType = async () => {
    const res = await axios.get("http://localhost:3004/customerType");
    if (res.status === 200) {
      setListCustomerType(res.data);
    }
  };

  useEffect(() => {
    getCustomerType();
  }, []);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const value = e.target.value;
    if (listCustomerTypeValue.includes(name) && !checked) {
      setListCustomerTypeValue(listCustomerTypeValue.filter((t) => t != name));
      const newDataSend = { ...dataSend };
      delete newDataSend[newDataSend.name];
      setDataSend({ ...newDataSend });
    }
    if (!listCustomerTypeValue.includes(name) && checked) {
      setListCustomerTypeValue([...listCustomerTypeValue, name]);
      handeChangeSubmit(e);
    }
  };

  const handeChangeSubmit = (e) => {
    // console.log({ name: e.target.name, value: e.target.value });
    setDataSend({ ...dataSend, [e.target.name]: e.target.value });
  };

  console.log(dataSend);
  return (
    <StyledComponent>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.5)",
          backgroundColor: "#fff",
        }}
      >
        <Box className="item-field">
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search by Customer ID, Customer Name, Address"
            variant="outlined"
            name="keyword"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handeChangeSubmit}
          />
        </Box>
        <Box
          className="item-field"
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <Typography className="item-field-title">Customer Type</Typography>
          <Box className="select-wrapper">
            <ClickAwayListener
              onClickAway={handleClickAway}
              className="custom-select"
            >
              <Box className="select-box">
                <Box className="select-box" onClick={handleClick}>
                  <Box className="type-value">
                    {listCustomerTypeValue.length === 0
                      ? "Customer Type"
                      : listCustomerTypeValue.map((t) => t).toString()}
                  </Box>
                  <Box className="">
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </Box>
                </Box>
                {open ? (
                  <Box className="option-box">
                    <Box className="search">
                      <TextField
                        id="input-with-icon-textfield"
                        placeholder="Search"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <List
                      component="nav"
                      className="list"
                      aria-label="secondary mailbox folders"
                    >
                      <ListItem button className="list-item">
                        <FormControlLabel
                          value="all"
                          control={
                            <Checkbox
                              color="primary"
                              name="all"
                              onChange={handleCheckboxChange}
                            />
                          }
                          label="All type"
                          labelPlacement="start"
                          className="item"
                        />
                      </ListItem>
                      {listCustomerType?.map((t, i) => {
                        return (
                          <ListItem button className="list-item">
                            <FormControlLabel
                              value={t.value}
                              control={
                                <Checkbox
                                  color="primary"
                                  name={t.name}
                                  onChange={handleCheckboxChange}
                                />
                              }
                              label={t.name}
                              labelPlacement="start"
                              className="item"
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ) : null}
              </Box>
            </ClickAwayListener>
          </Box>
        </Box>

        <Box className="item-field"></Box>
      </Box>
    </StyledComponent>
  );
};
