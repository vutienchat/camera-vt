import React, { useState } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import RenderDataSide from "./RenderDataSide";
import { dataCameDevice, dataInit } from "./dataSideBar";
import AddIcon from "@material-ui/icons/Add";
import { renderData } from "./SideBar";
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import View from "../../asset/image/Mask Group 735.png";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";
import RenderTree from "./RenderTree";

const useStyles = makeStyles({
  header: {
    display: "flex",
    height: 50,
    background: "#f5f3f3",
    alignItems: "center",
    borderBottom: "solid 2px red",
  },
});

const ViewSideTaskWall = ({
  classes,
  handleShowPopupSelect,
  dataGroup,
  isMulti,
  handleMultiSelect,
  handleItemClick,
}) => {
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
      <RenderTree data={dataGroup} />
    </React.Fragment>
  );
};

export default React.memo(ViewSideTaskWall);
