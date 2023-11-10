import React, { useContext } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import { LiveView2Context } from "../../page/liveView2";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import VideocamIcon from "@material-ui/icons/Videocam";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: 40,
  },
}));

const RenderTree = ({ data }) => {
  return (
    <React.Fragment>
      <List>
        {data &&
          data.length > 0 &&
          data.map((it, indx) => <TreeItems item={it} key={indx} />)}
      </List>
    </React.Fragment>
  );
};
const paddingDefault = 20;
const TreeItems = ({ item, padding }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    listAdd,
    layoutActive,
    isDragItem,
    handleItemClick,
    handleMouseDown,
  } = useContext(LiveView2Context);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem button style={{ paddingLeft: 20 + padding }}>
        {open ? (
          <ArrowDropUpIcon
            style={{ fontSize: 40, cursor: "pointer" }}
            onClick={handleClick}
          />
        ) : (
          <ArrowDropDownIcon
            style={{ fontSize: 40, cursor: "pointer" }}
            onClick={handleClick}
          />
        )}
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <ViewComfyIcon />
          </ListItemIcon>
          <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
            {item.label}
          </Typography>
        </Box>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.listTask &&
            item.listTask.map((device, index) => (
              <React.Fragment key={device.i}>
                <ListItem
                  button
                  className={classes.nested}
                  style={{
                    background:
                      listAdd &&
                      listAdd.length &&
                      listAdd.map((it) => it.i).includes(device.i)
                        ? "#f6f4f4"
                        : "",
                    marginBlock: 5,
                    textDecoration:
                      layoutActive &&
                      layoutActive.grid.map((it) => it.i).includes(device.i)
                        ? "line-through"
                        : "",
                  }}
                  draggable={
                    isDragItem && listAdd && listAdd.length ? true : false
                  }
                  unselectable="on"
                  // this is a hack for firefox
                  // Firefox requires some kind of initialization
                  // which we can do by adding this attribute
                  // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
                  onClick={(e) => {
                    if (
                      layoutActive &&
                      layoutActive.device.map((it) => it.i).includes(device.i)
                    )
                      return;
                    handleItemClick(device, e);
                  }}
                  onMouseDown={(e) => {
                    if (
                      layoutActive &&
                      layoutActive.device.map((it) => it.i).includes(device.i)
                    )
                      return;
                    handleMouseDown(index, e, item.device);
                  }}
                >
                  <ListItemIcon style={{ minWidth: 30 }}>
                    <VideocamIcon />
                  </ListItemIcon>
                  <ListItemText primary={device.label} />
                </ListItem>
              </React.Fragment>
            ))}
        </List>
      </Collapse>

      {item.nodeChildren &&
        item.nodeChildren.length > 0 &&
        item.nodeChildren.map((child, index) => (
          <Collapse key={index} in={open} timeout="auto" unmountOnExit>
            <List>
              <TreeItems
                item={child}
                key={`${index}_1`}
                padding={paddingDefault}
              />
            </List>
          </Collapse>
        ))}
    </React.Fragment>
  );
};

export default RenderTree;
