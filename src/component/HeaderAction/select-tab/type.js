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

const TypeSelectTab = () => {
  const classes = useStylesSelectTab();
  const { dataGroupTable, setDataGroupTable } = useContext(GroupContext);
  const { data: types_list } = useGroupTypesList();

  const [anchorEl, setAnchorEl] = useState(null);
  const [typesList, setTypesList] = useState([]);

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
    let arrType = [...dataGroupTable.type];

    if (typeGroup.target.checked) {
      arrType.push(typeGroup.target.value);

      setDataGroupTable((prev) => ({ ...prev, type: arrType }));
    } else {
      setDataGroupTable((prev) => ({
        ...prev,
        type: arrType.filter((type) => type !== typeGroup.target.value),
      }));
    }
  };

  const handleChangeKeyword = (event) => {
    if (dataGroupTable.type.length === types_list.length) {
      setDataGroupTable((prev) => ({ ...prev, type: [] }));
    }

    if (event.target.value === "") {
      setTypesList(types_list);
    } else {
      const typesFilter = types_list.filter((type) =>
        type.name.toLowerCase().includes(event.target.value.toLowerCase())
      );

      setTypesList(typesFilter);
    }
  };

  const checkedAll = (event) => {
    if (event.target.checked) {
      let arrType = new Set(dataGroupTable.type);

      for (let i = 0; i < typesList.length; i++) {
        arrType.add(typesList[i].value);
      }

      setDataGroupTable((prev) => ({ ...prev, type: Array.from(arrType) }));
    } else {
      setDataGroupTable((prev) => ({ ...prev, type: [] }));
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
        endIcon={
          Boolean(anchorEl) ? (
            <OpenDropIcon color="#939393" />
          ) : (
            <DropdownIcon color="#939393" />
          )
        }
        onClick={handleClick}
      >
        <Typography>
          {dataGroupTable.type.length > 0
            ? `${dataGroupTable.type.length} type selected`
            : "Types"}
        </Typography>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          top: "10px",
          height: typesList.length > 4 ? "400px" : "auto",
          overflowY: "hidden",
        }}
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

          <Box
            className={classes.menuItem}
            style={{
              overflowY: typesList.length > 4 ? "scroll" : "none",
            }}
          >
            <label>
              <MenuItem component="div" className={classes.listItem}>
                <Typography>All Type</Typography>
                <Checkbox
                  size="small"
                  onChange={checkedAll}
                  checked={
                    typesList.length > 0 &&
                    dataGroupTable.type.length === typesList.length
                  }
                />
              </MenuItem>
            </label>
            {typesList.map((type) => (
              <label>
                <MenuItem
                  key={type.name}
                  component="div"
                  className={classes.listItem}
                >
                  <Typography>{type.name}</Typography>
                  <Checkbox
                    size="small"
                    id={type.value}
                    value={type.value}
                    onClick={handleChangeTypeGroup}
                    checked={dataGroupTable.type.includes(type.value)}
                  />
                </MenuItem>
              </label>
            ))}
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
    {...props}
  />
));

const useStylesSelectTab = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    width: "200px",
    background: "#fff",
    border: "1px solid #939393",
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    alignItems: "center",
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
  menuItem: {
    marginTop: "10px",
    height: "220px",
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

export default TypeSelectTab;
