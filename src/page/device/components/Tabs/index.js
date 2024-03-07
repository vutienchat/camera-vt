import { Box, Tab, Tabs, makeStyles } from "@material-ui/core";
import React from "react";

const TabsContainer = React.memo(({ tabs }) => {
  const classes = TabStyle();
  const [value, setValue] = React.useState(3);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        // aria-label="Vertical tabs example"
        className={classes.root}
      >
        {(tabs || []).map((tab, index) => (
          <Tab label={tab.label} key={index} />
        ))}
      </Tabs>
      {(tabs || []).map((tab, index) => (
        <TabPanel value={value} index={index} key={`${tab.label} - ${index}`}>
          {tab.children}
        </TabPanel>
      ))}
    </React.Fragment>
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

const TabStyle = makeStyles({
  root: {
    paddingBottom: 10,
    "& .MuiTabs-indicator": {
      backgroundColor: "rgb(221, 61, 75)",
      borderRadius: "8px 8px 0px 0px",
      height: "5px",
    },
  },
});

const TabPanelStyle = makeStyles({
  root: {
    paddingInline: 0,
  },
});

export default TabsContainer;
