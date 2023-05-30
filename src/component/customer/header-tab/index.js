import { Box, Checkbox, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddCustomerButton } from "./actions/add-btn";
import { ColumnsCustom } from "./actions/columns";
import { DeleteButton } from "./actions/delete";

export const HeaderTab = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.rootLeft}>
        <Box className={classes.showText}>
          <Typography>Show:</Typography>
          <Typography>123 Results</Typography>
        </Box>
        <Box style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Box className={classes.showText}>
            <Typography>Selected:</Typography>
            <Typography> 10 items</Typography>
          </Box>
          <Box className={classes.selectAll}>
            <Typography>Selecte All</Typography>
            <Checkbox size="small" />
          </Box>
          <Typography className={classes.cancelText}>Cancel</Typography>
        </Box>
      </Box>
      <Box className={classes.actions}>
        <AddCustomerButton />
        <ColumnsCustom />
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
    gap: "10px",
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
