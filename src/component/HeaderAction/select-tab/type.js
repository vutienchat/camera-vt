import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useState } from "react";
import { DropdownIcon } from "../../../common/icons/DropdownIcon";
import { OpenDropIcon } from "../../../common/icons/OpenDropIcon";
import useGroupTypesList from "../../../hooks/api/useGroupType";
import { SearchIcon } from "../../../common/icons/SearchIcon";

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

const TypeSelectTab = () => {
  const { data: types_list } = useGroupTypesList();
  const [anchorEl, setAnchorEl] = useState(null);

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
                <MenuItem key={type.name}>
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
