import {
  Box,
  Button,
  Menu,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CalenderIcon } from "../../../common/icons/CalenderIcon";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";
import { GroupContext } from "../../../page/mangament/Customer/Customer";

const RangeDateTab = () => {
  const classes = useStylesRangeDateTab();

  const { dataGroupTable, setDataGroupTable } = useContext(GroupContext);
  const [rangeDate, setRangeDate] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeDate = (event) => {
    setRangeDate([
      new DateObject(event[0]).format("MM/DD/YY"),
      new DateObject(event[1]).format("MM/DD/YY"),
    ]);
  };

  const handleChangeDate = () => {
    if (rangeDate[0] && rangeDate[1]) {
      setDataGroupTable((prev) => ({
        ...prev,
        dateStart: rangeDate[0],
        dateEnd: rangeDate[1],
      }));
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
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          gridGap={4}
          alignContent="center"
        >
          {dataGroupTable.dateStart && dataGroupTable.dateEnd ? (
            <React.Fragment>
              <Typography>{dataGroupTable.dateStart}</Typography>
              <Typography style={{ textTransform: "lowercase" }}>to</Typography>
              <Typography>{dataGroupTable.dateEnd}</Typography>
            </React.Fragment>
          ) : (
            <Typography>Date Range</Typography>
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
                {rangeDate[0] ? rangeDate[0] : "__/__/__"}
              </Typography>
            </Box>
            <Box style={{ display: "flex", gap: "5px" }}>
              <Typography style={{ fontSize: 12 }}>To:</Typography>
              <Typography style={{ fontSize: 12 }}>
                {rangeDate[1] ? rangeDate[1] : "__/__/__"}
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
    width: "240px",
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
