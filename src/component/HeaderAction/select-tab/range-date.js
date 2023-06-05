import {
  Box,
  Button,
  Menu,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { CalenderIcon } from "../../../common/icons/CalenderIcon";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";
import { GroupContext } from "../../../page/mangament/Customer/Customer";

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
    border: "solid 1px #bababb",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

const RangeDateTab = () => {
  const classes = useStylesRangeDateTab();

  const { dataGroupTable, setDataGroupTable } = useContext(GroupContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeDate = (event) => {
    if (event[0] && event[1]) {
      setDataGroupTable((prev) => ({
        ...prev,
        dateStart: new DateObject(event[0]).format("YYYY-MM-DD"),
      }));
      setDataGroupTable((prev) => ({
        ...prev,
        dateEnd: new DateObject(event[1]).format("YYYY-MM-DD"),
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
        endIcon={<CalenderIcon />}
        className={classes.btnDropdown}
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
          <Box display="flex" justifyContent="space-evenly">
            <Box style={{ display: "flex", gap: "5px" }}>
              <Typography style={{ fontSize: 12 }}>From:</Typography>
              <Typography style={{ fontSize: 12 }}>
                {dataGroupTable.dateStart}
              </Typography>
            </Box>
            <Box style={{ display: "flex", gap: "5px" }}>
              <Typography style={{ fontSize: 12 }}>To:</Typography>
              <Typography style={{ fontSize: 12 }}>
                {dataGroupTable.dateEnd}
              </Typography>
            </Box>
          </Box>
          <Calendar
            className="range-date"
            onChange={onChangeDate}
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
