import { Box, makeStyles } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";
import TypeSelectTab from "./select-tab/type";
import RangeDateTab from "./select-tab/range-date";
import { AddressSelectTab } from "./select-tab/address";
import SearchTab from "./search-tab";
import { ReloadIcon } from "../../common/icons/ReloadIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { GroupContext } from "../../page/mangament/Customer/Customer";
import { QUERY_KEYS } from "../../utils/keys";

export const HeaderAction = () => {
  const queryClient = useQueryClient();
  const { dataGroupTable, textSearch } = useContext(GroupContext);
  const classes = useStylesHeaderActions();

  const handleReloadDataTable = () => {
    queryClient.invalidateQueries([
      QUERY_KEYS.GROUP_LIST,
      { ...dataGroupTable, textSearch },
    ]);
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.searchContent}>
        <SearchTab />
      </Box>
      <Box className={classes.actionsContent}>
        <TypeSelectTab />
        <AddressSelectTab />
        <RangeDateTab />
        <Box className={classes.icon} onClick={handleReloadDataTable}>
          <ReloadIcon width={16} height={16} color="#939393" />
        </Box>
      </Box>
    </Box>
  );
};

const useStylesHeaderActions = makeStyles({
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
    border: "1px solid #939393",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
  },
});
