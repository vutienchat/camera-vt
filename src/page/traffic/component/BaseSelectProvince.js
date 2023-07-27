import {
  Box,
  Button,
  ClickAwayListener,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useMemo, useState } from "react";
import { jsonAddress } from "../../../jsonAddress";
import { DropdownIcon } from "../../../common/icons/DropdownIcon";

const BaseSelectProvince = ({ width, placeholder }) => {
  const classes = useStyles();

  const [isOpenSelect, setIsOpenSelect] = useState();

  const provinces = useMemo(() => {
    if (!jsonAddress) return [];

    return jsonAddress;
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setIsOpenSelect((prev) => !prev)}>
      <Box className={classes.root} style={{ width: width || "100%" }}>
        <Button
          className={classes.btnDropdown}
          variant="outlined"
          endIcon={<DropdownIcon />}
        >
          <Typography>{placeholder}</Typography>
        </Button>
        {isOpenSelect && (
          <Box className={classes.dropdown}>
            {provinces.map((address) => (
              <Box className={classes.item}>{address["Name"]}</Box>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  btnDropdown: {
    width: "100%",
    justifyContent: "space-between",
    "& p": {
      textTransform: "none",
    },
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    top: "110%",
    left: 0,
  },
  item: {
    padding: 10,
  },
});

export default BaseSelectProvince;
