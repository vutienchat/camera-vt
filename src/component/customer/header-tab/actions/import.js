import { useContext, useState } from "react";

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";

import { OpenDropIcon } from "../../../../common/icons/OpenDropIcon";
import { DropdownIcon } from "../../../../common/icons/DropdownIcon";

import { fileList } from "../../../../utils/common";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

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
      padding: "8px 7px 8xp 7px",
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
    width: "125px",
    height: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    padding: "11px 11px 11px 9px",
    textTransform: "capitalize",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      fontSize: "14px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

const ImportButton = () => {
  const classes = useStylesSelectTab();
  const { openModalImport, setOpenModalImport } = useContext(GroupContext);

  const handleClick = () => {
    setOpenModalImport(true);
  };

  return (
    <Box fullWidth>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        size="medium"
        className={classes.btnDropdown}
        endIcon={openModalImport ? <OpenDropIcon /> : <DropdownIcon />}
        fullWidth
        onClick={handleClick}
      >
        <Typography>Import Data</Typography>
      </Button>
    </Box>
  );
};

export default ImportButton;
