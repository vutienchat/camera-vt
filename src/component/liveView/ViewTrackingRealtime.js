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
  buttonReset: {
    background: "white",
    padding:"2px 8px",
    color:'black',
    fontSize:'14px',
    borderRadius:'4px',
    cursor:'pointer',
    border:'1px solid #C9C9C9'
  },
});

const ViewTrackingRealtime = ({
  classes,
  handleShowPopupSelect,
  dataGroup,
  isMulti,
  handleMultiSelect,
  handleItemClick,
}) => {
  const classView = useStyles();
  const [selectType, setSelectType] = useState("siteGroup");


  return ('bacv'
  //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  //   <defs>
  //     <clipPath id="clip-path">
  //       <rect id="Rectangle_7111" data-name="Rectangle 7111" width="24" height="24" transform="translate(17997 23112)" fill="#939393" stroke="#707070" stroke-width="1"/>
  //     </clipPath>
  //   </defs>
  //   <g id="Mask_Group_1584" data-name="Mask Group 1584" transform="translate(-17997 -23112)" clip-path="url(#clip-path)">
  //     <g id="Mask_Group_1583" data-name="Mask Group 1583" clip-path="url(#clip-path)">
  //       <g id="download_1_" data-name="download (1)" transform="translate(17997 23112)">
  //         <g id="Group_11144" data-name="Group 11144">
  //           <g id="Group_11143" data-name="Group 11143">
  //             <path id="Path_8835" data-name="Path 8835" d="M13.161,11.43V.581H10.839V11.43H6.357L12,17.071l5.644-5.641Z" fill="#939393"/>
  //           </g>
  //         </g>
  //         <g id="Group_11146" data-name="Group 11146">
  //           <g id="Group_11145" data-name="Group 11145">
  //             <path id="Path_8836" data-name="Path 8836" d="M21.677,11.419V21.1H2.323V11.419H0v12H24v-12Z" fill="#939393"/>
  //           </g>
  //         </g>
  //       </g>
  //     </g>
  //   </g>
  // </svg>
  );
};

export default React.memo(ViewTrackingRealtime);
