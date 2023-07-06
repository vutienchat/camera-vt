import React, { memo, useContext } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Search from "./search";
import CameraItem from "./item";
import { TreeItem, TreeView } from "@material-ui/lab";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { MasterMapContext } from "../MasterMap";
import TreeHeaderIcon from "../../map/icons/TreeHeaderIcon";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":
      {
        backgroundColor: "transparent",
      },
    "& .MuiTreeItem-iconContainer": {
      width: 0,
    },
    "& .MuiTreeItem-content": {
      gap: 5,
    },
  },
});

const TreeHeader = ({ node }) => {
  return (
    <Box
      style={{
        padding: "5px 0px",
        display: "flex",
        gap: "10px",
        alignContent: "center",
      }}
    >
      <TreeHeaderIcon />
      <Typography>{node.label}</Typography>
    </Box>
  );
};

const SideBar = memo(() => {
  const { markerList, deviceListSelected, setDeviceListSelected } =
    useContext(MasterMapContext);

  const classes = useStyles();

  return (
    <Box style={{ width: "320px", height: "900px", padding: "10px" }}>
      <Search />
      <Box style={{ marginTop: "10px" }}>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
        >
          {markerList.data &&
            markerList.data.map((data, index) => (
              <TreeItem
                nodeId={data.id}
                label={<TreeHeader node={data} />}
                key={`${data.id}_${index}`}
              >
                {data.deviceList.map((device, index) => (
                  <TreeItem
                    key={`${device.id}_${index}`}
                    nodeId={device.id}
                    label={
                      <CameraItem
                        camera_detail={device}
                        selected={deviceListSelected[device.id]}
                      />
                    }
                    onClick={() => {
                      // Nếu Infowindow đang hiển thị, ẩn nó
                      const parentElementDevice = document.getElementById(
                        device.id
                      ).parentElement.parentElement.parentElement.parentElement;

                      if (
                        parentElementDevice.style.display === "none" ||
                        parentElementDevice.style.display === ""
                      ) {
                        parentElementDevice.style.display = "block";
                        setDeviceListSelected((prev) => ({
                          ...prev,
                          [device.id]: true,
                        }));
                      } else {
                        parentElementDevice.style.display = "none";
                        setDeviceListSelected((prev) => ({
                          ...prev,
                          [device.id]: false,
                        }));
                      }
                    }}
                  />
                ))}
              </TreeItem>
            ))}
        </TreeView>
      </Box>
    </Box>
  );
});

export default SideBar;
