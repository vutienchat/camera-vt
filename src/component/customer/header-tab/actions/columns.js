import {
  Box,
  Button,
  Checkbox,
  Container,
  Menu,
  MenuItem,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { CustomerContext, initalColumns } from "../..";
import { DropdownIcon } from "../../../../common/icons/DropdownIcon";
import { OpenDropIcon } from "../../../../common/icons/OpenDropIcon";

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

export const ColumnsCustom = () => {
  const { checkedColumns, setCheckedColumns } = useContext(CustomerContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterColumns = (props) => (event) => {
    setCheckedColumns((prev) => ({
      ...prev,
      [props]: event.target.checked,
    }));
  };

  return (
    <Box>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        endIcon={Boolean(anchorEl) ? <OpenDropIcon /> : <DropdownIcon />}
        onClick={handleClick}
      >
        Columns
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box style={{ height: "400px", overflowY: "scroll" }}>
          {initalColumns.map((column) => (
            <MenuItem id={column.key}>
              <Checkbox
                checked={checkedColumns[column.key]}
                onChange={handleFilterColumns(column.key)}
              />
              <Typography>{column.label}</Typography>
            </MenuItem>
          ))}
        </Box>
      </StyledMenu>
    </Box>
  );
};
