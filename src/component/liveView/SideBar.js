import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeItem from "@material-ui/lab/TreeItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  dataAiIntegrated,
  dataCameDevice,
  dataEMAP,
  dataPTZ,
} from "./dataSideBar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles({
  Sub: {
    "& .MuiTreeItem-content": {
      height: 50,
      flexDirection: "row-reverse",

      "& .MuiTreeItem-label": {
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: "15px",
      },
    },
  },
  isSub: {
    "& .MuiTreeItem-content": {
      height: 50,
      flexDirection: "row",
      "& .MuiTreeItem-label": {
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
      },
    },
  },
  root: {
    "& .MuiTreeItem-label": {
      backgroundColor: "#fff !important",
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label ":
      {
        backgroundColor: "#fff !important",
      },
  },
  boxHead: {
    display: "flex",
    flex: "1",
    height: "40px",
    alignItems: "center",
    justifyContent: "space-around",
    borderBlock: "solid 1px gray",
    cursor: "pointer",
  },
  active: {
    borderBottom: "solid 2px red",
  },
});

const SideBar = () => {
  const classes = useStyles();
  const [selectType, setSelectType] = useState("siteGroup");

  const renderData = (data) => {
    return (
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon style={{ fontSize: 40 }} />}
        defaultExpandIcon={<ArrowRightIcon style={{ fontSize: 40 }} />}
      >
        {data.map((item, index) => {
          return (
            <TreeItem
              onLabelClick={(e) => {
                e.preventDefault();
              }}
              key={item.id}
              label={
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{item.label}</Typography>
                  <MoreHorizIcon style={{ paddingRight: 24 }} />
                </Box>
              }
              nodeId={String(index)}
              className={classes.isSub}
            >
              {item.subData && renderData(item.subData, true)}
            </TreeItem>
          );
        })}
      </TreeView>
    );
  };

  return (
    <React.Fragment>
      <Box style={{ width: 400, border: "solid 1px gray" }}>
        <TreeView
          defaultCollapseIcon={
            <ArrowDropDownIcon
              style={{ fontSize: 40, marginRight: 15, zIndex: 1 }}
            />
          }
          defaultExpandIcon={
            <ArrowRightIcon
              style={{ fontSize: 40, marginRight: 15, zIndex: 1 }}
            />
          }
          className={classes.root}
        >
          <TreeItem nodeId="1" label="Camera Device" className={classes.Sub}>
            <Box>
              <Box
                style={{ display: "flex", width: "400px", marginLeft: "-17px" }}
              >
                <Box
                  style={{
                    borderRight: "solid 1px gray",
                  }}
                  className={`${classes.boxHead} ${
                    selectType == "siteGroup" ? classes.active : ""
                  }`}
                  onClick={() => setSelectType("siteGroup")}
                >
                  <LocationOnOutlinedIcon />
                  <Typography style={{ marginRight: 25 }}>
                    Site Group
                  </Typography>
                </Box>
                <Box
                  className={`${classes.boxHead} ${
                    selectType == "location" ? classes.active : ""
                  }`}
                  onClick={() => setSelectType("location")}
                >
                  <LocationOnOutlinedIcon />
                  <Typography style={{ marginRight: 25 }}>Location</Typography>
                </Box>
              </Box>
              {renderData(dataCameDevice)}
            </Box>
          </TreeItem>
          <TreeItem
            nodeId="2"
            label="AI Integrated Device"
            className={classes.Sub}
          >
            {renderData(dataAiIntegrated)}
          </TreeItem>
          <TreeItem nodeId="3" label="eMAP" className={classes.Sub}>
            {renderData(dataEMAP)}
          </TreeItem>
          <TreeItem nodeId="4" label="PTZ" className={classes.Sub}>
            {renderData(dataPTZ)}
          </TreeItem>
        </TreeView>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(SideBar);
