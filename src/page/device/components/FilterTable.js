import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext } from "react";
import BaseButton from "./BaseButton";
import { DeviceContext } from "./DeviceProvider";
import TrashIcon from "../Icon/TrashIcon";
import { tableData } from "../utils";
import { exportExcel } from "../api";
import ResyncIcon from "../Icon/ResyncIcon";
import BlackTrashIcon from "../Icon/BlackTrashIcon";

const FilterBar = () => {
  const classes = useStyles();
  const { state, dispatch, handleCheckData } = useContext(DeviceContext);
  const handleOpenDeleteModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: { openModalDelete: true },
    });
  };
  const handleOpenImportModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: { openModalImport: true },
    });
  };
  const handleOpenAddVehicleModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: { openModalAddDevice: true },
    });
  };

  const handleCheckAllData = () => {
    let checkedList = [...state.checkedItemList];
    tableData.forEach((item) => {
      if (!checkedList.find((li) => li.id === item.id)) {
        checkedList.push(item);
      }
    });
    handleCheckData(checkedList);
  };
  const handleUnCheckAllData = () => {
    let checkList = [];
    handleCheckData(checkList);
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 30,
        }}
      >
        <Box className={classes.text} style={{ fontWeight: 400 }}>
          <span>Selected:</span>{" "}
          <span>
            {state.checkedItemList.length < 10
              ? `0${state.checkedItemList.length}`
              : state.checkedItemList.length}
          </span>{" "}
          <span>devices</span>
        </Box>
        {state.checkedItemList.length === tableData.length ? (
          <Box
            onClick={(e) => {
              handleUnCheckAllData();
            }}
            style={{ cursor: "pointer" }}
          >
            <span>Clear selection</span>
          </Box>
        ) : (
          <Box
            className={classes.text}
            style={{
              color: "rgba(221, 61, 75, 1 )",
              fontWeight: 500,
              cursor: "pointer",
            }}
            onClick={(e) => {
              console.log("hello");
              handleCheckAllData();
            }}
          >
            <span>Selected all</span> <span>{tableData.length}</span>{" "}
            <span>devices</span>
          </Box>
        )}
      </Box>
      <Box style={{ display: "flex", gap: 25 }}>
        <BaseButton
          label={"+ Add Device"}
          type={"redBackground"}
          onClick={handleOpenAddVehicleModal}
        />
        <BaseButton
          label={"Re-Sync"}
          type={"headerButton"}
          component={<ResyncIcon />}
          onClick={handleOpenImportModal}
        />
        <BaseButton
          label={"Import Data"}
          type={"headerButton"}
          onClick={handleOpenImportModal}
        />
        <BaseButton
          label={"Export Data"}
          type={"headerButton"}
          onClick={() => {
            exportExcel();
          }}
        />
        <BaseButton
          label={"Delete"}
          type={state.checkedItemList.length > 0 ? "normal" : "disable"}
          component={state.checkedItemList.length > 0 ? <BlackTrashIcon/> : <TrashIcon/>}
          onClick={handleOpenDeleteModal}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16,
  },
}));

export default FilterBar;
