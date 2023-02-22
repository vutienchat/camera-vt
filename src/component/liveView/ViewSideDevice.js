import React, { useState } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import RenderDataSide from "./RenderDataSide";
import { Box, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  dataAiIntegrated,
  dataCameDevice,
  dataEMAP,
  dataPTZ,
} from "./dataSideBar";
import { renderData } from "./SideBar";

const ViewSideDevice = ({ classes }) => {
  const [expanded, setExpanded] = useState([]);
  const [selectType, setSelectType] = useState("siteGroup");

  return (
    <React.Fragment>
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
            isSearch={true}
          />
        </TreeItem>
        <TreeItem
          nodeId="2"
          label="AI Integrated Device"
          className={classes.Sub}
        >
          <RenderDataSide
            renderData={renderData}
            data={dataAiIntegrated}
            classes={classes}
            isSearch={true}
          />
        </TreeItem>
        <TreeItem nodeId="3" label="eMAP" className={classes.Sub}>
          <RenderDataSide
            renderData={renderData}
            data={dataEMAP}
            classes={classes}
            isSearch={true}
          />
        </TreeItem>
        <TreeItem nodeId="4" label="PTZ" className={classes.Sub}>
          <RenderDataSide
            renderData={renderData}
            data={dataPTZ}
            classes={classes}
          />
        </TreeItem>
      </TreeView>
    </React.Fragment>
  );
};

export default React.memo(ViewSideDevice);
