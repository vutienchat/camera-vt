import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import RenderDataSide from "./RenderDataSide";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { dataAiIntegrated, dataCameDevice, dataEMAP } from "./dataSideBar";
import { renderData } from "./SideBar";

const ViewSideDevice = ({ classes }) => {
  const [selectType, setSelectType] = useState("siteGroup");

  const [open, setOpen] = React.useState("");
  const [openPTZ, setOpenPTZ] = React.useState("");

  const handleClick = (value) => {
    if (open === value) {
      setOpen("");
      return;
    }
    setOpen(value);
  };

  return (
    <React.Fragment>
      <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <List
          style={{
            marginBottom: open === 1 ? "auto" : 0,
            height: open === 1 ? "100%" : "auto",
          }}
        >
          <ListItem button onClick={() => handleClick(1)}>
            <ListItemIcon>
              {open === 1 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary="Name Device" />
          </ListItem>
          <Collapse in={open === 1} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{
                position: "absolute",
                bottom: 0,
                top: "60px",
                overflow: "auto",
              }}
            >
              <RenderDataSide
                renderData={renderData}
                data={dataCameDevice}
                selectType={selectType}
                setSelectType={setSelectType}
                classes={classes}
                isCamera={true}
                isSearch={true}
              />
            </List>
          </Collapse>
        </List>
        <List
          style={{
            marginBottom: open === 2 ? "auto" : 0,
            height: open === 2 ? "100%" : "auto",
          }}
        >
          <ListItem button onClick={() => handleClick(2)}>
            <ListItemIcon>
              {open === 2 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary="Name Device" />
          </ListItem>
          <Collapse in={open === 2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{
                position: "absolute",
                bottom: 0,
                top: "60px",
                overflow: "auto",
              }}
            >
              <RenderDataSide
                renderData={renderData}
                data={dataAiIntegrated}
                classes={classes}
                isSearch={true}
              />
            </List>
          </Collapse>
        </List>
        <List
          style={{
            marginBottom: open === 3 ? "auto" : 0,
            height: open === 3 ? "100%" : "auto",
          }}
        >
          <ListItem button onClick={() => handleClick(3)}>
            <ListItemIcon>
              {open === 3 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary="Name Device" />
          </ListItem>
          <Collapse in={open === 3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{
                position: "absolute",
                bottom: 0,
                top: "60px",
                overflow: "auto",
              }}
            >
              <RenderDataSide
                renderData={renderData}
                data={dataEMAP}
                classes={classes}
                isSearch={true}
              />
            </List>
          </Collapse>
        </List>
        <List>
          <ListItem button onClick={() => setOpenPTZ(!openPTZ)}>
            <ListItemIcon>
              {openPTZ ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText primary="PTZ" />
          </ListItem>
          <Collapse in={openPTZ} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(ViewSideDevice);
