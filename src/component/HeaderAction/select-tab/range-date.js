import { Box, Button, Menu, Typography, withStyles } from "@material-ui/core";
import { useState } from "react";
import { CalenderIcon } from "../../../common/icons/CalenderIcon";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";

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

const RangeDateTab = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [values, setValues] = useState([
    new DateObject().subtract(1, "days"),
    new DateObject(),
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box fullWidth>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        size="medium"
        endIcon={<CalenderIcon />}
        style={{
          cursor: "pointer",
          justifyContent: "space-between",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25);",
        }}
        fullWidth
        onClick={handleClick}
      >
        Date Range
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box padding={1}>
          {values[0] && values[1] && (
            <Box display="flex" justifyContent="space-evenly">
              <Box style={{ display: "flex", gap: "5px" }}>
                <Typography style={{ fontSize: 12 }}>From:</Typography>
                <Typography style={{ fontSize: 12 }}>
                  {values[0].format("MM/DD/YYYY")}
                </Typography>
              </Box>
              <Box style={{ display: "flex", gap: "5px" }}>
                <Typography style={{ fontSize: 12 }}>To:</Typography>
                <Typography style={{ fontSize: 12 }}>
                  {values[1].format("MM/DD/YYYY")}
                </Typography>
              </Box>
            </Box>
          )}
          <Calendar
            value={values}
            className="range-date"
            onChange={setValues}
            style={{ width: "100%" }}
            range
            rangeHover
            highlightToday={false}
          />
          <Box display="flex" justifyContent="center" style={{ gap: "10px" }}>
            <Button variant="contained" color="secondary" size="small">
              Confirm
            </Button>
            <Button variant="outlined" size="small">
              Cancel
            </Button>
          </Box>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default RangeDateTab;
