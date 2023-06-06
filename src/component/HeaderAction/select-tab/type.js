import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
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
      height: "400px",
      overflowY: "hidden",
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
    width: "200px",
    background: "#fff",
    border: "none",
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    padding: "15px 23px 15px 23px",
    textTransform: "capitalize",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  menuItem: {
    marginTop: "10px",
    height: "220px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(246, 244, 245, 1)",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(201, 201, 201, 1)",
      borderRadius: "4px",
    },
  },
  listItem: {
    width: "100%",
    padding: "3px 5px 3px 5px",
    lineHeight: "18.4px",
    color: "#000000",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    "&:hover": {
      backgroundColor: "#fff1f2",
    },
  },
});

const TypeSelectTab = () => {
  const classes = useStylesSelectTab();
  const { setDataGroupTable } = useContext(GroupContext);
  const { data: types_list } = useGroupTypesList();

  const [anchorEl, setAnchorEl] = useState(null);
  const [typesList, setTypesList] = useState([]);
  const [checkedType, setCheckedType] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (types_list) {
      setTypesList(types_list);
    }
  }, [types_list]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTypeGroup = (typeGroup) => {
    setDataGroupTable((prev) => ({ ...prev, type: typeGroup }));
    setAnchorEl(null);
  };

  const handleChangeKeyword = (event) => {
    if (event.target.value === "") {
      setTypesList(types_list);
    } else {
      setTypesList((prev) =>
        prev.filter((type) =>
          type.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
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
        className={classes.btnDropdown}
        endIcon={Boolean(anchorEl) ? <OpenDropIcon /> : <DropdownIcon />}
        onClick={handleClick}
      >
        Types
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box style={{ width: "180px" }} padding="8px">
          <TextField
            placeholder="Select group type"
            variant="outlined"
            name="keyword"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={16} height={16} color="#EC1B2E" />
                </InputAdornment>
              ),
            }}
            onChange={handleChangeKeyword}
          />
          <Box className={classes.menuItem}>
            <MenuItem component="div" className={classes.listItem}>
              <Typography>All Type</Typography>
              <Checkbox size="small" />
            </MenuItem>
            {typesList.map((type) => (
              <MenuItem
                key={type.name}
                component="div"
                className={classes.listItem}
                onClick={() => handleChangeTypeGroup(type.value)}
              >
                <Typography>{type.name}</Typography>
                <Checkbox size="small" />
              </MenuItem>
            ))}
          </Box>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default TypeSelectTab;
