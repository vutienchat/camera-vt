import { TreeItem, TreeView } from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Box, makeStyles, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";

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

const RenderDataSide = (data) => {
  const classes = useStyles();
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
            {item.subData && RenderDataSide(item.subData, true)}
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export default React.memo(RenderDataSide);
