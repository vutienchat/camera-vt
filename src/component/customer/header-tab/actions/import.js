import { useContext } from "react";

import { Box, Button, Typography, makeStyles } from "@material-ui/core";

import { OpenDropIcon } from "../../../../common/icons/OpenDropIcon";
import { DropdownIcon } from "../../../../common/icons/DropdownIcon";

import { GroupContext } from "../../../../page/mangament/Customer/Customer";

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

export const useStylesSelectTab = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    padding: "14px 16px 13px",
    borderRadius: "4px",
    width: "150px",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "capitalize",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      fontWeight: "bold",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
});

export default ImportButton;
