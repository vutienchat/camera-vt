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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";
import {
  dataAiIntegrated,
  dataCameDevice,
  dataEMAP,
  dataPTZ,
} from "./dataSideBar";
import RenderDataSide from "./RenderDataSide";

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
  iconStyle: {
    fontSize: "40px  !important",
    marginRight: 15,
    zIndex: 1,
  },
  sideBar: {
    width: 400,
    border: "solid 1px #e5e5e5",
    maxHeight: 975,
    overflowY: "auto",
    overflowX: "hidden",
  },
});

const SideBar = () => {
  const classes = useStyles();
  const [selectType, setSelectType] = useState("siteGroup");
  const [expanded, setExpanded] = useState([]);

  const renderData = (data) => {
    return (
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon style={{ fontSize: 40 }} />}
        defaultExpandIcon={<ArrowRightIcon style={{ fontSize: 40 }} />}
        style={{ marginLeft: 10 }}
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
      <Box className={classes.sideBar}>
        <TreeView
          defaultCollapseIcon={
            <ArrowDropDownIcon className={classes.iconStyle} />
          }
          defaultExpandIcon={<ArrowRightIcon className={classes.iconStyle} />}
          className={classes.root}
          expanded={expanded}
          onNodeSelect={(event, nodeId) => {
            const expandedIdx = expanded.includes(nodeId);
            if (expandedIdx) setExpanded([]);
            else setExpanded([nodeId]);
          }}
        >
          <TreeItem nodeId="1" label="Camera Device" className={classes.Sub}>
            <RenderDataSide
              renderData={renderData}
              data={dataCameDevice}
              selectType={selectType}
              setSelectType={setSelectType}
              classes={classes}
              isCamera={true}
            />
          </TreeItem>
          <TreeItem
            nodeId="2"
            label="AI Integrated Device"
            className={classes.Sub}
          >
            <RenderDataSide renderData={renderData} data={dataAiIntegrated} />
          </TreeItem>
          <TreeItem nodeId="3" label="eMAP" className={classes.Sub}>
            <RenderDataSide renderData={renderData} data={dataEMAP} />
          </TreeItem>
          <TreeItem nodeId="4" label="PTZ" className={classes.Sub}>
            <RenderDataSide renderData={renderData} data={dataPTZ} />
          </TreeItem>
        </TreeView>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(SideBar);
