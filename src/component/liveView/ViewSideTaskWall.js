import React, { useState } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import RenderDataSide from "./RenderDataSide";
import { dataCameDevice, dataInit } from "./dataSideBar";
import { renderData } from "./SideBar";
import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import View from "../../asset/image/Mask Group 735.png";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles({
  header: {
    display: "flex",
    height: 50,
    background: "#f5f3f3",
    alignItems: "center",
    borderBottom: "solid 2px red",
  },
});

const ViewSideTaskWall = ({ classes, handleShowPopupSelect }) => {
  const classView = useStyles();
  const [selectType, setSelectType] = useState("siteGroup");

  return (
    <React.Fragment>
      <Box className={classView.header}>
        <img
          src={View}
          alt="wall"
          style={{ width: 24, height: 24, paddingLeft: 10 }}
        />
        <Typography
          style={{ flex: "1", textAlign: "center", fontWeight: "600" }}
        >
          Task View Wall Management
        </Typography>
      </Box>
      <Box style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <TextField
          placeholder="Search"
          size="small"
          variant="outlined"
          style={{ width: 370 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "red" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TreeView
        defaultCollapseIcon={
          <ArrowDropDownIcon
            style={{ fontSize: 40, marginLeft: 35, zIndex: 1 }}
          />
        }
        defaultExpandIcon={
          <ArrowRightIcon style={{ fontSize: 40, marginLeft: 35, zIndex: 1 }} />
        }
        className={classes.root}
      >
        <TreeItem
          nodeId="1"
          label={
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "85.5%",
                marginLeft: 30,
              }}
            >
              <Typography>Main Task View Group</Typography>
              <MoreHorizIcon
                onClick={(e) => handleShowPopupSelect(e, "main")}
              />
            </Box>
          }
          onLabelClick={(e) => {
            e.preventDefault();
          }}
          className={classes.isSub}
          style={{ border: "none" }}
        >
          <RenderDataSide
            renderData={renderData}
            data={dataInit}
            selectType={selectType}
            setSelectType={setSelectType}
            classes={classes}
            isSearch={false}
            handleShowPopupSelect={handleShowPopupSelect}
          />
        </TreeItem>
        <TreeItem
          nodeId="2"
          label={
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "85.5%",
                marginLeft: 30,
              }}
            >
              <Box style={{ display: "flex" }}>
                <ShareIcon />
                <Typography style={{ paddingLeft: "10px" }}>
                  Share Task View
                </Typography>
              </Box>
              <MoreHorizIcon />
            </Box>
          }
          onLabelClick={(e) => {
            e.preventDefault();
          }}
          className={classes.isSub}
          style={{ border: "none" }}
        >
          <RenderDataSide
            renderData={renderData}
            data={dataCameDevice}
            selectType={selectType}
            setSelectType={setSelectType}
            classes={classes}
            isSearch={false}
          />
        </TreeItem>
      </TreeView>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 20,
          width: "100%",
        }}
      >
        <Button
          style={{ width: 250, height: 55, background: "red", color: "#fff" }}
        >
          Back To Current Plan
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(ViewSideTaskWall);
