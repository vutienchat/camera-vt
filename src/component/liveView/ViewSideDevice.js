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
            padding: 4,
          }}
        >
          <ListItem
            button
            onClick={() => handleClick(1)}
            style={{
              background: open === 1 ? "#ebebeb" : "",
              fontWeight: open === 1 ? "bold" : "",
            }}
            className={classes.buttonDevice}
          >
            <ListItemIcon>
              {open === 1 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText
              children={
                <span style={{ fontWeight: open === 1 ? "bold" : "" }}>
                  Name Device
                </span>
              }
            />
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
                left: 0,
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
            padding: 4,
          }}
        >
          <ListItem
            button
            onClick={() => handleClick(2)}
            className={classes.buttonDevice}
            style={{
              background: open === 2 ? "#ebebeb" : "",
            }}
          >
            <ListItemIcon>
              {open === 2 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText
              children={
                <span style={{ fontWeight: open === 2 ? "bold" : "" }}>
                  Name Device
                </span>
              }
              style={{ fontWeight: open === 2 ? "bold" : "" }}
            />
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
            padding: 4,
            height: open === 3 ? "100%" : "auto",
          }}
        >
          <ListItem
            button
            onClick={() => handleClick(3)}
            className={classes.buttonDevice}
            style={{
              background: open === 3 ? "#ebebeb" : "",
              fontWeight: open === 1 ? "bold" : "",
            }}
          >
            <ListItemIcon>
              {open === 3 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText
              children={
                <span style={{ fontWeight: open === 3 ? "bold" : "" }}>
                  Name Device
                </span>
              }
            />
          </ListItem>
          <Collapse
            in={open === 3}
            timeout="auto"
            unmountOnExit
            style={{ padding: 4 }}
          >
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
        <List
          style={{
            padding: 4,
          }}
        >
          <ListItem
            button
            onClick={() => setOpenPTZ(!openPTZ)}
            className={classes.buttonDevice}
            style={{
              background: openPTZ ? "#ebebeb" : "",
            }}
          >
            <ListItemIcon>
              {openPTZ ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemIcon>
            <ListItemText
              children={
                <span style={{ fontWeight: openPTZ ? "bold" : "" }}>PTZ</span>
              }
            />
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
