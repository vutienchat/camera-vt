import {
  Box,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeItem from "@material-ui/lab/TreeItem";
import SearchIcon from "@material-ui/icons/Search";
import RenderDataSide from "./RenderDataSide";
import {
  dataAiIntegrated,
  dataCameDevice,
  dataEMAP,
  dataPTZ,
} from "./dataSideBar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles({
  Sub: {
    borderBottom: "solid 1px #e5e5e5",
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
    borderBlock: "solid 1px #e5e5e5",
    cursor: "pointer",
  },
  active: {
    borderBottom: "solid 2px red",
  },
});

const SideBar = () => {
  const classes = useStyles();
  const [selectType, setSelectType] = useState("siteGroup");
  const [expanded, setExpanded] = useState([]);

  return (
    <React.Fragment>
      <Box
        style={{
          width: 400,
          border: "solid 1px #e5e5e5",
          maxHeight: 975,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
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
          expanded={expanded}
          onNodeSelect={(event, nodeId) => {
            const expandedIdx = expanded.includes(nodeId);
            if (expandedIdx) setExpanded([]);
            else setExpanded([nodeId]);
          }}
        >
          <TreeItem nodeId="1" label="Camera Device" className={classes.Sub}>
            <Box>
              <Box
                style={{ display: "flex", width: "400px", marginLeft: "-17px" }}
              >
                <Box
                  style={{
                    borderRight: "solid 1px #e5e5e5",
                  }}
                  className={`${classes.boxHead} ${
                    selectType === "siteGroup" ? classes.active : ""
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
                    selectType === "location" ? classes.active : ""
                  }`}
                  onClick={() => setSelectType("location")}
                >
                  <LocationOnOutlinedIcon />
                  <Typography style={{ marginRight: 25 }}>Location</Typography>
                </Box>
              </Box>
              <Box style={{ marginTop: 20 }}>
                <TextField
                  placeholder="Search"
                  size="small"
                  variant="outlined"
                  style={{ width: 365 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "red" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {<RenderDataSide data={dataCameDevice} />}
            </Box>
          </TreeItem>
          <TreeItem
            nodeId="2"
            label="AI Integrated Device"
            className={classes.Sub}
          >
            <Box style={{ marginTop: 20 }}>
              <TextField
                placeholder="Search"
                size="small"
                variant="outlined"
                style={{ width: 365 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "red" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {<RenderDataSide data={dataAiIntegrated} />}
          </TreeItem>
          <TreeItem nodeId="3" label="eMAP" className={classes.Sub}>
            <Box style={{ marginTop: 20 }}>
              <TextField
                placeholder="Search"
                size="small"
                variant="outlined"
                style={{ width: 365 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "red" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {<RenderDataSide data={dataEMAP} />}
          </TreeItem>
          <TreeItem nodeId="4" label="PTZ" className={classes.Sub}>
            <Box style={{ marginTop: 20 }}>
              <TextField
                placeholder="Search"
                size="small"
                variant="outlined"
                style={{ width: 365 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "red" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {<RenderDataSide data={dataPTZ} />}
          </TreeItem>
        </TreeView>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(SideBar);
