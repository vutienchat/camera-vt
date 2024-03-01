import React from "react";
import {
  Box,
  FormControl,
  Grid,
  NativeSelect,
  Tab,
  Tabs,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import BaseFormSelect from "../../../BaseForm/BaseFormSelect";
import { timeZone } from "../../../Draw/@type";
import CircleWithParts from "./CircleWithParts";

const partOfCircle = Array.from(Array(8));

const PTZControl = React.memo(() => {
  const classes = styles();
  const tabsControl = [
    { label: "Press", children: "Press" },
    { label: "Tour", children: "Tour" },
  ];
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={1} direction="row" wrap="nowrap">
      <Grid
        item
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container spacing={2}>
          <Box
            style={{
              backgroundImage:
                "url('https://cdn.vjshop.vn/tin-tuc/5-cach-cai-thien-bo-cuc-anh-phong-canh-thong-qua-phoi-sang-lau/cai-thien-anh-phong-canh-bang-phuong-phap-chup-phoi-sang-lau.jpg')",
              height: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              // minWidth: 575,
              minHeight: 300,
              position: "relative",
            }}
          ></Box>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          direction="row"
          wrap="nowrap"
          alignItems="flex-start"
          justifyContent="center"
          style={{ border: "solid 1px rgba(34, 34, 34, 0.1)", width: "100%" }}
        >
          <Grid item style={{ paddingLeft: 30 }}>
            {/* <Box style={{}} className={classes.circle}>
              {partOfCircle.map((_, idx) => (
                <div
                  className={`${classes.part} ${classes[`part${idx}`]}`}
                  key={idx}
                ></div>
              ))}
            </Box> */}
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 120,
                height: 120,
                position: "relative",
              }}
            >
            <CircleWithParts />
            </Box>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: 20 }}
          >
            <Grid
              item
              style={{
                width: 28,
                height: 28,
                background: "#EEEEEE",
                borderRadius: "50%",
                display: "flex",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <AddIcon style={{ color: "#888888" }} />
            </Grid>
            <Grid item>Zoom </Grid>
            <Grid
              item
              style={{
                width: 28,
                height: 28,
                background: "#EEEEEE",
                borderRadius: "50%",
                display: "flex",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <RemoveIcon style={{ color: "#888888" }} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: 20 }}
          >
            <Grid item>Speed</Grid>
            <Grid>
              <FormControl className={classes.selectPerPage}>
                <NativeSelect
                // value={pagination.rowPerPage + 1}
                // onChange={handleChangeRow}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Tabs onChange={handleChange} value={value}>
          {tabsControl.map((it, idx) => (
            <Tab key={idx} label={it.label} />
          ))}
        </Tabs>
        {tabsControl.map((tab, index) => (
          <TabPanel value={value} index={index} key={`${tab.label} - ${index}`}>
            {tab.children}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
});

function TabPanel(props) {
  const classes = TabPanelStyle();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      className={classes.root}
      {...other}
      style={{ paddingBottom: 10 }}
      key={index}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const TabPanelStyle = makeStyles({
  root: {
    paddingInline: 0,
  },
});

const styles = makeStyles({
  selectPerPage: {
    "& .MuiInput-underline:before": { border: "none" },
    "& .MuiInput-underline:after": { border: "none" },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none !important",
    },
    "& select": { background: "white !important" },
    "& svg": { color: "black !important" },
    borderRadius: "4px",
    border: "solid 1px #d3d3d3",
    padding: "0px 6px",
    margin: "0 16px",
  },

  circle: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "solid 1px rgba(34, 34, 34, 0.1)",
  },
  part: {
    position: " absolute",
    width: " 0",
    height: " 0",
    borderStyle: " solid",
  },
  part1: {
    top: 0,
    left: "50%",
    borderWidth: "100px 50px 0 50px",
    borderColor: "#ff0000 transparent transparent transparent",
    transform: "translateX(-50%)",
  },
  part2: {
    top: "50%",
    left: "100%",
    borderWidth: "50px 100px 50px 0",
    borderColor: "transparent #00ff00 transparent transparent",
    transform: "translateY(-50%)",
  },
  part3: {
    bottom: 0,
    left: "50%",
    borderWidth: "0 50px 100px 50px",
    borderColor: "transparent transparent #0000ff transparent",
    transform: "translateX(-50%)",
  },
  part4: {
    top: "50%",
    left: 0,
    borderWidth: "50px 0 50px 100px",
    borderColor: "transparent transparent transparent #ffff00",
    transform: "translateY(-50%)",
  },
  part5: {
    top: "25%",
    left: "75%",
    borderWidth: "50px 25px 50px 25px",
    borderColor: "transparent #00ffff transparent #00ffff",
    transform: "translate(-50%, -50%) rotate(45deg)",
  },
  part6: {
    bottom: "25%",
    left: "75%",
    borderWidth: "50px 25px 50px 25px",
    borderColor: "#ff00ff transparent #ff00ff transparent",
    transform: "translate(-50%, 50%) rotate(45deg)",
  },
  part7: {
    bottom: "25%",
    left: "25%",
    borderWidth: "50px 25px 50px 25px",
    borderColor: "#ff00ff transparent #ff00ff transparent",
    transform: "translate(50%, 50%) rotate(45deg)",
  },
  part8: {
    top: "25%",
    left: "25%",
    borderWidth: "50px 25px 50px 25px",
    borderColor: "transparent #00ffff transparent #00ffff",
    transform: "translate(50%, -50%) rotate(45deg)",
  },
});

export default PTZControl;
