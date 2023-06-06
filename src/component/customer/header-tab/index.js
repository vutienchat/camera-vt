import { useContext } from "react";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ImportButton from "./actions/import";
import ExportButton from "./actions/export";

import { AddGroupButton } from "./actions/add-btn";
// import { ColumnsCustom } from "./actions/columns";
import { DeleteButton } from "./actions/delete";
import { GroupContext } from "../../../page/mangament/Customer/Customer";

export const HeaderTab = () => {
  const classes = useStyles();
  const { checkedGroup } = useContext(GroupContext);

  return (
    <Box className={classes.root}>
      <Box className={classes.rootLeft}>
        <Box style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Box className={classes.showText}>
            <Typography>Selected:</Typography>
            <Typography> {checkedGroup.length} items</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.actions}>
        <AddGroupButton />
        <ImportButton />
        <ExportButton />
        {/* <ColumnsCustom /> */}
        <DeleteButton />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  rootLeft: {
    display: "flex",
    gap: "50px",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  showText: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  selectAll: {
    display: "flex",
    alignItems: "center",
  },
  cancelText: {
    color: "red",
    textDecoration: "underlined",
    cursor: "pointer",
  },
});
