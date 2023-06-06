import { Box, makeStyles } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";
import TypeSelectTab from "./select-tab/type";
import RangeDateTab from "./select-tab/range-date";
import { AddressSelectTab } from "./select-tab/address";
import SearchTab from "./search-tab";
import { ReloadIcon } from "../../common/icons/ReloadIcon";

export const useStylesHeaderActions = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  content: {
    padding: "10px",
    display: "flex",
    gap: "20px",
    alignContent: "center",
  },
  searchContent: {
    flex: 1,
  },
  actionsContent: {
    display: "flex",
    gap: "10px",
    alignContent: "center",
  },
  icon: {
    width: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    cursor: "pointer",
  },
});

export const HeaderAction = ({ reload }) => {
  const classes = useStylesHeaderActions();

  return (
    <Box className={classes.content}>
      <Box className={classes.searchContent}>
        <SearchTab />
      </Box>
      <Box className={classes.actionsContent}>
        <TypeSelectTab />
        <AddressSelectTab />
        <RangeDateTab />
        <Box className={classes.icon} onClick={reload}>
          <ReloadIcon width={16} height={16} />
        </Box>
      </Box>
    </Box>
  );
};
