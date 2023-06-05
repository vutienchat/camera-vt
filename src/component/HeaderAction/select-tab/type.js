import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { DropdownIcon } from "../../../common/icons/DropdownIcon";
import { OpenDropIcon } from "../../../common/icons/OpenDropIcon";
import useGroupTypesList from "../../../hooks/api/useGroupType";
import { SearchIcon } from "../../../common/icons/SearchIcon";
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

export const useStylesSelectTab = makeStyles({
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

const TypeSelectTab = () => {
  const classes = useStylesSelectTab();

  const { setDataGroupTable } = useContext(GroupContext);
  const { data: types_list } = useGroupTypesList();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTypeGroup = (typeGroup) => {
    setDataGroupTable((prev) => ({ ...prev, type: typeGroup }));
    setAnchorEl(null);
  };

  return (
    <Box fullWidth>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        size="medium"
        className={classes.btnDropdown}
        endIcon={Boolean(anchorEl) ? <OpenDropIcon /> : <DropdownIcon />}
        style={{
          cursor: "pointer",
          justifyContent: "space-between",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25);",
        }}
        fullWidth
        onClick={handleClick}
      >
        Types
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box style={{ width: "400px" }} padding="8px">
          <TextField
            placeholder="Select group type"
            variant="outlined"
            name="keyword"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={20} height={20} color="#EC1B2E" />
                </InputAdornment>
              ),
            }}
          />
          <Box mt={2}>
            {types_list &&
              types_list.map((type) => (
                <MenuItem
                  key={type.name}
                  component="div"
                  onClick={() => handleChangeTypeGroup(type.value)}
                >
                  <Typography>{type.name}</Typography>
                </MenuItem>
              ))}
          </Box>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default TypeSelectTab;
