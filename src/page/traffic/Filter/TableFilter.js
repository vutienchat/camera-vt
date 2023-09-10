import React, { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Box, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { SettingIcon } from "../Icons";
import SettingModal from "../Modals/SettingModal";
import { TrafficContext } from "../TrafficContent";
import {
  UnViolationPendingApproval,
  ViolationPendingApproval,
} from "./TabPaneFilter";
import NotificationShowing from "./TabPaneFilter/NotificationShowing";

import { QUERY_KEYS } from "../../../utils/keys";
import CustomModal from "../component/CustomModal";
import { SearchIcon } from "../../../common/icons/SearchIcon";
import { ReloadIcon } from "../../../common/icons/ReloadIcon";
import BaseButton from "../component/BaseButton";
import BaseSearchForm from "../component/BaseSearchForm";
import { Cloud } from "@material-ui/icons";
import CameraListModal from "../Modals/CameraListModal";

const TableFilter = () => {
  const queryClient = useQueryClient();
  const classes = useTableFilterStyle();
  const {
    selectTabPane,
    isOpenSettingModal,
    setIsOpenSettingModal,
    isOpenServerModal,
    setIsOpentServerModal,
  } = useContext(TrafficContext);

  const handleReloadDataTable = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TRAFFIC_LIST]);
  };
  return (
    <Box className={classes.root}>
      <BaseSearchForm placeholder={"Biển số xe"} />
      {selectTabPane === "01" && (
        <Box style={{ display: "flex" }}>
          <UnViolationPendingApproval />
          <ViolationPendingApproval />
        </Box>
      )}
      {selectTabPane === "03" && <NotificationShowing />}
      <BaseButton
        content="Xuất danh sách"
        customStyle={{ minWidth: "150px" }}
      />
      <Box className={classes.icon} onClick={handleReloadDataTable}>
        <ReloadIcon width={24} height={24} color="#858585" />
      </Box>
      <Box className={classes.icon} onClick={() => setIsOpenSettingModal(true)}>
        <SettingIcon width={24} height={24} color="#858585" />
      </Box>
      <Box className={classes.icon} onClick={() => setIsOpentServerModal(true)}>
        <Cloud width={24} height={24} color="#858585" />
      </Box>
      {isOpenSettingModal && (
        <CustomModal
          isOpen={isOpenSettingModal}
          handleClose={() => setIsOpenSettingModal(false)}
          title="Thông tin tuỳ chỉnh"
        >
          <SettingModal handleCancel={() => setIsOpenSettingModal(false)} />
        </CustomModal>
      )}
      {isOpenServerModal && (
        <CustomModal
        isOpen={isOpenServerModal}
        handleClose={() => setIsOpentServerModal(false)}
        title="Server 001"
        >
          <CameraListModal handleClose={() => setIsOpentServerModal(false)}/>
        </CustomModal>
      )
      }
    </Box>
  );
};

const useTableFilterStyle = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    gap: "16px",
    "& .MuiInputBase-root": { height: "48px" },
  },
  content: {
    padding: "10px",
    display: "flex",
    gap: "20px",
    alignContent: "center",
  },
  searchContent: { flex: 1 },
  actionsContent: {
    display: "flex",
    gap: "16px",
    alignContent: "center",
  },
  icon: {
    minWidth: "48px",
    height: "48px",
    display: "flex",
    border: "1px solid #939393",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  btnDropdown: {
    background: "#fff",
    border: "1px solid #939393",
    height: "40px",
    borderRadius: "4px",
    textTransform: "unset",
    cursor: "pointer",
    boxShadow: "none",
    "& p": {
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#939393",
    },
    "&:hover": { boxShadow: "none" },
  },
});

export default TableFilter;
