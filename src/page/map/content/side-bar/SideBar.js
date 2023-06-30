import { Box, Typography, makeStyles } from "@material-ui/core";
import Search from "./search";
import CameraItem from "./item";
import { useContext } from "react";
import { MapContext } from "../../Map";
import { TreeItem, TreeView } from "@material-ui/lab";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeHeaderIcon from "../../icons/TreeHeaderIcon";

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

const SideBar = () => {
  const { markerList } = useContext(MapContext);
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
            markerList.data.map((data) => (
              <TreeItem
                nodeId={data.id}
                label={<TreeHeader node={data} />}
                id={data.id}
              >
                {data.deviceList.map((device) => (
                  <TreeItem
                    nodeId={device.id}
                    label={<CameraItem camera_detail={device} />}
                  />
                ))}
              </TreeItem>
            ))}
        </TreeView>
      </Box>
    </Box>
  );
};

export default SideBar;
