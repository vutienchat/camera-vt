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
import CircleWithParts from "./CircleWithParts";
import PresetTourTable from "./PresetTour";

const data = Array.from(Array(5)).map((_, idx) => ({
  name: `test${idx}`,
}));

const PTZControl = React.memo(() => {
  const classes = styles();
  const tabStyle = TabStyle();
  const tabsControl = [
    { label: "Press", children: <PresetTourTable data={data} /> },
    { label: "Tour", children: "Tour" },
  ];
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} direction="row" wrap="nowrap">
      <Grid
        item
        container
        // spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item style={{ width: "100%" }}>
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
          // spacing={2}
          direction="row"
          wrap="nowrap"
          alignItems="flex-start"
          justifyContent="center"
          style={{
            border: "solid 1px rgba(34, 34, 34, 0.1)",
            width: "100%",
            paddingBlock: 10,
          }}
        >
          <Grid item style={{ paddingLeft: 30 }}>
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
                justifyContent: "center",
                alignItems: "center",
              }}
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
                justifyContent: "center",
                alignItems: "center",
              }}
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
                <NativeSelect>
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
      <Grid item>
        <Box
          style={{
            border: "solid 1px  #DDDDDD",
            borderRadius: "8px",
            height: "auto",
            minHeight: 445,
          }}
        >
          <Tabs onChange={handleChange} value={value} className={tabStyle.root}>
            {tabsControl.map((it, idx) => (
              <Tab key={idx} label={it.label} />
            ))}
          </Tabs>
          {tabsControl.map((tab, index) => (
            <TabPanel
              value={value}
              index={index}
              key={`${tab.label} - ${index}`}
            >
              {tab.children}
            </TabPanel>
          ))}
        </Box>
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
      // style={{ paddingBottom: 10 }}
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
});

const TabStyle = makeStyles({
  root: {
    // paddingBottom: 10,
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },

    "& button": {
      background: "#EAEAEA",
      width: "130px",
      height: 53,
      borderRadius: "8px 8px 0px 0px",
      padding: 0,
      minWidth: 130,
      border: "solid 1px rgba(34, 34, 34, 0.1)",
    },
    "& .Mui-selected": {
      background: "#fff",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
});

export default PTZControl;
