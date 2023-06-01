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
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StyledComponent } from "./StyledComponent";

export const HeaderAction = ({
  keyword,
  dataSend,
  setDataSend,
  handeChangeSubmit,
  reload,
}) => {
  const [open, setOpen] = useState(false);
  const [listCustomerType, setListCustomerType] = useState([]);
  const [listCustomerTypeValue, setListCustomerTypeValue] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getCustomerType = async () => {
    const res = await axios.get("http://localhost:3004/customerType");
    if (res.status === 200) {
      setListCustomerType(res.data);
      setOptions(res.data.map((d) => d.value));
    }
  };

  const isAllSelected =
    options.length > 0 && selected.length === options.length;
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
    if (value === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }

    if (selected.includes(value) && !checked) {
      setListCustomerTypeValue(listCustomerTypeValue.filter((t) => t != name));
      const newDataSend = { ...dataSend };
      delete newDataSend[newDataSend.name];
      setDataSend({ ...newDataSend });
      setSelected([...selected.filter((t) => t != value)]);
    }
    if (!selected.includes(value) && checked) {
      setListCustomerTypeValue([...listCustomerTypeValue, name]);
      setSelected([...selected, value]);
      handeChangeSubmit(e);
    }
  };

  return (
    <StyledComponent>
      <Box
        className="header-filter"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.5)",
          backgroundColor: "#fff",
          marginBottom: 24,
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
                    {selected.length === 0
                      ? "Customer Type"
                      : selected.map((t) => t).toString()}
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
                              checked={isAllSelected}
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
                                  checked={selected.includes(t.value)}
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

        <Box
          className="item-field"
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <Typography className="item-field-title">Date</Typography>
          <ReactDatePicker
            startDate={startDate}
            endDate={endDate}
            selectsRange
            onChange={onChangeDate}
            wrapperClassName="datePicker"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            monthsShown={2}
          >
            <Box>Xin Chào</Box>
          </ReactDatePicker>
        </Box>

        <Box className="item-field">
          <Box className="item-button" onClick={reload}>
            <ReplayIcon />
          </Box>
        </Box>
      </Box>
    </StyledComponent>
  );
};
