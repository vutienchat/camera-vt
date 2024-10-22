import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TableDepartment from "./TableDepartment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    padding: "16px 20px",
    boxShadow: "0 0 10px 0 rgba(117,115,115,0.16)",
    flex: 1,
    borderRadius: 8,
    minWidth: 1028,
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    border: "1px solid #D3D3D3",
    padding: "10px 33px",
    cursor: "pointer",
    position: "relative",
    "&.selected .MuiTypography-root": {
      fontWeight: "bold",
      color: "#000000",
    },
    "& .MuiTypography-root": {
      color: "#939393",
    },
    "&.selected::before": {
      content: '""',
      position: "absolute",
      height: 3,
      bottom: -3,
      right: -1,
      left: -1,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
const TABS = ["Department", "Job title", "Shift", "Holidays"];

const ConfigGroupCompany = () => {
  const classes = useStyles();
  const [tabActive, setTabActive] = useState(TABS[0]);

  const renderContentByTab = () => {
    switch (tabActive) {
      case TABS[0]:
        return <TableDepartment />;
      case TABS[1]:
        return "Job title";
      case TABS[2]:
        return "Shift";
      case TABS[3]:
        return "Holidays";
      default:
        return <TableDepartment />;
    }
  };

  return (
    <Paper className={classes.root}>
      <Box>
        <Box className={classes.tabs}>
          <Box sx={{ display: "flex" }}>
            {TABS.map((tab) => (
              <Box
                key={tab}
                className={`${classes.tab} ${tab === tabActive && "selected"}`}
                onClick={() => {
                  setTabActive(tab);
                }}
              >
                <Typography component="div">{tab}</Typography>
              </Box>
            ))}
          </Box>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            New Department
          </Button>
        </Box>
        <Divider />
      </Box>
      {renderContentByTab()}
    </Paper>
  );
};

export default ConfigGroupCompany;
