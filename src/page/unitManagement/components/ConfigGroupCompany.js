import React, { Fragment, useMemo, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import FormShift from "./FormShift";
import TableDepartment from "./TableDepartment";
import TableHolidays from "./TableHolidays";
import ModalHolidays from "./Modals/ModalHolidays";
import sleep from "../../../utils/sleep";
import ModalDepartment from "./Modals/ModalDepartment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    padding: "16px 20px",
    boxShadow: "0 0 10px 0 rgba(117,115,115,0.16)",
    flex: 1,
    borderRadius: 8,
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

const ConfigGroupCompany = ({ treeNodes }) => {
  const classes = useStyles();
  const [tabActive, setTabActive] = useState(TABS[0]);
  const [openModalHolidays, setOpenModalHolidays] = useState(false);
  const [openModalDepartment, setOpenModalDepartment] = useState(false);
  const [initialDataEdit, setInitialDataEdit] = useState(null);

  const handleOpenModalAddAndEditHolidays = (holidays) => {
    setOpenModalHolidays(true);
    holidays && setInitialDataEdit(holidays);
  };

  const handleOpenModalAddAndEditDepartment = (department) => {
    setOpenModalDepartment(true);
    department && setInitialDataEdit(department);
  };

  const contents = useMemo(() => {
    switch (tabActive) {
      case TABS[0]:
        return {
          content: (
            <TableDepartment
              treeNodes={treeNodes}
              onOpenModalAddAndEditDepartment={
                handleOpenModalAddAndEditDepartment
              }
            />
          ),
          button: (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                handleOpenModalAddAndEditDepartment();
              }}
            >
              New Department
            </Button>
          ),
        };
      case TABS[1]:
        return {
          content: "",
          button: (
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              New Job Title
            </Button>
          ),
        };
      case TABS[2]:
        return {
          content: <FormShift />,
          button: (
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              New Department
            </Button>
          ),
        };
      case TABS[3]:
        return {
          content: (
            <TableHolidays
              onOpenModalAddAndEditHolidays={handleOpenModalAddAndEditHolidays}
            />
          ),
          button: (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenModalAddAndEditHolidays()}
            >
              New Holiday
            </Button>
          ),
        };
      default:
        return {
          content: <TableDepartment treeNodes={treeNodes} />,
          button: (
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              New Department
            </Button>
          ),
        };
    }
  }, [tabActive, treeNodes]);

  const handleResetInitialDataEdit = async () => {
    await sleep(100);
    setInitialDataEdit(null);
  };

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Box>
          <Box className={classes.tabs}>
            <Box sx={{ display: "flex" }}>
              {TABS.map((tab) => (
                <Box
                  key={tab}
                  className={`${classes.tab} ${
                    tab === tabActive && "selected"
                  }`}
                  onClick={() => {
                    setTabActive(tab);
                  }}
                >
                  <Typography component="div">{tab}</Typography>
                </Box>
              ))}
            </Box>
            {contents.button}
          </Box>
          <Divider />
        </Box>
        {contents.content}
      </Paper>
      <ModalHolidays
        open={openModalHolidays}
        initialDataEdit={initialDataEdit}
        onClose={() => {
          setOpenModalHolidays(false);
          handleResetInitialDataEdit();
        }}
      />
      <ModalDepartment
        open={openModalDepartment}
        initialDataEdit={initialDataEdit}
        onClose={() => {
          setOpenModalDepartment(false);
          handleResetInitialDataEdit();
        }}
      />
    </Fragment>
  );
};

export default ConfigGroupCompany;
