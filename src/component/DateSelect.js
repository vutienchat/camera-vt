import {
  Box,
  Button,
  Menu,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";
import { CalenderIcon } from "../common/icons/CalenderIcon";
import extendedDayJs from "../utils/dayjs";

const RangeDateTab = ({ paramsFilter, handleCheckDate }) => {
  const classes = useStylesRangeDateTab();

  const [rangeDate, setRangeDate] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeDate = (event) => {
    setRangeDate([new DateObject(event[0]), new DateObject(event[1])]);
  };

  const handleChangeDate = () => {
    if (rangeDate[0] && rangeDate[1]) {
      handleCheckDate(
        rangeDate[0].format("YYYY-MM-DD"),
        rangeDate[1].format("YYYY-MM-DD")
      );
    }
  };

  return (
    <Box fullWidth>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        size="medium"
        endIcon={<CalenderIcon color="#939393" />}
        className={classes.btnDropdown}
        onClick={handleClick}
      >
        <Box flex={1} display="flex" gridGap={4} alignContent="center">
          {paramsFilter.startDate && paramsFilter.endDate ? (
            <React.Fragment>
              <Typography style={{ color: "#000" }}>
                {paramsFilter.startDate}
              </Typography>
              <Typography style={{ textTransform: "lowercase", color: "#000" }}>
                to
              </Typography>
              <Typography style={{ color: "#000" }}>
                {paramsFilter.endDate}
              </Typography>
            </React.Fragment>
          ) : (
            <Typography style={{ color: "#000" }}>Thời gian vi phạm</Typography>
          )}
        </Box>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.calenderContent}>
          <Box display="flex" justifyContent="space-evenly">
            <Box style={{ display: "flex", gap: "5px" }}>
              <Typography style={{ fontSize: 12 }}>From:</Typography>
              <Typography style={{ fontSize: 12 }}>
                {paramsFilter.startDate
                  ? extendedDayJs(paramsFilter.startDate).format("DD/MM/YYYY")
                  : rangeDate[0]
                  ? rangeDate[0].format("DD/MM/YYYY")
                  : "__/__/__"}
              </Typography>
            </Box>
            <Box style={{ display: "flex", gap: "5px" }}>
              <Typography style={{ fontSize: 12 }}>To:</Typography>
              <Typography style={{ fontSize: 12 }}>
                {paramsFilter.endDate
                  ? extendedDayJs(paramsFilter.endDate).format("DD/MM/YYYY")
                  : rangeDate[1]
                  ? rangeDate[1].format("DD/MM/YYYY")
                  : "__/__/__"}
              </Typography>
            </Box>
          </Box>
          <Calendar
            onChange={onChangeDate}
            range
            rangeHover
            width="100%"
            highlightToday={false}
          />
          <Box display="flex" justifyContent="center" style={{ gap: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleChangeDate}
            >
              Confirm
            </Button>
            <Button variant="outlined" size="small" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </StyledMenu>
    </Box>
  );
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    style={{
      top: "10px",
    }}
    {...props}
  />
));

export const useStylesRangeDateTab = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    width: "300px",
    background: "#fff",
    border: "1px solid #939393",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    borderRadius: "4px",
    padding: "15px 23px 15px 23px",
    textTransform: "capitalize",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#939393",
    },
  },
  calenderContent: {
    padding: "5px",
    "& .rmdp-shadow": {
      boxShadow: "none !important",
    },
    "& .rmdp-range": {
      backgroundColor: "#D8E3FF",
      color: "#EC1B2E",
      borderRadius: 0,
      boxShadow: "none",
      fontWeight: "500 !important",
    },
    "& .rmdp-week-day": {
      color: "#000",
    },
    "& .start": {
      backgroundColor: "#EC1B2E !important",
      color: "#FFFFFF",
      borderRadius: "4px !important",
    },
    "& .end": {
      backgroundColor: "#EC1B2E !important",
      color: "#FFFFFF",
      borderRadius: "4px !important",
    },
    "& .rmdp-arrow": {
      borderColor: "#000",
    },
    "& .rmdp-arrow-container:hover .rmdp-arrow": {
      borderColor: "#000",
    },
    "& .rmdp-arrow-container:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    "& .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover": {
      backgroundColor: "#EC1B2E",
      color: "#FFFFFF",
      boxShadow: "none",
      borderRadius: "4px",
    },
    "& .rmdp-day:hover": {
      backgroundColor: "#EC1B2E",
      color: "#FFFFFF",
      borderRadius: "4px",
    },
    "& .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover .rmdp-day":
      {
        backgroundColor: "#EC1B2E",
      },
  },
});

export default RangeDateTab;
